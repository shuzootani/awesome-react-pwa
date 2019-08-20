import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { createOrderMutation } from '../../graphql/mutations'
import StripeContextProvider from '../../providers/StripeContextProvider'
import { paymentMethods } from '../../utils/payment'
import FooterButton from '../../components/FooterButton'
import CreditCardInput from '../../components/CreditCardInput'
import PaymentSelectItem from './PaymentSelectItem'
import {
  PaymentPageContainer, PaymentMethodList, PaymentFormContainer, InputContainer, NameInput,
} from './styled'

function Payment({ history }) {
  const [selectedPayment, setPayment] = useState('google-pay') // @TODO
  const [createOrder] = useMutation(createOrderMutation)
  const [name, setName] = useState('')
  const [focused, setFocused] = useState(false)

  function onFocusCCInput() {
    setFocused(true)
  }

  function onBlurCCInput() {
    setFocused(false)
  }

  function onNameChange({ target: { value } }) {
    setName(value)
    console.log(name)
  }


  function goToPickup() {
    const order = {
      id: '',
      transaction_id: '',
      code_text: '',
      code_emoji: '',
      total: '',
      status: '',
      pickup_time: '',
      created_at: '',
    }
    createOrder({ variables: { order }, onCompleted: history.push('/pickup') })
    history.push('/pickup')
  }

  function onChangePayment(id) {
    if (selectedPayment === id) {
      setPayment(null)
    } else {
      setPayment(id)
    }
  }

  const showForm = selectedPayment && !['google-pay', 'apple-pay'].includes(selectedPayment)
  return (
    <StripeContextProvider>
      <PaymentPageContainer>
        <PaymentMethodList>
          {paymentMethods.map((method) => {
            const selected = method.id === selectedPayment
            return selectedPayment ? (
              selected && (
                <PaymentSelectItem
                  key={method.id}
                  {...method}
                  selected={selected}
                  onClick={onChangePayment}
                />
              )
            ) : (
              <PaymentSelectItem
                key={method.id}
                {...method}
                selected={selected}
                onClick={onChangePayment}
              />
            )
          })}
        </PaymentMethodList>
        {showForm && (
          <PaymentFormContainer>
            <InputContainer focused={focused}>
              <CreditCardInput
              // autoComplete="cc-number"
                onFocus={onFocusCCInput}
                onBlur={onBlurCCInput}
              />
            </InputContainer>
            <NameInput
              name="name"
              autComplete="cc-name"
              placeholder="Name"
              required
              onChange={onNameChange}
            />
          </PaymentFormContainer>
        )}
        <FooterButton disabled={!selectedPayment} onClick={goToPickup}>
        Pay
        </FooterButton>
      </PaymentPageContainer>
    </StripeContextProvider>
  )
}

export default Payment

Payment.propTypes = {
  history: PropTypes.object.isRequired,
}
