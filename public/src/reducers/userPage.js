export const UserPageReducer = (state = '', action) => {
  switch (action.type) {
    case 'update_page_user':
      console.log('payload', action.payload)
      return action.payload
    default:
      return state
  }
}
