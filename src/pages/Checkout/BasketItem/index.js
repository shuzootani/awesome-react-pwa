import React from 'react'
import PropTypes from 'prop-types'
import {
  ProductItemContainer,
  ProductName,
  ExtraName,
  ProductInfo,
  Comment,
  ProductPrice,
  ProductImage,
} from './styled'
import FlexBox from '../../../components/FlexBox'
import Icon from '../../../components/Icon'
import ItemCounter from '../../../components/ItemCounter'
import { formatPrice } from '../../../utils/formatter'
import Color from '../../../utils/color'

function BasketItem({
  item, increment, decrement, remove,
}) {

  function inc() {
    increment(item)
  }

  function dec() {
    decrement(item)
  }

  function removeFromBasket() {
    remove(item.id)
  }

  return (
    <ProductItemContainer key={item.id}>
      <ProductImage src={item.image} size="70px" />
      <ProductInfo>
        <ProductName>{item.name}</ProductName>
        {item.extras
          && item.extras.map(extra => (
            <FlexBox key={extra.extra_id}>
              <Icon name="check" color={Color.Cyan} />
              <ExtraName>{extra.name}</ExtraName>
            </FlexBox>
          ))}
        {item.comment && <Comment>{`※ ${item.comment}`}</Comment>}
        <ItemCounter
          value={item.quantity}
          inc={inc}
          dec={dec}
          remove={removeFromBasket}
          max={item.quantity_max}
        />
      </ProductInfo>
      <ProductPrice>{formatPrice(item.price)}</ProductPrice>
    </ProductItemContainer>
  )
}

BasketItem.propTypes = {
  item: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default BasketItem
