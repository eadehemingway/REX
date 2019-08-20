export const signInSuccess = () => ({
  type: 'sign_in_success'
})
export const signOutSuccess = () => ({
  type: 'sign_out_success'
})

export const updateUserPage = userInfo => ({
  type: 'update_page_user',
  payload: userInfo
})

export const updateCurrentUser = handle => ({
  type: 'update_current_user',
  payload: handle
})
