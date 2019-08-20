export const currentUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'update_current_user':
      console.log('payloda', action.payload)
      return action.payload
    default:
      return state
  }
}
