import { watchSignIn, watchSignUp, watchSignUpConfirm } from './user-saga'

export default [
  watchSignIn(),
  watchSignUp(),
  watchSignUpConfirm()
]
