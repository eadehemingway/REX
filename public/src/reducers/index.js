import { combineReducers } from 'redux'

import { signInReducer } from './signIn'

export const allReducers = combineReducers({
  signedIn: signInReducer
})
