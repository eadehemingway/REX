export const UserPageReducer = (state = "", action) => {
  switch (action.type) {
    case 'updatePageUser':
      return action.payload

    default:
      return state
  }
}
