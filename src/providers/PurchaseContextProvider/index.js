import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/react-hooks'
import { basketQuery } from '../../graphql/queries'

export const PurchaseContext = createContext()

function PurchaseContextProvider({ children }) {
  const initialBasket = {
    id: null,
    store_id: null,
    items: [],
    total: 0,
  }
  const [basket, setBasket] = useState(initialBasket)
  const [pickup, setPickup] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    if (basket.id) {
      client.query({
        query: basketQuery,
        variables: { id: basket.id },
        fetchPolicy: 'cache-first',
      }).then(({ data }) => {
        if (data.basket) {
          setBasket(data.basket)
        }
      }).catch((e) => {
        console.log(e)
      })
    } else {
      setBasket({ ...basket, id: localStorage.getItem('basketId') })
    }

    return () => {
      localStorage.setItem('basketId', basket.id)
    }
  }, [basket])

  return (
    <PurchaseContext.Provider
      value={{
        basket,
        setBasket,
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
