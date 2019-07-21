import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { SIGN_IN } from '../actions/user-actions'

export const moduleName = 'user'

export const ReducerRecord = Record({
  signIn: {
    signedIn: false,
    processing: false
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type } = action

  switch (type) {
  case SIGN_IN:
    return state
      .set('signIn', {
        signedIn: false,
        processing: true
      })
  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const toolSelector = createSelector(stateSelector, state => state.tool)
