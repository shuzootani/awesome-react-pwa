import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../../../../utils/formatter'
import {
  ProductItemContainer,
  ProductItem,
  ProductImageContainer,
  ProductImage,
  ProductInfoContainer,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
} from './styled'
import ProductOrderSheet from './ProductOrderSheet'

function ProductListItem({ product, addToBasket }) {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(prevOpen => !prevOpen)
  }

  function add(basketItem) {
    addToBasket(basketItem, 1)
    setOpen(false)
  }

  return (
    <React.Fragment>
      <ProductItemContainer key={product.id} onClick={handleClick}>
        <ProductItem>
          <ProductImageContainer>
            <ProductImage src={product.image} />
          </ProductImageContainer>
          <ProductInfoContainer>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.teaser_text}</ProductDescription>
            </ProductInfo>
            <ProductPrice discounted={!!product.old_price || product.is_promo}>
              {formatPrice(product.price)}
            </ProductPrice>
          </ProductInfoContainer>
        </ProductItem>
      </ProductItemContainer>
      {/* Drawer */}
      {open && <ProductOrderSheet product={product} addToBasket={add} />}
    </React.Fragment>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
}

export default ProductListItem
