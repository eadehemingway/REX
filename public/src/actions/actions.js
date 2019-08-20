// export const signInSuccess = () => ({
//   type: 'sign_in_success'
// })
// export const signOutSuccess = () => ({
//   type: 'sign_out_success'
// })

// export const UpdateCurrentPageUserInfo = (userInfo) => ({
//   type: 'updatCurrentPageUserInfo',
//   payload: userInfo

// })
export const SignInSuccess = () => ({
  type: 'sign_in_success'
})
export const SignOutSuccess = () => ({
  type: 'sign_out_success'
})

export const UpdateCurrentPageUserInfo = userInfo => ({
  type: 'updatCurrentPageUserInfo',
  payload: userInfo
})
