export const signInReducer = (state = false, action) => {
  switch (action.type) {
    case 'signInSuccess':
      return true;
    case 'signOutSuccess':
      return false;
    default:
      return state;
  }
};
