
import decamelizeKeysDeep from 'decamelize-keys-deep'
import Auth0 from '@auth0/auth0-spa-js'
import { updateUserMutation } from '../graphql/mutations'
import { userQuery } from '../graphql/queries'
import client from '../apolloClient'
import { AppConfig } from './config'

const moment = require('moment')

export const auth0 = new Auth0({
  domain: AppConfig.AUTH0_DOMAIN,
  clientId: AppConfig.AUTH0_CLIENTID,
})

export const validateSession = (user) => {
  const { token } = user
  return new Promise(async (resolve, reject) => {
    // On token expiration create new session
    if (token && token.expires && tokenExpired(token.expires)) {
      try {
        let newToken = await auth0.auth.refreshToken({
          refreshToken: token.refresh_token,
        })
        newToken = decamelizeKeysDeep(newToken) // Returning camel case missmatching server response
        const expires = moment().add(newToken.expires_in, 's')
        resolve({
          ...user,
          token: {
            ...token,
            ...newToken,
            expires: expires.toISOString(),
          },
        })
      } catch (err) {
        reject(err)
      }
    } else {
      resolve(user)
    }
  })
}

export const tokenExpired = expires => moment().add(10, 'm').isAfter(expires)

export const AugmentToken = (tokenIn) => {
  const token = decamelizeKeysDeep(tokenIn)
  const expires = moment().add(token.expires_in, 's')
  return {
    ...token,
    expires: expires.toISOString(),
  }
}

/*
 * Login Method
 */
export const AuthLogin = async (email, password) => {
  const token = await auth0.auth.passwordRealm({
    username: email,
    password,
    audience: 'colugo',
    scope: 'openid offline_access',
    realm: 'Username-Password-Authentication',
  })
  return AugmentToken(token)
}


export const Logout = () => {}

export const getUser = userId => new Promise((resolve) => {
  client.query({
    query: userQuery,
    variables: { id: userId },
    fetchPolicy: 'network-only',
  }).then((response) => {
    const { user } = response.data
    if (user) {
      resolve(user)
    }
  })
})

export const updateUser = async (id, user) => {
  const result = await client.mutate({
    mutation: updateUserMutation,
    variables: {
      id,
      user: decamelizeKeysDeep(user),
    },
  })
  return result.data.updateUser
}


const token = await AuthLogin(lowerCaseEmail, password)
updateUserToken(token)
// Update user model from server
const { data: { getUser: newUser } } = await client.query({
  query: getUser,
  fetchPolicy: 'network-only',
})
