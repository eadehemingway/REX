import { combineReducers } from 'redux'
import { counterReducer } from './counter'
import { signInReducer } from './signIn'

export const allReducers = combineReducers({
  counter: counterReducer,
  signedIn: signInReducer
})
