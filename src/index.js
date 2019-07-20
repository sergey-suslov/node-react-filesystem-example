import Koa from 'koa'
import koaBody from 'koa-body'
import session from 'koa-session'
import logger from './logger'
import db from './db'
import errorHandler from './middlewares/error-handler'
import logRequest from './middlewares/log-request'
import routes from './routes'

const app = new Koa()
app.context.log = logger
app.context.db = db

app.keys = [process.env.SESSION_SECRET]

const CONFIG = {
  maxAge: 86400000
}

app.use(session(CONFIG, app))
app.use(koaBody({ multipart: true }))
app.use(errorHandler)
app.use(logRequest)
app.use(routes.routes(), routes.allowedMethods())

app.listen(3000)
