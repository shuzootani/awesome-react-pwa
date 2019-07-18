import React from 'react'
import { Query } from 'react-apollo'
import { storeQuery } from '../../graphql/queries'
import { StoreImageContainer, StoreImage } from './Components'
import Menu from './Menu'
import BasketContextProvider from '../../providers/BasketContextProvider'

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
        console.log({ store: data })
        console.warn({ error })
        return data && data.store ? (
          <React.Fragment>
            <StoreImageContainer>
              <StoreImage src={data.store.banner} />
            </StoreImageContainer>
            <BasketContextProvider>
              <Menu storeId={storeId} />
            </BasketContextProvider>
          </React.Fragment>
        ) : null
      }}
    </Query>
  )
}

export default StoreDetail
