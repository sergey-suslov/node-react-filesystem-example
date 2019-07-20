import Koa from 'koa'
import koaBody from 'koa-body'
import session from 'koa-session'
import logger from './logger'
import errorHandler from './middlewares/error-handler'

const app = new Koa()
app.context.log = logger

app.keys = [process.env.SESSION_SECRET]

const CONFIG = {
  maxAge: 86400000
}

app.use(session(CONFIG, app))
app.use(koaBody({ multipart: true }))
app.use(errorHandler)
app.use((ctx, next) => {
  ctx.log.trace(`[${ctx.method}] - ${ctx.url}`)
  ctx.body = 'suc'
})

app.listen(3000)
