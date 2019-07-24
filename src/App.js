import React from 'react'
import { Route } from "react-router-dom"
import { ApolloProvider } from 'react-apollo'

import StoreDetail from '../src/pages/StoreDetail'
import Checkout from '../src/pages/Checkout'
import client from './apolloClient'
import './App.css'
import BasketContextProvider from './providers/BasketContextProvider';

function App() {
  return (
    <ApolloProvider client={client}>
      <BasketContextProvider>
        <Route exact path="/" component={StoreDetail} />
        <Route path="/store/:storeId" component={StoreDetail} />
        <Route path="/checkout" component={Checkout} />
      </BasketContextProvider>
    </ApolloProvider>
  )
}

export default App
