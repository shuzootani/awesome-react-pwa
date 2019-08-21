import React, { memo } from 'react'
import { Elements, CardElement } from 'react-stripe-elements'

function CreditCardInput(props) {
  return (
    <Elements>
      <CardElement {...props} onReady={el => el.focus()} />
    </Elements>
  )
}

export default memo(CreditCardInput)
