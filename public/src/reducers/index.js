import {counterReducer } from './counter'
import {signInReducer } from './signIn'

import {combineReducers} from 'redux'

export const allReducers = combineReducers({
    counter: counterReducer, 
    signedIn: signInReducer
})