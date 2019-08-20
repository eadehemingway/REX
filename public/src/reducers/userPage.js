export const userPageReducer = (state = '', action) => {
  switch (action.type) {
    case 'update_page_user':
      return action.payload;
    default:
      return state;
  }
};
