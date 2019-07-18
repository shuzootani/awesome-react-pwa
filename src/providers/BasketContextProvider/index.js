import React, { createContext } from 'react'

export const BasketContext = createContext()

function BasketContextProvider({ children }) {
  const initialBasketValue = {
    products: [],
    total: 0,
    pickup: null,
    code: {},
    campaigns: [],
    lastPickupTimeChangeTimeStamp: '',
  }
  const [basket, setBasket] = useState({})

  function addProduct(product, count) {
    const total = product.price * count
    const products = [...basket.products, product]
    const newBasket = {
      ...basket,
      products,
      total,
    }
    setBasket(newBasket)
  }

  return (
    <BasketContext.Provider value={basket}>
      {children}
    </BasketContext.Provider>
  )
}

export default BasketContextProvider
