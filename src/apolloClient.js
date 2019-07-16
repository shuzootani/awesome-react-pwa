import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RetryLink } from 'apollo-link-retry'
import { fragmentMatcher } from './graphql/fragments'
// import store from './store'
import { AppConfig } from './utils/config'
// import { tokenExpired } from './utils/auth'

Object.setPrototypeOf = Object.setPrototypeOf || ((obj, proto) => {
  // eslint-disable-next-line no-param-reassign,no-proto
  obj.__proto__ = proto
  return obj
})

const apolloUri = AppConfig.APOLLO_ENDPOINT // https://colugo.pickpack.de

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error =>
      console.warn(`[GraphQL error]: Message: ${JSON.stringify(error)}`))
  }
  if (networkError) {
    console.warn(`[Network error]: ${networkError}`)
  }
})

const authLink = setContext((_, { headers }) => {
  try {
    const token = null
    // const token = store.getState().getIn(['user', 'token'])
    // if (token && token.get('expires') && tokenExpired(token.get('expires'))) {
    if (token && token.get('expires')) {
      // const user = store.getState().getIn(['user']).toJS()
      // store.dispatch(initRefreshUser(user))
    }
    const tokenType = token && token.get('token_type')
    const accessToken = token && token.get('access_token')
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `${tokenType} ${accessToken}` : 'ANONYMOUS',
      },
    }
  } catch (err) {
    console.warn('AuthContextError', err)
    throw (new Error(err))
  }
})

const retryLink = new RetryLink({
  delay: {
    initial: 800,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: Infinity,
    retryIf: (error, operation) => {
      const queryName = operation.query.definitions[0].selectionSet.selections[0].name.value
      if (operation.query.definitions[0].operation !== 'mutation'
          || queryName === 'addFavoriteStore'
          || queryName === 'removeFavoriteStore'
      ) {
        return true
      }
      return false
    },
  },
})

const httpLink = new HttpLink({ uri: apolloUri })

const client = new ApolloClient({
  link: authLink.concat(retryLink).concat(errorLink).concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id,
    fragmentMatcher,
    cacheRedirects: {
      Query: {
        product: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Product', id: args.id }),
        store: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Store', id: args.id }),
        order: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Order', id: args.id }),
      },
    },
  }),
})

export default client
