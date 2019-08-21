export const signedInUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'update_signedInUser_user':
      return action.payload;
    default:
      return state;
  }
};
