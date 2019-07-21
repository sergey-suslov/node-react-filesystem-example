import { takeLatest } from 'redux-saga/effects'
import { SIGN_IN } from '../actions/user-actions'

function signIn({ payload }) {
  // TODO: implement signin
}

export function * watchSignIn() {
  yield takeLatest(SIGN_IN, signIn)
}
