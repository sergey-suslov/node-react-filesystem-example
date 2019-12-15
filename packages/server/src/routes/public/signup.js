import Boom from 'boom'
import Joi from 'joi'

const validateSignUp = async(ctx, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(250).required(),
    password: Joi.string().min(4).max(250).required()
  })
  if (Joi.validate({ email: ctx.request.body.email, password: ctx.request.body.password }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const validateConfirmRegistration = async(ctx, next) => {
  const schema = Joi.object().keys({
    confirmHash: Joi.string().max(500).required()
  })
  if (Joi.validate({ confirmHash: ctx.request.body.confirmHash }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const signUp = async ctx => {
  const UserRegistration = ctx.db.model('UserRegistration')
  await UserRegistration.registerByEmail(ctx.request.body.email, ctx.request.body.password)
  // TODO: send configramtion email
  ctx.body = ''
}

const confirmRegistration = async ctx => {
  const { confirmHash } = ctx.request.body
  const userRegistration = await ctx.db.model('UserRegistration').findOne({ confirmHash })
  if (!userRegistration) {
    throw Boom.badRequest('Invalid link')
  }
  const { email, phone, hash, salt } = userRegistration
  await ctx.db.model('User').registerConfirm({ email, phone, hash, salt })
  await userRegistration.delete()
  ctx.body = ''
}

export default {
  validateSignUp,
  signUp,
  validateConfirmRegistration,
  confirmRegistration
}
