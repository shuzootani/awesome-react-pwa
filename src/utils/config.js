// const { NODE_ENV } = process.env

const config = {
  production: {
    STAGE: 'PROD',
  },
  development: {
    STAGE: 'DEV',
  },
}

// export const AppConfig = config[NODE_ENV] || config.development
export const AppConfig = config.development
