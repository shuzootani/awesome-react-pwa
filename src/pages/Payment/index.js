/* eslint-disable camelcase */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { createOrderMutation } from '../../graphql/mutations'
import StripeContextProvider, {
  StripeContext,
} from '../../providers/StripeContextProvider'
import { OrderContext } from '../../providers/OrderContextProvider'
import { paymentMethods } from '../../utils/payment'
import FooterButton from '../../components/FooterButton'
import CreditCardInput from '../../components/CreditCardInput'
import PaymentSelectItem from './PaymentSelectItem'
import {
  PaymentPageContainer,
  PaymentMethodList,
  PaymentFormContainer,
  InputContainer,
  NameInput,
} from './styled'
import { basketQuery } from '../../graphql/queries'
import { basketId } from '../../utils/localStorage'
import { calcTotal } from '../../utils/formatter'

const CutleryPreferences = {
  NO_PREFRENCE: 'NO_PREFRENCE',
  WITHOUT_CUTLERY: 'WITHOUT_CUTLERY',
  WITH_CUTLERY: 'WITH_CUTLERY',
}

function Payment({ history }) {
  const [selectedPayment, setPayment] = useState()
  const {
    data: { basket },
  } = useQuery(basketQuery, { variables: { id: basketId } })
  const [createOrder] = useMutation(createOrderMutation, { update: data => console.log(data) })
  const [name, setName] = useState('')
  const [focused, setFocused] = useState(false)
  const { stripe } = useContext(StripeContext)
  const { pickup } = useContext(OrderContext)

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
      // const blockCampaigns = basket.store.block_campaigns
      // let discount = {}
      // if (!blockCampaigns) {
      //   discount = selectActiveCampaign(user.active_campaigns, user.preactivatedCampaign) || {}
      // }
      const PLATFORM_FEE = 35
      const total = calcTotal(basket.total, null, PLATFORM_FEE, null)

      const eatHereOrder = false // @TODO
      let cutlery
      if (!basket.items.some(item => item.is_cutlery) || eatHereOrder) {
        cutlery = CutleryPreferences.NO_PREFRENCE
      }

      // let paymentOptions
      // if (paymentToken) {
      //   // payment was preprocessed with Apple Pay or Google Pay
      //   paymentOptions = {
      //     payment_token: paymentToken,
      //     payment_type: paymentType,
      //   }
      // } else {
      // payment with saved card or sepa
      const paymentOptions = {
        payment_type: source.type,
        source_id: source.id,
      }
      // }

      const newOrder = {
        ...paymentOptions,
        store_id: basket.store_id,
        user_id: 'google-oauth2|110265702922815295918',
        total,
        // campaign_id: discount.id,
        pickup_time: (pickup.time || moment()).toISOString(),
        eat_in: eatHereOrder,
        cutlery,
        items: basket.items.map((item) => {
          const {
            name: productName,
            price,
            image,
            extras,
            product_id,
            variant_id,
            comment,
            quantity,
          } = item
          return {
            product_id,
            variant_id,
            name: productName,
            price,
            image,
            quantity,
            extras: extras || [],
            comment,
          }
        }),
        type: pickup.isInstantOrder ? 'INSTANT_ORDER' : 'PRE_ORDER',
      }

      console.log({ newOrder })

      const res = await createOrder({ variables: { order: newOrder } })
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
