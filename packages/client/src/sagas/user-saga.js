import { message } from 'antd'
import { push } from 'react-router-redux'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import axios from './axios'
import {
  SIGN_IN,
  GET_PROFILE,
  SIGNED_IN,
  SIGN_UP,
  SIGN_UP_CONFIRM,
  REFRESH_TOKEN,
  signedUp,
  signedUpWithError,
  signedInWithError,
  signedIn,
  setUserSignedIn,
  setProfile,
  getProfileWithError
} from '../actions/user-actions'

function* signUp({ payload: { email, password } }) {
  try {
    yield call(axios.post, '/public/signup/email', {
      email,
      password
    })
    yield put(signedUp())
    yield put(push('/sign-up-result'))
  } catch (error) {
    if (error.response) {
      const {
        message: msg
      } = error.response.data
      message.error(msg)
      yield put(signedUpWithError({ error: message }))
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* signUpConfirm({ payload: { hash } }) {
  try {
    yield call(axios.post, '/public/signup/email/confirm', {
      confirmHash: hash
    })
    message.success('Account confirmed')
    yield put(push('/sign-in'))
  } catch (error) {
    if (error.response) {
      const {
        message: msg
      } = error.response.data
      message.error(msg)
      yield put(push('/sign-in'))
    } else if (error.request) {
      yield put(push('/500'))
    } else {
      console.log('Error', error.message)
    }
  }
}

function* signIn({ payload: { email, password } }) {
  try {
    const { data } = yield call(axios.post, '/public/signin/email', {
      email,
      password
    })
    const { expire, refreshToken } = data
    localStorage.setItem('expire', expire)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('refreshedAt', new Date().toISOString())
    message.success('Successfully signed in')
    yield put(signedIn())
    yield put(push('/app'))
  } catch (error) {
    if (error.response) {
      const {
        message: msg
      } = error.response.data
      message.error(msg)
      yield put(signedInWithError())
    } else if (error.request) {
      yield put(push('/500'))
    } else {
      console.log('Error', error.message)
    }
  }
}

function* refreshToken() {
  const token = localStorage.getItem('refreshToken')
  try {
    const { data } = yield call(axios.post, '/api/user/refresh', {
      token
    })
    const { expire, refreshToken } = data
    localStorage.setItem('expire', expire)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('refreshedAt', new Date().toISOString())
    yield put(setUserSignedIn())
  } catch (error) {
    console.log('error', error)
    if (error.response) {
      const {
        message: msg
      } = error.response.data
      message.error(msg)
      yield put(signedInWithError())
      console.log('error', error.response)
      if (error.response.status === 401) yield put(push('/sign-in'))
    } else if (error.request) {
      yield put(push('/500'))
    } else {
      console.log('Error', error.message)
    }
  }
}

function* getProfile() {
  try {
    console.log('making request')
    const { data } = yield call(axios.get, '/api/user/profile')
    console.log('data', data)
    yield put(setProfile(data))
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data
      message.error(message)
      yield put(getProfileWithError())
      if (error.response.status === 401) yield put(push('/sign-in'))
    } else if (error.request) {
      yield put(push('/500'))
    } else {
      console.log('Error', error.message)
    }
  }
}

function* redirect() {
  yield put(push('/app'))
}

export function* watch() {
  yield all([
    takeLatest(SIGN_IN, signIn),
    takeLatest(SIGNED_IN, redirect),
    takeLatest(SIGN_UP, signUp),
    takeLatest(SIGN_UP_CONFIRM, signUpConfirm),
    takeLatest(REFRESH_TOKEN, refreshToken),
    takeLatest(GET_PROFILE, getProfile)
  ])
}
