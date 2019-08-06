import { combineReducers } from 'redux'

import { signInReducer } from './signIn'
import { currentPageUserInfoReducer } from './currentPageUserInfo'

export const allReducers = combineReducers({
  signedIn: signInReducer,
  currentPageUserInfo: currentPageUserInfoReducer
})
