import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import Loadable from 'react-loadable'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './App'

Loadable.preloadReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )
})

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    Loadable.preloadReady().then(() => {
      hydrate(
        <BrowserRouter>
          <NewApp />
        </BrowserRouter>,
        document.getElementById('root')
      )
    })
  })
}

window.addEventListener('load', () => {
  OfflinePluginRuntime.install({
    onInstalled: function onInstalled() {
      console.log('OfflinePluginRuntime.onInstalled')
    },
    onUpdateReady: function onUpdateReady() {
      console.log('OfflinePluginRuntime.onUpdateReady')
      OfflinePluginRuntime.applyUpdate()
    },
    onUpdating: function onUpdating() {
      console.log('OfflinePluginRuntime.onUpdating')
    },
    onUpdated: function onUpdated() {
      console.log('OfflinePluginRuntime.onUpdated')
    },
  })
})

window.addEventListener('offline', () => {
  console.log('Went offline!')
})
