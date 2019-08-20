import gql from 'graphql-tag'
import * as fragments from './fragments'

export const registerSourceMutation = gql`
  mutation($user_id:ID!, $token:String!, $fraud_payload: SepaFraudCheck){
    registerSource(user_id: $user_id, token: $token, fraud_payload: $fraud_payload) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const deleteSourceMutation = gql`
  mutation($user_id:ID!, $source_id:ID!){
    deleteSource(user_id: $user_id, source_id: $source_id) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const setDefaultSourceMutation = gql`
  mutation($user_id:ID!, $source_id:ID!){
    setDefaultSource(user_id: $user_id, source_id: $source_id) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const createOrderMutation = gql`
  mutation createOrder(
  $order: CreateOrder!) {
    createOrder(order: $order) {
      id
      transaction_id
      code_text
      code_emoji
      total
      status
      pickup_time
      created_at
    }
  }
`

export const updateOrderMutation = gql`
  mutation updateOrder($id: ID!, $status: StatusEnum, $pickup_time: String, $paypal: PaypalDataInput, $feedback: String, $user_rating: OrderUserRating) {
    updateOrder(
      id: $id,
      order: {
        status: $status,
        pickup_time: $pickup_time,
        paypal_info: $paypal,
        feedback: $feedback,
        user_rating: $user_rating
      }) {
      id
      code_text
      code_emoji
      total
      status
      pickup_time
      paypal_info {
        paymentId
        authorizationId
        captureId
        refundId
      }
    }
  }
`

export const applyPromotionMutation = gql`
    mutation applyPromotion($user_id: ID!, $promotion_code: String!) {
        applyPromotion(
            user_id: $user_id,
            promotion_code: $promotion_code
        ) {
            ...UserFragment
        }
    }
    ${fragments.userFragment}
`

export const updateUserMutation = gql`
  mutation updateUser($id:ID!, $user: UpdateUser!) {
    updateUser(id:$id, item: $user) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const paypalAuthorizePayment = gql`
  mutation paypalAuthorizePayment($amount: Int!) {
    paypalAuthorizePayment(amount: $amount) {
      state
      token
      paymentId
      approvalUrl
    }
  }
`

export const paypalExecutePayment = gql`
  mutation paypalExecutePayment($input: PaypalDataInput, $token: String!) {
    paypalExecutePayment(input: $input, token: $token) {
      state
      token
      paymentId
      authorizationId
    }
  }
`

export const registerPaypalMutation = gql`
  mutation($user_id:ID!, $paypal_id:String!){
    registerPaypal(user_id: $user_id, paypal_id: $paypal_id) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const requestSignupValidation = gql`
  mutation($email:String!){
    requestSignupValidation(email: $email)
  }
`

export const resendValidationEmail = gql`
  mutation($userId:ID!){
    resendValidationEmail(user_id:$userId)
  }
`

export const requestPaymentToken = gql`
  mutation($source:ID!) {
    requestPaymentToken(source_id: $source) {
      status
      token
      qr_code
      valid_until
      order_id
    }
  }
`

export const submitFeedback = gql`
  mutation($vote: FeedbackVote, $text: String, $email: String, $order_id: ID) {
    submitFeedback(vote: $vote, text: $text, email: $email, order_id: $order_id)
  }
`

export const addFavoriteStoreMutation = gql`
  mutation($storeId: ID!) {
    addFavoriteStore(store_id: $storeId) {
      id
      favorite_stores
    }
  }
`

export const removeFavoriteStoreMutation = gql`
  mutation($storeId: ID!) {
    removeFavoriteStore(store_id: $storeId) {
      id
      favorite_stores
    }
  }
`

export const acknowledgedMessageMutation = gql`
  mutation($userId:ID!, $messageId: ID!) {
    acknowledgedMessage(user_id: $userId, messageId: $messageId) {
      id
      success_campaign {
        id
      }
    }
  }
`

export const addToBasket = gql`
  mutation addToBasket($id: ID, $product: BasketItemInput!) {
    addToBasket(id: $id, product: $product) {
      ...BasketFragment
    }
  }
  ${fragments.basketFragment}
`

export const removeFromBasket = gql`
  mutation($id: ID!, $item_id: ID!) {
    removeFromBasket(id: $id, item_id: $item_id) {
      ...BasketFragment
    }
  }
  ${fragments.basketFragment}
`

export const updateBasketItem = gql`
  mutation($id: ID!, $product: BasketItemInput!) {
    updateBasketItem(id: $id, product: $product) {
      ...BasketFragment
    }
  }
  ${fragments.basketFragment}
`

export const deleteBasket = gql`
  mutation($id: ID!) {
    deleteBasket(id: $id, product: $product) {
      ...BasketFragment
    }
  }
  ${fragments.basketFragment}
`
