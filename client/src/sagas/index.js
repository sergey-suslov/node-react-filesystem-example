import { watchSignIn, watchSignUp } from './user-saga'

export default [
  watchSignIn(),
  watchSignUp()
]
