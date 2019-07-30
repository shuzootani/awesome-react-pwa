let isomorphicWindow

if (typeof window !== 'undefined') {
  isomorphicWindow = window
} else if (typeof global !== 'undefined') {
  isomorphicWindow = global
} else if (typeof self !== 'undefined') {
  isomorphicWindow = self
} else {
  isomorphicWindow = {}
}

export const isBrowser = process.browser && typeof window !== 'undefined'

export default isomorphicWindow
