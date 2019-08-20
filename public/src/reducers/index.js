import { combineReducers } from 'redux';

import { signInReducer } from './signIn';
import { userPageReducer } from './userPage';
import { currentUserReducer } from './currentUser';

export const allReducers = combineReducers({
  signedIn: signInReducer,
  userPage: userPageReducer,
  currentUser: currentUserReducer
});
