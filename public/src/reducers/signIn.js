export const signInReducer = (state = false, action) => {
  switch (action.type) {
    case 'sign_in_success':
      return true
    case 'sign_out_success':
      return false
    default:
      return state
  }
}
