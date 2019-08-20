import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const OrderContext = createContext()

export const ORDER_STATE = {
  PICKED_UP: 'PICkED_UP',
}

function OrderContextProvider({ children }) {
  const [pickup, setPickup] = useState(null)
  const [order, setOrder] = useState(null)
  const [campaign, setCampaign] = useState(null)

  return (
    <OrderContext.Provider
      value={{
        pickup,
        setPickup,
        order,
        setOrder,
        campaign,
        setCampaign,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

OrderContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default OrderContextProvider
