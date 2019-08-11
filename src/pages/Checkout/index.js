import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  CheckoutContainer,
  ProductListContainer,
  ProductItemContainer,
  ProductName,
  ExtraName,
  ProductInfo,
  Comment,
  ProductPrice,
  ProductImage,
  Row,
} from './styled'
import FooterButton from '../../components/FooterButton'
import Icon from '../../components/Icon'
import {
  BasketContext,
} from '../../providers/BasketContextProvider'
import { formatPrice } from '../../utils/formatter'
import Color from '../../utils/color'
import FlexBox from '../../components/FlexBox'
import { HeaderSmall, BodyCopy } from '../../components/Text'

const PLATFORM_FEE = 35

function Checkout({ history }) {
  const { basket, total } = useContext(BasketContext)

  function goToPayment() {
    history.push('/payment')
  }

  return (
    <CheckoutContainer>
      <ProductListContainer>
        {basket.products.map(product => (
          <ProductItemContainer key={product.id}>
            <ProductImage src={product.image} size="70px" />
            <ProductInfo vertical>
              <ProductName>{product.name}</ProductName>
              {product.extras && product.extras.map(extra => (
                <FlexBox key={extra.extra_id}>
                  <Icon name="check" color={Color.Cyan} />
                  <ExtraName>{extra.name}</ExtraName>
                </FlexBox>
              ))}
              {product.comment && <Comment>{`※ ${product.comment}`}</Comment>}
            </ProductInfo>
            <ProductPrice>{formatPrice(product.price)}</ProductPrice>
          </ProductItemContainer>
        ))}
      </ProductListContainer>
      <Row justifyContent="space-between">
        <BodyCopy>Bestellgebühr</BodyCopy>
        <BodyCopy>{formatPrice(PLATFORM_FEE)}</BodyCopy>
      </Row>
      <Row justifyContent="space-between">
        <HeaderSmall>Gesamtbetrag</HeaderSmall>
        <HeaderSmall>{formatPrice(total, null, PLATFORM_FEE)}</HeaderSmall>
      </Row>
      <FooterButton onClick={goToPayment}>Go to Payment</FooterButton>
    </CheckoutContainer>
  )
}

export default Checkout

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
}
