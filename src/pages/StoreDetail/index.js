import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { storeQuery } from '../../graphql/queries'
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
import { PurchaseContext } from '../../providers/PurchaseContextProvider'

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
  const { data } = useQuery(storeQuery, {
    variables: { id: storeId },
    fetchPolicy: 'cache-and-network',
  })
  const { basket } = useContext(PurchaseContext)

  return data && data.store ? (
    <StoreDetailContainer>
      <StoreImageContainer>
        <ImageOverlay />
        <StoreImage src={data.store.banner} />
        <BottomContainer>
          <StoreName>{data.store.name}</StoreName>
          <BottomButtonsContainer>
            <PickupTimeSelector {...data.store} />
            <CartButton
              basket={basket}
              navToCart={() => history.push('/checkout')}
            />
          </BottomButtonsContainer>
        </BottomContainer>
      </StoreImageContainer>
      <Menu storeId={storeId} />
    </StoreDetailContainer>
  ) : null
}

StoreDetail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default StoreDetail
