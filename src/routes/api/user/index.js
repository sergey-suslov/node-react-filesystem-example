import Router from 'koa-router'
import profile from './profile'

const router = new Router()
router.prefix('/user')

router.get('/profile', profile.profile)

export default router
