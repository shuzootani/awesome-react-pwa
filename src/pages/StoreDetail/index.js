import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { storeQuery, basketQuery } from '../../graphql/queries'
import {
  StoreDetailContainer,
  StoreImageContainer,
  StoreImage,
  BottomButtonsContainer,
  StoreName,
  ImageOverlay,
  BottomContainer,
} from './styled'
import Menu from './Menu'
import CartButton from './CartButton'
import PickupTimeSelector from './PickupTimeSelector'
import { basketId } from '../../utils/localStorage'
import { setPickupSchedule } from '../../utils/time'
import { OrderContext } from '../../providers/OrderContextProvider'

// storeId to test
// str_u1jrt15jbudc
// str_u1jrte2sudch
// str_u1jrtcx1zx81
function StoreDetail({
  history,
  match: {
    params: { storeId = 'str_u1jrtcx1zx81' },
  },
}) {
  const {
    data: { store },
  } = useQuery(storeQuery, { variables: { id: storeId } })
  const {
    data: { basket },
  } = useQuery(basketQuery, { variables: { id: basketId } })

  const { setPickup } = useContext(OrderContext)

  function onChangePickup(date, time) {
    const pickup = setPickupSchedule(date, time)
    console.log({ pickup })
    setPickup(pickup)
  }

  return store ? (
    <StoreDetailContainer>
      <StoreImageContainer>
        <ImageOverlay />
        <StoreImage src={store.banner} />
        <BottomContainer>
          <StoreName>{store.name}</StoreName>
          <BottomButtonsContainer>
            <PickupTimeSelector store={store} onChange={onChangePickup} />
            <CartButton
              basket={basket}
              navToCart={() => history.push('/checkout')}
            />
          </BottomButtonsContainer>
        </BottomContainer>
      </StoreImageContainer>
      <Menu storeId={storeId} basket={basket} />
    </StoreDetailContainer>
  ) : null
}

StoreDetail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default StoreDetail
