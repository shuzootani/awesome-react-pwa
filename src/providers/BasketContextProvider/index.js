import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const BasketContext = createContext()

function BasketContextProvider({ children }) {
  const initialBasketValue = {
    store_id: null,
    products: [],
    total: 0,
    pickup: null,
    code: {},
    campaigns: [],
    lastPickupTimeChangeTimeStamp: '',
  }
  const [basket, setBasket] = useState(initialBasketValue)

  function addProduct(product, count = 1) {
    const basketItem = productToBasketItem(product, product.extras)
    const total = basketItem.price * count
    const products = [...basket.products, basketItem]
    const newBasket = {
      ...basket,
      store_id: basketItem.store_id,
      products,
      total,
    }
    setBasket(newBasket)
  }

  function getExtraDetails(extras) {
    let extrasTotal = 0
    let extrasIdentifier = ''
    if (extras && extras.length > 0) {
      extras.forEach((extra) => {
        extrasTotal += extra.price
      })
      extrasIdentifier = `_${extras.map(p => p.name).sort().join('_')}`
    }
    return { extrasTotal, extrasIdentifier }
  }

  function productToBasketItem(product = {}, extras = [], campaign = {}) {
    const selectedExtras = extras // Directly supplied or default delected
      || (product.extras && product.extras.filter(extra => extra.is_selected && extra.name === extra.group_name))
    const { extrasTotal, extrasIdentifier } = getExtraDetails(selectedExtras)
    const commentIdentifier = product.comment ? `_${product.comment}` : ''
    let basketProduct = {
      id: product.id + extrasIdentifier + commentIdentifier,
      product_id: product.product_id || product.id,
      name: product.name,
      image: product.image,
      teaser_text: product.teaser_text,
      // base_price passed only from an order query. used to prevent adding extrasTotal to price which already includes extras
      price: (product.base_price || product.price) + extrasTotal,
      has_cutlery: product.has_cutlery,
      old_price: product.old_price ? product.old_price + extrasTotal : null,
      is_promo: product.is_promo ? product.is_promo : false,
      extras: selectedExtras && selectedExtras.length > 0 && selectedExtras.map(extra => ({
        extra_id: extra.extra_id,
        name: extra.name,
        price: extra.price,
      })),
      comment: product.comment,
      store_id: product.storeId,
      brand_id: product.brand.id,
      category_id: product.category.id,
      quantity: 1,
    }
    if (product.variant_id) { // Add specified variant
      basketProduct = {
        ...basketProduct,
        id: `${basketProduct.id}_${product.variant_id}`,
        variant_id: product.variant_id,
      }
    } else if (product.variants) { // Add default variant
      const variant = product.variants.find(v => v.is_default)
      const variantPrice = variant.price && variant.price + extrasTotal
      basketProduct = {
        ...basketProduct,
        id: `${basketProduct.id}_${variant.variant_id}`,
        variant_id: variant.variant_id,
        name: variant.name || basketProduct.name,
        image: variant.image || basketProduct.image,
        price: variantPrice || basketProduct.price,
      }
    }
    if (campaign.id) {
      basketProduct = {
        ...basketProduct,
        id: `${basketProduct.id}_${campaign.id}`,
        name: campaign.offer_name,
        campaign: campaign.id,
        full_price: basketProduct.price,
        price: campaign.price,
        quantity_max: campaign.quantity_max,
      }
    }
    return basketProduct
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
        addProduct,
        total: basket.total,
        amount: basket.products.length,
        productToBasketItem,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

BasketContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default BasketContextProvider
