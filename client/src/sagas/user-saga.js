import { message } from 'antd'
import { takeLatest, call, put } from 'redux-saga/effects'
import axios from './axios'
import { SIGN_IN, SIGN_UP, signedUp, signedUpWithError } from '../actions/user-actions'

function* signUp({ payload: {email, password} }) {
  try {
    yield call(axios.post, '/public/signup/email', {
      email,
      password
    })
    call(signedUp())
  } catch(error) {
    if (error.response) {
      const {
        message
      } = error.response.data
      message.error(message)
      yield put(signedUpWithError({ error: message }))
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}
function signIn({ payload }) {
  // TODO: implement signin
}

export function * watchSignIn() {
  yield takeLatest(SIGN_IN, signIn)
}

export function * watchSignUp() {
  yield takeLatest(SIGN_UP, signUp)
}
