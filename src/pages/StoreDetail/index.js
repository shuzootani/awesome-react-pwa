import * as React from 'react'
import { Query } from 'react-apollo'
import { storeQuery } from '../../graphql/queries'
import {
  StoreDetailContainer,
  StoreImageContainer,
  StoreImage,
  BottomButtonsContainer,
  StoreName,
  ImageOverlay,
  BottomContainer
} from './Components'
import Menu from './Menu'
import SingleStoreMap from '../../components/SingleStoreMap'
import StoreLocation from './StoreLocation'
import PickupTimeSelector from './PickupTimeSelector'

// storeId to test
// str_u1jrt15jbudc
// str_u1jrte2sudch
// str_u1jrtcx1zx81

function StoreDetail (props) {
  const { storeId = 'str_u1jrtcx1zx81' } = props.match.params
  return (
    <Query
      query={storeQuery}
      variables={{ id: storeId }}
      fetchPolicy={'cache-and-network'}
    >
      {({ data, loading, error }) => {
        // console.log({ data })
        // console.warn({ error })
        return data && data.store ? (
          <StoreDetailContainer>
            <StoreImageContainer>
              <ImageOverlay />
              <StoreImage src={data.store.banner} />
              <BottomContainer>
                <StoreName>{data.store.name}</StoreName>
                <BottomButtonsContainer>
                  <PickupTimeSelector {...data.store} />
                  <StoreLocation {...data.store} />
                </BottomButtonsContainer>
              </BottomContainer>
            </StoreImageContainer>
            <Menu storeId={storeId} />
          </StoreDetailContainer>
        ) : null
      }}
    </Query>
  )
}

export default React.memo(StoreDetail)
