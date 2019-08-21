import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
import { AppConfig } from '../../utils/config'
import useScript from '../../hooks/useScript'

export const StripeContext = createContext()

function StripeContextProvider({ children }) {
  const [stripe, setStripe] = useState(null)
  const { loaded } = useScript('https://js.stripe.com/v3/')

  useEffect(() => {
    if (loaded && window.Stripe && !stripe) {
      setStripe(window.Stripe(AppConfig.STRIPE_PUBLIC_KEY))
    }
  }, [loaded])

  return (
    <StripeProvider stripe={stripe}>
      <StripeContext.Provider value={{ stripe }}>
        {typeof children === 'function' ? children(stripe) : children}
      </StripeContext.Provider>
    </StripeProvider>
  )
}

StripeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default StripeContextProvider
