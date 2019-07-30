import { createSelector } from 'reselect'
import { Record } from 'immutable'
import {
  SIGN_IN,
  SIGNED_IN,
  SIGN_UP,
  SIGNED_UP,
  SIGNED_UP_ERROR,
  SIGNED_IN_WITH_ERROR,
  SET_USER_SIGNED_IN,
} from '../actions/user-actions'

export const moduleName = 'user'

export const ReducerRecord = Record({
  signIn: {
    signedIn: false,
    processing: false,
  },
  signUp: {
    signedUp: false,
    message: '',
    processing: false,
  },
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN:
      return state.set('signIn', {
        signedIn: false,
        processing: true,
      })
    case SET_USER_SIGNED_IN:
      return state.set('signIn', {
        signedIn: true,
      })
    case SIGNED_IN:
      return state.set('signIn', {
        signedIn: true,
        processing: false,
      })
    case SIGNED_IN_WITH_ERROR:
      return state.set('signIn', {
        processing: false,
      })
    case SIGN_UP:
      return state.set('signUp', {
        signUp: false,
        processing: true,
        message: '',
      })
    case SIGNED_UP:
      return state.set('signUp', {
        processing: false,
        signedUp: true,
      })
    case SIGNED_UP_ERROR:
      return state.set('signUp', {
        processing: false,
        signedUp: false,
        error: payload.error,
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const isSigningUp = createSelector(
  stateSelector,
  state => state.signUp.processing,
)
export const isSignedUp = createSelector(
  stateSelector,
  state => state.signUp.signedUp,
)
export const isSigningIn = createSelector(
  stateSelector,
  state => state.signIn.processing,
)
export const isSignedIn = createSelector(
  stateSelector,
  state => state.signIn.signedIn,
)
