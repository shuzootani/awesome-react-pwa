import React, { useState } from 'react'
import styled from 'styled-components'
import { PaymentContainer, InputContainer } from './styled'
import CreditCardInput from '../../components/CreditCardInput'
import FooterButton from '../../components/FooterButton'
import TextInput from '../../components/TextInput'

const NameInput = styled(TextInput)`
  margin-bottom: 1rem;
`

function Payment ({ history }) {
  const [name, setName] = useState('')
  const [focused, setFocused] = useState(false)

  function goToPickup () {
    history.push('/pickup')
  }

  function toggleFocus () {
    setFocused(!focused)
  }

  function onNameChange ({ target: { value } }) {
    setName(value)
  }

  return (
    <PaymentContainer>
      <NameInput
        name='name'
        autComplete='cc-name'
        autoFocus
        placeholder='Name'
        required
        onChange={onNameChange}
      />
      <InputContainer focused={focused}>
        <CreditCardInput
          autoComplete='cc-number'
          onFocus={toggleFocus}
          onBlur={toggleFocus}
        />
      </InputContainer>
      <FooterButton onClick={goToPickup}>Pay</FooterButton>
    </PaymentContainer>
  )
}

export default Payment
