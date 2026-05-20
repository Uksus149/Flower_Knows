
import { createApp } from 'vue'; 
import App from './App.vue'; 
import { createRouter, createWebHistory, createWebHashHistory  } from 'vue-router'; 


import { routes } from './route.js';


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
