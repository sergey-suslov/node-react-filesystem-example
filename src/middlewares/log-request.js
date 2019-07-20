export default (ctx, next) => {
  ctx.log.trace(`[${ctx.method}] - ${ctx.url}`)
  next()
}
