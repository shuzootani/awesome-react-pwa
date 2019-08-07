const OfflinePlugin = require('offline-plugin')

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const appConfig = config
    if (target === 'web') {
      const offlineOptions = {
        externals: ['/'],
        publicPath: '/',
        ServiceWorker: {
          events: true,
          navigateFallbackURL: '/',
          publicPath: '/sw.js'
        },
        autoUpdate: true,
        safeToUseOptionalCaches: true,
      }
      appConfig.plugins = [...config.plugins, new OfflinePlugin(offlineOptions)]
    }
    return appConfig
  }
}
