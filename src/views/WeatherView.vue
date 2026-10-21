<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-4 mx-auto" style="max-width: 550px;">
      <h1 class="h3 mb-3 text-center">Weather Check</h1>

      <!-- Search Bar -->
      <div class="input-group mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="Enter city name (e.g. Melbourne)"
          v-model="city"
          @keyup.enter="searchByCity"
        />
        <button class="btn btn-primary" type="button" @click="searchByCity">
          Search
        </button>
        <button
          class="btn btn-outline-secondary"
          type="button"
          title="Use current location"
          @click="fetchCurrentLocationWeather"
        >
          📍 Location
        </button>
      </div>

      <!-- Loading / Error Alert -->
      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading weather...</span>
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Weather Data Display -->
      <main v-if="weatherData && !loading">
        <div class="text-center">
          <h2 class="h4 mb-1">
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <p class="text-muted text-capitalize mb-2">
            {{ weatherData.weather[0].description }}
          </p>

          <div class="d-flex justify-content-center align-items-center my-3">
            <img
              v-if="iconUrl"
              :src="iconUrl"
              alt="Weather Icon"
              style="width: 80px; height: 80px;"
            />
            <span class="display-3 fw-bold ms-2">{{ temperature }}°C</span>
          </div>

          <div class="row text-center mt-3 pt-3 border-top text-secondary">
            <div class="col">
              <small class="d-block text-muted">Feels Like</small>
              <strong>{{ feelsLike }}°C</strong>
            </div>
            <div class="col">
              <small class="d-block text-muted">Humidity</small>
              <strong>{{ weatherData.main.humidity }}%</strong>
            </div>
            <div class="col">
              <small class="d-block text-muted">Wind</small>
              <strong>{{ weatherData.wind.speed }} m/s</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const apikey = "dbd4937344bfa12f2c13b8b75008e5e4";

// Reactive state
const city = ref("");
const weatherData = ref(null);
const loading = ref(false);
const errorMessage = ref("");

// Computed properties
const temperature = computed(() => {
  return weatherData.value
    ? Math.round(weatherData.value.main.temp - 273.15)
    : null;
});

const feelsLike = computed(() => {
  return weatherData.value
    ? Math.round(weatherData.value.main.feels_like - 273.15)
    : null;
});

// Fixed: OpenWeatherMap icons are hosted on openweathermap.org (WITHOUT api. subdomain)
const iconUrl = computed(() => {
  return weatherData.value && weatherData.value.weather && weatherData.value.weather[0]
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : null;
});

// Fetch weather data helper
const fetchWeatherData = async (url) => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error.response && error.response.status === 404) {
      errorMessage.value = "City not found. Please check spelling.";
    } else {
      errorMessage.value = "Failed to load weather data. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};

// Search by city name
const searchByCity = async () => {
  if (!city.value.trim()) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value.trim())}&appid=${apikey}`;
  await fetchWeatherData(url);
};

// Fetch by current geolocation
const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        await fetchWeatherData(url);
      },
      (error) => {
        console.warn("Geolocation denied or error:", error);
        // Fallback to Melbourne default if geolocation is denied or unavailable
        searchCityDefault();
      }
    );
  } else {
    searchCityDefault();
  }
};

const searchCityDefault = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Melbourne,AU&appid=${apikey}`;
  await fetchWeatherData(url);
};

// Lifecycle hook
onMounted(() => {
  fetchCurrentLocationWeather();
});
</script>