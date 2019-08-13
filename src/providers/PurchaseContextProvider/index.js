import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const PurchaseContext = createContext()

function PurchaseContextProvider({ children }) {
  const [pickup, setPickup] = useState(null)
  return (
    <PurchaseContext.Provider
      value={{
        // basket,
        // setBasket,
        pickup,
        setPickup,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  )
}

PurchaseContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default PurchaseContextProvider
