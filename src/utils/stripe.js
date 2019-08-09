// import stripe from 'tipsi-stripe'
// import { Sentry, SentrySeverity } from 'react-native-sentry'
import { AppConfig } from './config'

const STRIPE_URL = 'https://api.stripe.com/v1/'
const STRIPE_KEY = AppConfig.STRIPE_PUBLIC_KEY

export const createSource = ({ iban, name }) => {
  const cardDetails = {
    type: 'sepa_debit',
    'sepa_debit[iban]': iban,
    'owner[name]': name,
    currency: 'EUR',
  }

  let formBody = []
  Object.entries(cardDetails).forEach(([key, value]) => {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(value)
    formBody.push(`${encodedKey}=${encodedValue}`)
  })
  formBody = formBody.join('&')
  return fetch(`${STRIPE_URL}sources`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_KEY}`,
    },
    body: formBody,
  })
    .then(response => response.json())
}

export const getNativePayStatus = () => Promise.all([
  // stripe.deviceSupportsNativePay(),
  // stripe.canMakeNativePayPayments(),
])
  .then(([isSupported, isSetup]) => {
    console.log({ isSupported, isSetup })
    return ({ isSupported, isSetup })
  })
  .catch(error => ({ error }))
// Sentry.captureMessage(`Native pay unavailable: \n${error}`, {
//   level: SentrySeverity.Warning,
// })
