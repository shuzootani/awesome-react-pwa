import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export const OrderContext = createContext()

export const ORDER_STATE = {
  PICKED_UP: 'PICkED_UP',
}

function OrderContextProvider({ children }) {
  const [pickup, setPickup] = useState({ time: moment(), isInstanceOrder: true })
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
