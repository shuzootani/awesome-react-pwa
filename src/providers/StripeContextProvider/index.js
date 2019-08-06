import React, { createContext, useState, useEffect } from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { AppConfig } from '../../utils/config'

export const StripeContext = createContext()

function StripeContextProvider ({ stripe, children }) {
  return (
    <StripeProvider stripe={stripe}>
      <StripeContext.Provider value={{ stripe }}>
        {children}
      </StripeContext.Provider>
    </StripeProvider>
  )
}

export default StripeContextProvider
