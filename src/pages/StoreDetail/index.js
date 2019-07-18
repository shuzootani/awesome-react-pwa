import React from 'react'
import { Query } from 'react-apollo'
import { storeQuery } from '../../graphql/queries'
import { StoreImageContainer, StoreImage } from './Components'
import Menu from './Menu'

// storeId to test
// str_u1jrt15jbudc
// str_u1jrte2sudch
// str_u1jrtcx1zx81

function StoreDetail (props) {
  const { storeId } = props.match.params
  return (
    <Query
      query={storeQuery}
      variables={{ id: storeId }}
      fetchPolicy={'cache-and-network'}
    >
      {({ data, loading, error }) => {
        console.log({ store: data })
        console.warn({ error })
        const { store } = data && data
        return store ? (
          <div>
            <StoreImageContainer>
              <StoreImage src={store.banner} />
            </StoreImageContainer>
            <Menu storeId={storeId} />
          </div>
        ) : null
      }}
    </Query>
  )
}

export default StoreDetail
