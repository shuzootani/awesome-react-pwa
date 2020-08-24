## Core Dependencies
- [Razzle](https://github.com/jaredpalmer/razzle) for server side rendering
- [react-router](https://github.com/ReactTraining/react-router) for routing

optional: (ditch it easily if you want)
- [styled-components](https://github.com/styled-components/styled-components) for styling
- [react-loadable](https://github.com/jamiebuilds/react-loadable) for lazy-loading component with ssr support

## Start

```sh
git clone https://shuzootani@bitbucket.org/shuzootani/web-client.git
```

```sh
cd web-client && yarn && yarn start
```

### production build

```sh
yarn build && yarn start:prod
```

### deploy

```sh
yarn build && yarn deploy
```

## Customize

### extending webpack config

- edit `razzle.config.js`

### deploy config

- edit `now.json`

## Folder Structure
- pages: Page(Screen) components
- components: reusable or generic components
- utils: formatter, converter, style constants etc...
- providers: (reusable) data provider component using Apollo or Context API
- hoc: higher order components
- i18n: translation files
- hooks: react utility hooks
- public/sw.js: service worker
