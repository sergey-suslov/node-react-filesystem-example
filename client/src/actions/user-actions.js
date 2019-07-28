// flow
export const SIGN_IN = 'USER:SIGN_IN'
export const SIGN_UP = 'USER:SIGN_UP'
export const SIGNED_UP = 'USER:SIGNED_UP'
export const SIGNED_UP_ERROR = 'USER:SIGNED_UP_ERROR'

const actionFactory = type => payload => ({
  type,
  payload
})

export const signIn = actionFactory(SIGN_IN)
export const signUp = actionFactory(SIGN_UP)
export const signedUp = actionFactory(SIGNED_UP)
export const signedUpWithError = actionFactory(SIGNED_UP_ERROR)
