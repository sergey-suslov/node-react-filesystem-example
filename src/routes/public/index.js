import Router from 'koa-router'
import registration from './registration'

const router = new Router()
router.prefix('/public')

router.post('/register/email', registration.validateRegistration, registration.register)

export default router
