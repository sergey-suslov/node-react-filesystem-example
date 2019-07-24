import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { SIGN_IN, SIGN_UP, SIGNED_UP, SIGNED_UP_ERROR } from '../actions/user-actions'

export const moduleName = 'user'

export const ReducerRecord = Record({
  signIn: {
    signedIn: false,
    processing: false
  },
  signUp: {
    signedUp: false,
    message: '',
    processing: false
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
  case SIGN_IN:
    return state
      .set('signIn', {
        signedIn: false,
        processing: true
      })
  case SIGN_UP:
    return state
      .set('signUp', {
        signUp: false,
        processing: true,
        message: ''
      })
  case SIGNED_UP:
    return state
      .set('signUp', {
        processing: false,
        signedUp: true
      })
  case SIGNED_UP_ERROR:
    return state
      .set('signUp', {
        processing: false,
        signedUp: false,
        error: payload.error
      })
  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const isSigningUp = createSelector(stateSelector, state => state.signUp.processing)
export const isSignedUp = createSelector(stateSelector, state => state.signUp.signedUp)
