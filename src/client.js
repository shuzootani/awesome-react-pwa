import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
// use render to refresh header style instead of hydrate
import { render as hydrate } from 'react-dom'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
