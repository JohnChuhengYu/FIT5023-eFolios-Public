// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)

const firebaseConfig = {
  apiKey: "AIzaSyAnCuCvQZ61osAC-VwJ_YHyNKXqCTPKs84",
  authDomain: "fit5032-c6d1e.firebaseapp.com",
  projectId: "fit5032-c6d1e",
  storageBucket: "fit5032-c6d1e.firebasestorage.app",
  messagingSenderId: "184549806552",
  appId: "1:184549806552:web:0d9eb5fac33b7a7b18a2ad"
};

initializeApp(firebaseConfig);

app.mount('#app')
