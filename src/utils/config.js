const { NODE_ENV } = process.env

const config = {
  production: {
    GOOGLE_MAP_KEY: 'AIzaSyDm0ACk0sMZsL9MGBvITQK2c-AvrZQHZo8',
    GOOGLE_MAP_URL: 'https://maps.googleapis.com/maps/api/directions/json?',
    SENTRY_ENDPOINT: 'https://3cf7485f882d49e1b02094ac82c05028:62f569420b3a4c34bfa889536ac8d5e4@sentry.io/177199',
    APOLLO_ENDPOINT: 'https://colugo.pickpack.de',
    STRIPE_PUBLIC_KEY: 'pk_live_HVwD5n18laakP9IAzAdAqmry',
    APPLE_PAY_MERCHANT_ID: 'merchant.de.pickpack',
    GOOGLE_PAY_MERCHANT_ID: '15192999776129618742',
    AUTH0_DOMAIN: 'b2g.eu.auth0.com',
    AUTH0_CLIENTID: 'AfgHBSGgkgY6NnD6zvw6Yi-3HbdNCHkt',
    STAGE: 'PROD',
  },
  development: {
    GOOGLE_MAP_KEY: 'AIzaSyDm0ACk0sMZsL9MGBvITQK2c-AvrZQHZo8',
    GOOGLE_MAP_URL: 'https://maps.googleapis.com/maps/api/directions/json?',
    SENTRY_ENDPOINT: 'https://3cf7485f882d49e1b02094ac82c05028:62f569420b3a4c34bfa889536ac8d5e4@sentry.io/177199',
    APOLLO_ENDPOINT: 'https://colugo-dev.pickpack.de',
    STRIPE_PUBLIC_KEY: 'pk_test_R7QuectOQ5mvpCYKYZm1EBta',
    APPLE_PAY_MERCHANT_ID: 'merchant.de.pickpack',
    GOOGLE_PAY_MERCHANT_ID: '15192999776129618742',
    AUTH0_DOMAIN: 'b2g.eu.auth0.com',
    AUTH0_CLIENTID: 'AfgHBSGgkgY6NnD6zvw6Yi-3HbdNCHkt',
    STAGE: 'DEV',
  }
}

export const AppConfig = config[NODE_ENV] || config.development
