<template>
    <div>
        <h1>Book List</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.isbn }} - {{ book.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection,query,getDocs,where } from 'firebase/firestore';

const books = ref([]);

const fetchbooks = async() => {
  try {
    const q = query(collection(db,'books'), where('isbn', '>', 1000));
    const querySnapshot = await getDocs(q);
    const booksArray = [];
    querySnapshot.forEach((doc) => {
        booksArray.push({id:doc.id, ...doc.data()});
    });
    books.value = booksArray;
  } catch (error){
    console.error("")
  }
};

onMounted(() => {
    fetchbooks();
});

</script>