import { createApp } from 'vue';
import App from './App.vue'; // Import the app
import store from './store.js'; // Import Vuex Store
import apolloProvider from './apollo.js'; // Import Apollo GraphQl Client
import { Skeletor } from 'vue-skeletor';
import './index.css';
import 'vue-search-input/dist/styles.css';
import 'vue-skeletor/dist/vue-skeletor.css';

const app = createApp(App);
app.use(store);
app.use(apolloProvider);
app.component(Skeletor.name, Skeletor);
app.mount('#app');
