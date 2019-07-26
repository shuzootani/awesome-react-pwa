import React, { useContext } from 'react'
import {
  CheckoutContainer,
  ProductListContainer,
  ProductItemContainer,
  ProductName,
  ProductDescription,
  ProductPrice
} from './styled'
import FooterButton from '../../components/FooterButton'
import BasketContextProvider, {
  BasketContext
} from '../../providers/BasketContextProvider'
import { formatPrice } from '../../utils/formatter'

function Checkout ({ history }) {
  const { basket, total } = useContext(BasketContext)

  function goToPayment () {
    history.push('/payment')
  }

  return (
    <CheckoutContainer>
      <ProductListContainer>
        {basket.products.map(product => (
          <ProductItemContainer key={product.id}>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.teaser_text_long}</ProductDescription>
            <ProductPrice>{formatPrice(product.price)}</ProductPrice>
          </ProductItemContainer>
        ))}
      </ProductListContainer>
      <FooterButton onClick={goToPayment}>Go to Payment</FooterButton>
    </CheckoutContainer>
  )
}

export default Checkout
