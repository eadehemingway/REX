import { combineReducers } from 'redux'

import { signInReducer } from './signIn'
import { UserPageReducer } from './userPage'
import { currentUserReducer } from './currentUser'

export const allReducers = combineReducers({
  signedIn: signInReducer,
  UserPage: UserPageReducer,
  currentUser: currentUserReducer
})
