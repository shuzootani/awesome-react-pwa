import React from 'react'
import { Query } from 'react-apollo'
import { storeQuery } from '../../graphql/queries'

function StoreDetail(props) {
  const { storeId } = props.match.params
  return (
    <Query query={storeQuery} variables={{ id: storeId }}>
      {({ data: { store }, loading, error }) => {
        return (
          <div>
            <div>StoreDetail: {storeId}</div>
            <div>{JSON.stringify(store)}</div>
          </div>
        )
      }}
    </Query>
  )
}

export default StoreDetail
