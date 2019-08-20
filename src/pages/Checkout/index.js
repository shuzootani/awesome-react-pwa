import React from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CheckoutContainer, ProductListContainer, Row } from './styled'
import FooterButton from '../../components/FooterButton'
import { formatPrice, formatBasketItemInput } from '../../utils/formatter'
import { basketId } from '../../utils/localStorage'
import { HeaderSmall, BodyCopy } from '../../components/Text'
import { basketQuery } from '../../graphql/queries'
import BasketItem from './BasketItem'
import { updateBasketItem, removeFromBasket } from '../../graphql/mutations'

const PLATFORM_FEE = 35

function Checkout({ history }) {
  const {
    data: { basket },
  } = useQuery(basketQuery, { variables: { id: basketId } })

  function goToPayment() {
    history.push('/payment')
  }

  const [updateBasketItemMutation, { loading: updating }] = useMutation(
    updateBasketItem,
    {
      update(
        cache,
        {
          data: { updateBasketItem: basketData },
        }
      ) {
        const updated = cache.readQuery({
          query: basketQuery,
          data: basketData,
          variables: { id: basketData.id },
        })
        cache.writeQuery({
          query: basketQuery,
          data: updated,
          variables: { id: basketData.id },
        })
        return basketData
      },
    }
  )

  const [removeFromBasketMutation, { loading: removing }] = useMutation(
    removeFromBasket,
    {
      update(
        cache,
        {
          data: { removeFromBasket: basketData },
        }
      ) {
        const updated = cache.readQuery({
          query: basketQuery,
          data: basketData,
          variables: { id: basketData.id },
        })
        cache.writeQuery({
          query: basketQuery,
          data: updated,
          variables: { id: basketData.id },
        })
        return basketData
      },
    }
  )

  function updateQuantity(product, add = true) {
    const quantity = add ? product.quantity + 1 : product.quantity - 1
    const optimisticItem = { ...product, quantity }
    const basketItemInput = formatBasketItemInput({
      ...optimisticItem,
      storeId: basket.store_id,
    })
    updateBasketItemMutation({
      variables: {
        id: basket.id,
        product: basketItemInput,
      },
      optimisticResponse: {
        updateBasketItem: {
          id: basket.id,
          user_id: basket.user_id,
          store_id: basket.store_id,
          total: basket.total,
          items: basket.items.map(item => item.id === product.id
            ? { ...optimisticItem, __typename: 'BasketItem' }
            : { ...item, __typename: 'BasketItem' }),
          __typename: 'Basket',
        },
      },
    })
  }

  function increment(product) {
    updateQuantity(product)
  }

  function decrement(product) {
    updateQuantity(product, false)
  }

  function removeItem(id) {
    removeFromBasketMutation({
      variables: {
        id: basket.id,
        item_id: id,
      },
      optimisticResponse: {
        removeFromBasket: {
          id: basket.id,
          user_id: basket.user_id,
          store_id: basket.store_id,
          total: basket.total,
          items: basket.items.reduce(
            (arr, item) => item.id !== id ? [...arr, { ...item, __typename: 'BasketItem' }] : arr,
            []
          ),
          __typename: 'Basket',
        },
      },
    })
  }

  return basket ? (
    <CheckoutContainer>
      <ProductListContainer>
        {basket.items.map(item => (
          <BasketItem
            key={item.id}
            increment={increment}
            decrement={decrement}
            remove={removeItem}
            item={item}
          />
        ))}
      </ProductListContainer>
      <Row justifyContent="space-between">
        <BodyCopy>Bestellgebühr</BodyCopy>
        <BodyCopy>{formatPrice(PLATFORM_FEE)}</BodyCopy>
      </Row>
      <Row justifyContent="space-between">
        <HeaderSmall>Gesamtbetrag</HeaderSmall>
        <HeaderSmall>{formatPrice(basket.total)}</HeaderSmall>
      </Row>
      <FooterButton disabled={updating || removing} onClick={goToPayment}>
        Go to Payment
      </FooterButton>
    </CheckoutContainer>
  ) : null
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Checkout
