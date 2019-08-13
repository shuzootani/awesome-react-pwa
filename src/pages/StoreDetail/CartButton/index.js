import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import { FLEX_CENTER_CENTER } from '../../../utils/styles'

const CartButtonContainer = styled.div`
  position: relative;
`

const CartIconButton = styled(Icon)`
  margin-left: 4px;
  ${FLEX_CENTER_CENTER};
  background: ${Color.Cyan};
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50px;
`

const Badge = styled.div`
  min-width: min-content;
  min-height: min-content;
  border-radius: 50%;
  background: red;
  color: #fff;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  ${FLEX_CENTER_CENTER};
  font-size: 0.9rem;
`

function CartButton({ basket, navToCart }) {
  const badgeNumber = useMemo(
    () => basket && basket.items.reduce((sum, item) => sum + item.quantity, 0),
    [basket]
  )

  function handleClick() {
    navToCart()
  }

  return (
    <CartButtonContainer>
      {!!badgeNumber && <Badge>{badgeNumber}</Badge>}
      <CartIconButton onClick={handleClick} name="cart" />
    </CartButtonContainer>
  )
}

CartButton.propTypes = {
  navToCart: PropTypes.func.isRequired,
  basket: PropTypes.object,
}

CartButton.defaultProps = {
  basket: null,
}

export default CartButton
