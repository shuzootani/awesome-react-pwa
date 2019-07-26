import React from 'react'
import { CheckoutContainer } from './styled'
import FooterButton from '../../components/FooterButton';

function Checkout({ history }) {
  function goToPayment() {
    history.push('/payment')
  }

  return (
    <CheckoutContainer>
      <FooterButton onClick={goToPayment}>
        Go to Payment
      </FooterButton>
    </CheckoutContainer>
  )
}

export default Checkout
