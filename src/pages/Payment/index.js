import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { PaymentPageContainer, PaymentMethodList } from './styled'
import FooterButton from '../../components/FooterButton'
import PaymentSelectItem from './PaymentSelectItem'
import { paymentMethods } from '../../utils/payment'

function Payment({ history }) {
  const [selectedPayment, setPayment] = useState('google-pay') // @TODO

  function goToPickup() {
    history.push('/pickup')
  }

  function onChangePayment(id) {
    if (selectedPayment === id) {
      setPayment(null)
    } else {
      setPayment(id)
    }
  }

  return (
    <PaymentPageContainer>
      <PaymentMethodList>
        {paymentMethods.map((method) => {
          const selected = method.id === selectedPayment
          return (
            <PaymentSelectItem
              key={method.id}
              {...method}
              selected={selected}
              onClick={onChangePayment}
              showForm={!['google-pay', 'apple-pay'].includes(method.id)}
            />
          )
        })}
      </PaymentMethodList>
      <FooterButton disabled={!selectedPayment} onClick={goToPickup}>
        Pay
      </FooterButton>
    </PaymentPageContainer>
  )
}

export default Payment

Payment.propTypes = {
  history: PropTypes.object.isRequired,
}
