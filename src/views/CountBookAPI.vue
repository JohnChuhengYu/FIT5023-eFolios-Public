<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jsondata = ref(null);
const error = ref(null);

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/fit5032-c6d1e/us-central1/getBookCount');
    jsondata.value = response.data;
    error.value = null;
  } catch (err) {
    error.value = 'Error fetching book count';
    jsondata.value = null;
  }
};

onMounted(() => {
  getBookCountAPI();
});
</script>

<style scoped>
pre {
  padding: 20px;
  font-family: monospace;
  font-size: 16px;
}
</style>
