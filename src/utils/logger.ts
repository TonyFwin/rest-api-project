import pino from 'pino'
import dayjs from 'dayjs'

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  // timestamp: () => `,"time":"${dayjs().format()}`,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
})

export default log
