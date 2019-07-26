import React, { useState } from 'react'
import { PaymentContainer, InputContainer } from './styled'
import CreditCardInput from '../../components/CreditCardInput'
import FooterButton from '../../components/FooterButton'

function Payment ({ history }) {
  const [focused, setFocused] = useState(false)

  function goToPickup() {
    history.push('/pickup')
  }

  function toggleFocus() {
    setFocused(!focused)
  }

  return (
    <PaymentContainer>
      <InputContainer focused={focused}>
        <CreditCardInput onFocus={toggleFocus} onBlur={toggleFocus} />
      </InputContainer>
      <FooterButton onClick={goToPickup}>
        Pay
      </FooterButton>
    </PaymentContainer>
  )
}

export default Payment
