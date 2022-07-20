import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: 'https://guidance.wgu.edu/standards/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

 const apolloProvider = createApolloProvider({
	defaultClient: apolloClient,
});

export default apolloProvider;