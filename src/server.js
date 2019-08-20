import express from 'express'
import compression from 'compression'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { getDataFromTree } from '@apollo/react-ssr'
import { ServerStyleSheet } from 'styled-components'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
// eslint-disable-next-line import/no-unresolved
import stats from '../build/react-loadable.json'
import App from './App'
import apolloClient from './apolloClient'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(compression())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {}

    const Root = () => (
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    try {
      await getDataFromTree(<Root />)
    } catch (e) {
      console.log(e)
    }

    const apolloState = apolloClient.extract()

    const modules = []

    const sheet = new ServerStyleSheet()
    const markup = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        {sheet.collectStyles(<Root />)}
      </Loadable.Capture>
    )
    const styleTags = sheet.getStyleTags()

    if (context.url) {
      res.redirect(context.url)
    } else {
      const bundles = getBundles(stats, modules)
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'))
      const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))

      res.status(200).send(
        `<!doctype html>
            <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#1c4448"/>
                <meta
                  name="description"
                  content="${req.url}"
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="${req.url}" />
                <meta name="twitter:title" content="${req.url}" />
                <meta
                  name="twitter:description"
                  content="${req.url}"
                />
                <meta property="og:url" content="${req.url}" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="${req.url}" />
                <meta
                  property="og:description"
                  content="${req.url}"
                />
                <title>pickpack</title>
                <link rel="preconnect dns-prefetch" href="https://s3.eu-central-1.amazonaws.com">
                <link rel="preconnect dns-prefetch" href="https://maps.googleapis.com">
                ${assets.client.css ? `<link rel="preload" as="style" href="${assets.client.css}" onload="this.rel='stylesheet'">` : ''}
                ${styleTags}
                ${styles.map(style => `<link rel="preload" as="style" href="${style.file}" onload="this.rel='stylesheet'">`).join('\n')}
                <script async defer id="stripe-js" src="https://js.stripe.com/v3/"></script>
                <script async defer src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDm0ACk0sMZsL9MGBvITQK2c-AvrZQHZo8"></script>
                ${process.env.NODE_ENV === 'production' ? `<script src="${assets.vendor.js}" async defer></script>` : `<script src="${assets.vendor.js}" async defer crossorigin></script>`}
                ${process.env.NODE_ENV === 'production' ? `<script src="${assets.client.js}" async defer></script>` : `<script src="${assets.client.js}" async defer crossorigin></script>`}
                ${chunks.map(chunk => process.env.NODE_ENV === 'production' ? `<script async defer src="/${chunk.file}"></script>` : `<script src="http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/${chunk.file}"></script>`).join('\n')}
            </head>
            <body>
                <div id="root">${markup}</div>
                <div id="modal-root"></div>
                <script>window.__APOLLO_STATE__ = ${JSON.stringify(apolloState).replace(/</g, '\\u003c')}</script>
            </body>
        </html>`
      )
    }
  })

export default server
