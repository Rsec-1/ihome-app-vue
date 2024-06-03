// frontend/src/main.ts
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';

import { useUserStore } from './stores/user';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vant)

const userStore = useUserStore();
const username = localStorage.getItem('username');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (username && isLoggedIn) {
  userStore.setUsername(username);
}

app.mount('#app')
