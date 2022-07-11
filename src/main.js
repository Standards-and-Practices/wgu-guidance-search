import { createApp } from 'vue'
import App from './App.vue'
import { createClient } from 'villus';
import './index.css'

// Creates a villus client instance
const client = createClient({
  url: '/graphql', // your endpoint.
});

const app = createApp(App)
app.use(client);
app.mount('#app')
