import Koa from 'koa'
import logger from './logger'

const app = new Koa()
app.context.log = logger

app.use(ctx => {
  ctx.log.info('LOG')
  ctx.body = 'success'
})

app.listen(3000)
logger.info('Server started')
