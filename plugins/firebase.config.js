const env = process.env.ENV
let config = require('../env.dev.config').default

if (env === 'stg') {
    config = require('../env.stg.config').default
} else if (env === 'prod') {
    config = require('../env.prod.config').default
}

export default config.firebase