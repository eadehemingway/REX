export const signedInUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'updateSignedInUser':
      return action.payload;
    default:
      return state;
  }
};
