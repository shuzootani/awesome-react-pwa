import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { createOrderMutation } from '../../graphql/mutations'
import StripeContextProvider, { StripeContext } from '../../providers/StripeContextProvider'
import { paymentMethods } from '../../utils/payment'
import FooterButton from '../../components/FooterButton'
import CreditCardInput from '../../components/CreditCardInput'
import PaymentSelectItem from './PaymentSelectItem'
import {
  PaymentPageContainer, PaymentMethodList, PaymentFormContainer, InputContainer, NameInput,
} from './styled'
import { basketQuery } from '../../graphql/queries'
import { basketId } from '../../utils/localStorage'
import { formatOrderItems } from '../../utils/formatter'

function Payment({ history }) {
  const [selectedPayment, setPayment] = useState()
  const { data: { basket } } = useQuery(basketQuery, { variables: { id: basketId } })
  const [createOrder] = useMutation(createOrderMutation)
  const [name, setName] = useState('')
  const [focused, setFocused] = useState(false)
  const { stripe } = useContext(StripeContext)

  function onFocusCCInput() {
    setFocused(true)
  }

  function onBlurCCInput() {
    setFocused(false)
  }

  function onNameChange({ target: { value } }) {
    setName(value)
  }


  async function goToPickup() {
    const { source, error } = await stripe.createSource({
      type: 'sepa_debit',
      sepa_debit: {
        iban: 'DE89370400440532013000',
      },
      currency: 'eur',
      owner: {
        name,
      },
    })

    if (!error) {
      const order = {
        user_id: 'anonymous',
        store_id: basket.store_id,
        source_id: source.id,
        payment_type: source.type,
        pickup_time: moment().toISOString(),
        items: formatOrderItems(basket.items),
      }
      const res = await createOrder({ variables: { order } })
      console.log({ res })
      history.push('/pickup')
    }
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
  )
}

const WithStripe = props => (
  <StripeContextProvider>
    <Payment {...props} />
  </StripeContextProvider>
)

export default WithStripe

Payment.propTypes = {
  history: PropTypes.object.isRequired,
}
