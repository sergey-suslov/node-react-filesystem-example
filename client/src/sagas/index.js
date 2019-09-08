import { watchSignIn, watchSignUp, watchSignUpConfirm, watchRefreshToken } from './user-saga'

export default [
  watchSignIn(),
  watchSignUp(),
  watchSignUpConfirm(),
  watchRefreshToken()
]
