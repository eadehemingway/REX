export const currentPageUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'updatCurrentPageUserInfo':
      return action.payload

    default:
      return state
  }
}
