import React from 'react'

function StoreDetail(props) {
  const { storeId } = props.match.params
  return (
    <div>
      StoreDetail: {storeId}
    </div>
  )
}

export default StoreDetail
