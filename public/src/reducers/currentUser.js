export const currentUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'update_current_user':
      return action.payload;
    default:
      return state;
  }
};
