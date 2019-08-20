export const SignInSuccess = () => ({
  type: 'sign_in_success'
})
export const SignOutSuccess = () => ({
  type: 'sign_out_success'
})

export const UpdateUserPageInfo = userInfo => ({
  type: 'updatCurrentPageUserInfo',
  payload: userInfo
})

export const UpdateCurrentUser = handle => ({
  type: 'update_current_user',
  payload: handle
})
