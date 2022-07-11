import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import store from './store.js'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import './index.css'

const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'https://guidance.wgu.edu/standards/graphql',
  })
  
  // Cache implementation
  const cache = new InMemoryCache()
  
  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })
  
  const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })
  
const app = createApp(App)
app.use(store);
app.use(apolloProvider);
app.mount('#app')
