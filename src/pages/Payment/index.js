import React from 'react'
import { PaymentContainer } from './styled'
import CreditCardInput from '../../components/CreditCardInput'
import FooterButton from '../../components/FooterButton';

function Payment ({ history }) {
  function goToPickup() {
    history.push('/pickup')
  }

  return (
    <PaymentContainer>
      <CreditCardInput />
      <FooterButton onClick={goToPickup}>
        Pay
      </FooterButton>
    </PaymentContainer>
  )
}

export default Payment
