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
import { PurchaseContext } from '../../providers/PurchaseContextProvider'
import FooterButton from '../../components/FooterButton'
import Icon from '../../components/Icon'
import { formatPrice } from '../../utils/formatter'
import Color from '../../utils/color'
import FlexBox from '../../components/FlexBox'
import { HeaderSmall, BodyCopy } from '../../components/Text'
import ItemCounter from '../../components/ItemCounter'

const PLATFORM_FEE = 35

function Checkout({ history }) {
  const { basket } = useContext(PurchaseContext)

  function goToPayment() {
    history.push('/payment')
  }

  return basket ? (
    <CheckoutContainer>
      <ProductListContainer>
        {basket.items.map(product => (
          <ProductItemContainer key={product.id}>
            <ProductImage src={product.image} size="70px" />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              {product.extras
                && product.extras.map(extra => (
                  <FlexBox key={extra.extra_id}>
                    <Icon name="check" color={Color.Cyan} />
                    <ExtraName>{extra.name}</ExtraName>
                  </FlexBox>
                ))}
              {product.comment && <Comment>{`※ ${product.comment}`}</Comment>}
              <ItemCounter
                value={product.quantity}
                inc={() => {}}
                dec={() => {}}
                max={product.quantity}
              />
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
        <HeaderSmall>
          {formatPrice(basket.total, null, PLATFORM_FEE)}
        </HeaderSmall>
      </Row>
      <FooterButton onClick={goToPayment}>Go to Payment</FooterButton>
    </CheckoutContainer>
  ) : null
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Checkout
