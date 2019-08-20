import { combineReducers } from 'redux'

import { signInReducer } from './signIn'
import { currentPageUserInfoReducer } from './currentPageUserInfo'
import { currentUserReducer } from './currentUser'

export const allReducers = combineReducers({
  signedIn: signInReducer,
  currentPageUserInfo: currentPageUserInfoReducer,
  currentUser: currentUserReducer
})
