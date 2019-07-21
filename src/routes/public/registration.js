import Boom from 'boom'
import Joi from 'joi'

const validateRegistration = async(ctx, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(250).required(),
    password: Joi.string().min(4).max(250).required()
  })
  if (Joi.validate({ email: ctx.request.body.email, password: ctx.request.body.password }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const register = async ctx => {
  const User = ctx.db.model('User')
  const newUser = await User.registerByEmail(ctx.request.body.email, ctx.request.body.password)
  ctx.body = newUser._id
}

export default {
  validateRegistration,
  register
}
