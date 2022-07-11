import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import store from './store.js'
import './index.css'


const app = createApp(App)
app.use(store);
app.mount('#app')
