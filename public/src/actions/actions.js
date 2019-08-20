export const SignInSuccess = () => ({
  type: 'sign_in_success'
})
export const SignOutSuccess = () => ({
  type: 'sign_out_success'
})

export const updatePageUser = userInfo => ({
  type: 'updatePageUser',
  payload: userInfo
})

export const UpdateCurrentUser = handle => ({
  type: 'update_current_user',
  payload: handle
})
