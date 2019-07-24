import React from 'react'
import { Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import client from './apolloClient'

import Header from './components/Header'
import StoreDetail from '../src/pages/StoreDetail'
import Checkout from '../src/pages/Checkout'
import BasketContextProvider from './providers/BasketContextProvider'

require('./App.css')

function App () {
  return (
    <ApolloProvider client={client}>
      <Header />
      <BasketContextProvider>
        <Route exact path='/' component={StoreDetail} />
        <Route path='/store/:storeId' component={StoreDetail} />
        <Route path='/checkout' component={Checkout} />
      </BasketContextProvider>
    </ApolloProvider>
  )
}

export default App
