import { createApp } from 'vue';
import App from './App.vue'; // Import the app
import store from './store.js'; // Import Vuex Store
import apolloProvider from './apollo.js'; // Import Apollo GraphQl Client
import './index.css';

const app = createApp(App);
app.use(store);
app.use(apolloProvider);
app.mount('#app');
