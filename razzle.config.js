const OfflinePlugin = require('offline-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

module.exports = {
  modify: (config, { target, dev }) => {
    const appConfig = config

    if (target === 'web') {
      const offlineOptions = {
        externals: ['/'],
        publicPath: '/',
        ServiceWorker: {
          events: true,
          navigateFallbackURL: '/',
          publicPath: '/sw.js',
        },
        autoUpdate: true,
        safeToUseOptionalCaches: true,
      }

      appConfig.plugins = [
        ...config.plugins,
        new OfflinePlugin(offlineOptions),
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json',
        }),
      ]

      // minify JS for production build
      if (!dev) {
        appConfig.plugins = [
          ...appConfig.plugins,
          new TerserPlugin({
            terserOptions: {
              parse: {},
              compress: {
                drop_console: true,
              },
              output: {
                comments: false,
                // ascii_only: true,
              },
              safari10: true,
            },
            cache: true,
            parallel: true,
            sourceMap: true,
          }),
        ]
      }
    }

    return appConfig
  },
}
