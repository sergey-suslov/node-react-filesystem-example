import pino from 'pino'
import _ from 'lodash'

// Environment variables
const levels = [
  { label: 'fatal', code: 60 },
  { label: 'error', code: 50 },
  { label: 'warn', code: 40 },
  { label: 'info', code: 30 },
  { label: 'debug', code: 20 },
  { label: 'trace', code: 10 }
]
const logLevel = _.find(levels, { label: 'debug' })

const logger = pino({
  prettyPrint: process.env.NODE_ENV === 'development',
  level: logLevel.code
})

export default logger
