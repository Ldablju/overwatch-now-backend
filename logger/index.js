const pino = require('pino');
const dayjs = require('dayjs')

const log = pino({
    transport: {
      target: 'pino-pretty'
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})


module.exports = log 