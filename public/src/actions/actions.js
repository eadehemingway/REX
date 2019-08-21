export const signInSuccess = () => ({
  type: 'signInSuccess'
});
export const signOutSuccess = () => ({
  type: 'signOutSuccess'
});

export const updateUserBeingViewed = handle => ({
  type: 'updateUserBeingViewed',
  payload: handle
});

export const updateSignedInUser = handle => ({
  type: 'updateSignedInUser',
  payload: handle
});
