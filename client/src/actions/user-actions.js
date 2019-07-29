// flow
export const SIGN_IN = 'USER:SIGN_IN'
export const SIGN_UP = 'USER:SIGN_UP'
export const SIGNED_UP = 'USER:SIGNED_UP'
export const SIGNED_UP_ERROR = 'USER:SIGNED_UP_ERROR'
export const SIGN_UP_CONFIRM = 'USER:SIGN_UP_CONFIRM'
export const SIGN_UP_CONFIRMED = 'USER:SIGN_UP_CONFIRMED'

const actionFactory = type => payload => ({
  type,
  payload
})

export const signIn = actionFactory(SIGN_IN)
export const signUp = actionFactory(SIGN_UP)
export const signedUp = actionFactory(SIGNED_UP)
export const signedUpWithError = actionFactory(SIGNED_UP_ERROR)
export const signUpConfirm = actionFactory(SIGN_UP_CONFIRM)
export const signUpConfirmed = actionFactory(SIGN_UP_CONFIRMED)
