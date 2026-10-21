<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-4" style="max-width: 500px; margin: 0 auto;">
      <h1 class="h3 mb-3 text-center">Get Book Count</h1>
      <p class="text-muted text-center">Calling Firebase Cloud Function (getBookCount)</p>

      <div v-if="loading" class="text-center my-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="count !== null" class="alert alert-success text-center">
        The total number of books is: <strong>{{ count }}</strong>
      </div>

      <div v-if="error" class="alert alert-danger">
        <strong>Error:</strong> {{ error }}
      </div>

      <div class="d-grid gap-2 mt-3">
        <button class="btn btn-primary" :disabled="loading" @click="getBookCount">
          {{ loading ? 'Fetching...' : 'Get Book Count' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)
const loading = ref(false)

// Firebase Functions URL (Local Emulator / Cloud)
const FUNCTION_URL = 'http://127.0.0.1:5001/fit5032-c6d1e/us-central1/getBookCount'

const getBookCount = async () => {
  loading.value = true
  error.value = null
  count.value = null

  try {
    const response = await axios.get(FUNCTION_URL)
    count.value = response.data.count
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err.message || 'Failed to connect to Firebase Function'
  } finally {
    loading.value = false
  }
}
</script>