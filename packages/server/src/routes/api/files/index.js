import Router from 'koa-router'
import config from 'config'
import files from './files'

const router = new Router()

router.prefix('/files')

router.get('/', files.getFilesByName)

router.post('/create/directory',
  files.validateCreateDirectory,
  files.parentDirectoryExists,
  files.validateMaxDepthOf(config.files.maxDepth),
  files.validateMaxChildren(config.files.maxChildren),
  files.createDirectory)

router.post('/create/profile',
  files.validateCreateDirectory,
  files.parentDirectoryExists,
  files.validateMaxDepthOf(config.files.maxDepth),
  files.validateMaxChildren(config.files.maxChildren),
  files.createProfile)

router.get('/directory', files.getFilesOfDirectoryValidate, files.getFilesOfDirectory)

router.get('/:fileId', files.fileExists, files.getFile)

router.put('/:fileId/move/:destenationDirectoryId',
  files.fileExists,
  files.destenationDirectoryExists,
  files.validateFileDestenationIsNotFileChild('fileId', 'destenationDirectoryId'),
  files.validateSumDepth('fileId', 'destenationDirectoryId', config.files.maxDepth),
  files.moveTo)

router.put('/:fileId/rename',
  files.fileExists,
  files.validateRename,
  files.rename)

router.delete('/:fileId',
  files.fileExists,
  files.delete)

export default router
