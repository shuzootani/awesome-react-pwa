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
