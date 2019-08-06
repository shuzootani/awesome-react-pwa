export function requestPayment (cart, methods) {
  const {
    supportedMethods = 'basic-card',
    supportedNetworks = ['visa', 'mastercard'],
    supportedTypes = ['debit', 'credit']
  } = methods

  const supportedPaymentMethods = [
    {
      supportedMethods,
      data: {
        supportedNetworks,
        supportedTypes
      }
    }
  ]

  const shoppingCartDetails = {
    id: 'order-123',
    displayItems: [
      {
        label: 'Example item',
        amount: { currency: 'USD', value: '1.00' }
      }
    ],
    total: {
      label: 'Total',
      amount: { currency: 'USD', value: '1.00' }
    }
  }

  const request = new PaymentRequest(
    supportedPaymentMethods,
    shoppingCartDetails
  )

  request
    .canMakePayment()
    .then(canMakeAFastPayment => {
      if (canMakeAFastPayment) {
        request.show().then(paymentResponse => {
          // Here we would process the payment. For this demo, simulate immediate success:
          paymentResponse.complete('success').then(() => {
            // For demo purposes:
            introPanel.style.display = 'none'
            successPanel.style.display = 'block'
          })
        })
      } else {
        alert('Setup W3C Checkout')
      }
    })
    .catch(error => {
      // The user may have turned off the querying functionality in their
      // privacy settings. The website does not know whether they can make
      // a fast payment, so pick a generic title.
      alert('Checkout with W3C')
    })
}
