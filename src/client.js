import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './App'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

OfflinePluginRuntime.install({
  onInstalled: function onInstalled() {
    console.log('OfflinePluginRuntime.onInstalled');
  },
  onUpdateReady: function onUpdateReady() {
    console.log('OfflinePluginRuntime.onUpdateReady');
  },
  onUpdating: function onUpdating() {
    console.log('OfflinePluginRuntime.onUpdating');
  },
  onUpdated: function onUpdated() {
    console.log('OfflinePluginRuntime.onUpdated');
  },
  // onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  // onUpdated: () => window.swUpdate = true,
});

window.addEventListener('offline', () => {
  console.log('Went offline!');
});
