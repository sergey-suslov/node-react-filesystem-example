import Koa from 'koa'
import logger from './logger'

const app = new Koa()
app.context.log = logger

app.use((ctx, next) => {
  ctx.log.trace(`[${ctx.method}] - ${ctx.url}`)
  ctx.body = 'suc'
  next()
})

app.listen(3000)
