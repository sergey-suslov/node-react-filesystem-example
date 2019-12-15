import Router from 'koa-router'
import user from './user'
import files from './files'

const router = new Router()
router.prefix('/api')

router.use(user.routes(), user.allowedMethods())
router.use(files.routes(), files.allowedMethods())

export default router
