import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { createOrderMutation } from '../../graphql/mutations'
import StripeContextProvider from '../../providers/StripeContextProvider'
import { paymentMethods } from '../../utils/payment'
import FooterButton from '../../components/FooterButton'
import PaymentSelectItem from './PaymentSelectItem'
import { PaymentPageContainer, PaymentMethodList } from './styled'

function Payment({ history }) {
  const [selectedPayment, setPayment] = useState('google-pay') // @TODO
  const [createOrder] = useMutation(createOrderMutation)

  function goToPickup() {
    // const order = {
    //   id: '',
    //   transaction_id: '',
    //   code_text: '',
    //   code_emoji: '',
    //   total: '',
    //   status: '',
    //   pickup_time: '',
    //   created_at: '',
    // }
    // createOrder({ variables: { order }, onCompleted: history.push('/pickup') })
    console.log({ createOrder })
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
    <StripeContextProvider>
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
    </StripeContextProvider>
  )
}

export default Payment

Payment.propTypes = {
  history: PropTypes.object.isRequired,
}
