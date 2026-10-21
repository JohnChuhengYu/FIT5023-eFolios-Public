<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jsondata = ref(null);
const error = ref(null);

const getAllBooksAPI = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/fit5032-c6d1e/us-central1/getAllBooks');
    jsondata.value = response.data;
    error.value = null;
  } catch (err) {
    error.value = 'Error fetching all books';
    jsondata.value = null;
  }
};

onMounted(() => {
  getAllBooksAPI();
});
</script>

<style scoped>
pre {
  padding: 20px;
  font-family: monospace;
  font-size: 16px;
}
</style>
