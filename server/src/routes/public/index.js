import Router from 'koa-router'
import signup from './signup'
import signin from './signin'

const router = new Router()
router.prefix('/public')

router.post('/signup/email', signup.validateSignUp, signup.signUp)
router.post('/signup/email/confirm', signup.validateConfirmRegistration, signup.confirmRegistration)

router.post('/signin/email', signin.validateSignIn, signin.signIn)

export default router
