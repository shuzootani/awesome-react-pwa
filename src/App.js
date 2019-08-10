import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { AppConfig } from './utils/config'
import client from './apolloClient'

import Header from './components/Header'
import StoreDetail from './pages/StoreDetail'
import Checkout from './pages/Checkout'
import BasketContextProvider from './providers/BasketContextProvider'
import Payment from './pages/Payment'
import Pickup from './pages/Pickup'
import LanguageContextProvider from './providers/LanguageContextProvider'
import StripeContextProvider from './providers/StripeContextProvider'

require('./App.css')

function App() {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(AppConfig.STRIPE_PUBLIC_KEY))
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe(AppConfig.STRIPE_PUBLIC_KEY))
      })
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <LanguageContextProvider>
        <Route path="*" component={Header} />
        <StripeContextProvider stripe={stripe}>
          <BasketContextProvider>
            <Switch>
              <Route path="/store/:storeId" component={StoreDetail} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
              <Route path="/pickup" component={Pickup} />
              {/* @TODO: Not Found 404 page */}
              <Route component={StoreDetail} />
            </Switch>
          </BasketContextProvider>
        </StripeContextProvider>
      </LanguageContextProvider>
    </ApolloProvider>
  )
}

export default App
