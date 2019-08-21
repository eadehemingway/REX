import { combineReducers } from 'redux';

import { signInReducer } from './signIn';
import { userPageReducer } from './userPage';
import { signedInUserReducer } from './signedInUser';

export const allReducers = combineReducers({
  signedIn: signInReducer,
  signedInUser: signedInUserReducer,
  userPage: userPageReducer
});
