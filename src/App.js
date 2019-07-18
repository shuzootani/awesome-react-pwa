import React from 'react'
import { Route } from "react-router-dom"
import { ApolloProvider } from 'react-apollo'

import StoreDetail from '../src/pages/StoreDetail'
import Checkout from '../src/pages/Checkout'
import client from './apolloClient'
import './App.css'

function App() {
  return (
    <ApolloProvider client={client}>
      <Route exact path="/" component={StoreDetail} />
      <Route path="/store/:storeId" component={StoreDetail} />
      <Route path="/checkout" component={Checkout} />
    </ApolloProvider>
  )
}

export default App
