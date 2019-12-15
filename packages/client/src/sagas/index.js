import { watch as watchUsers } from './user-saga'
import { watch as watchFiles } from './files-saga'

export default [
  watchUsers(),
  watchFiles()
]
