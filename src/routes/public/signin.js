import _ from 'lodash'
import Boom from 'boom'
import Joi from 'joi'
import config from 'config'
import jsonwebtoken from 'jsonwebtoken'

const validateSignIn = async(ctx, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(250).required(),
    password: Joi.string().min(4).max(250).required()
  })
  if (Joi.validate({ email: ctx.request.body.email, password: ctx.request.body.password }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const signIn = async ctx => {
  const User = ctx.db.model('User')
  const user = await User.getByEmailAndPassword(ctx.request.body.email, ctx.request.body.password)
  const token = jsonwebtoken.sign({
    ..._.pick(user, ['_id', 'email']),
    created: new Date(),
    lifetime: config.jwt.lifetime
  }, process.env.JWT_SECRET || config.jwt.secret)
  ctx.cookies.set('token', token, { signed: true })
  ctx.body = ''
}

export default {
  validateSignIn,
  signIn
}
