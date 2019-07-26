import React from 'react'
import { Elements, CardElement } from 'react-stripe-elements'
import { PaymentContainer } from './styled'
import Color from '../../utils/color';

const styles = {
  input: {
    base: {
      color: Color.DarkGreen,
      fontWeight: 'bold'
    }
  }
}

function Checkout () {
  return (
    <PaymentContainer>
      <Elements>
        <CardElement onReady={el => el.focus()} style={styles.input} />
      </Elements>
    </PaymentContainer>
  )
}

export default Checkout
