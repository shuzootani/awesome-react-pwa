import { isBrowser } from './window'

export const basketId = isBrowser && localStorage.getItem('basketId')
  ? localStorage.getItem('basketId')
  : 'no-basket'
