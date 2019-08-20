import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import { AppConfig } from '../../utils/config'

export const StripeContext = createContext()

function StripeContextProvider({ children }) {
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
    <StripeProvider stripe={stripe}>
      <StripeContext.Provider value={{ stripe }}>
        {children}
      </StripeContext.Provider>
    </StripeProvider>
  )
}

StripeContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
}

export default StripeContextProvider
