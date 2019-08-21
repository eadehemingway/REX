export const signInSuccess = () => ({
  type: 'sign_in_success'
});
export const signOutSuccess = () => ({
  type: 'sign_out_success'
});

export const updateUserPage = handle => ({
  type: 'update_page_user',
  payload: handle
});

export const updateSignedInUser = handle => ({
  type: 'update_signedInUser_user',
  payload: handle
});
