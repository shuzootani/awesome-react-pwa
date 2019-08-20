import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './apolloClient'

import Header from './components/Header'
import StoreDetail from './pages/StoreDetail/Loadable'
import Checkout from './pages/Checkout/Loadable'
import Payment from './pages/Payment/Loadable'
import Pickup from './pages/Pickup/Loadable'
import OrderContextProvider from './providers/OrderContextProvider'
import LanguageContextProvider from './providers/LanguageContextProvider'

require('./App.css')

function App() {
  return (
    <ApolloProvider client={client}>
      <Route path="/:locale?">
        <LanguageContextProvider>
          <Route path="*" component={Header} />
          <OrderContextProvider>
            <Switch>
              <Route path="/store/:storeId" component={StoreDetail} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
              <Route path="/pickup" component={Pickup} />
              {/* @TODO: Not Found 404 page */}
              <Route component={StoreDetail} />
            </Switch>
          </OrderContextProvider>
        </LanguageContextProvider>
      </Route>
    </ApolloProvider>
  )
}

export default App
