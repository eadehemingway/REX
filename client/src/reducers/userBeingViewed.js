export const userBeingViewedReducer = (state = '', action) => {
  switch (action.type) {
    case 'updateUserBeingViewed':
      return action.payload;
    default:
      return state;
  }
};
