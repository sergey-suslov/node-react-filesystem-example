// flow
export const SIGN_IN = 'USER:SIGN_IN'

const actionFactory = type => payload => ({
  type,
  payload
})

export const signIn = actionFactory(SIGN_IN)
