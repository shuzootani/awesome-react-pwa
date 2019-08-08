import React, { useState } from 'react'
import styled from 'styled-components'
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
  ProductPrice
} from './styled'
import ProductOrderSheet from './ProductOrderSheet'
import Space from '../../../../utils/space'
import Color from '../../../../utils/color';

function ProductListItem ({ onClick, product }) {
  const [open, setOpen] = useState(false)
  const [productCount, setProductCount] = useState(1)

  function handleClick () {
    onClick(product)
    setOpen(prevOpen => !prevOpen)
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
      {open && <ProductOrderSheet product={product} />}
    </React.Fragment>
  )
}

export default ProductListItem
