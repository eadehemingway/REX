import { combineReducers } from 'redux';

import { signInReducer } from './signIn';
import { userBeingViewedReducer } from './userBeingViewed';
import { signedInUserReducer } from './signedInUser';

export const allReducers = combineReducers({
  signedIn: signInReducer,
  signedInUser: signedInUserReducer,
  userBeingViewed: userBeingViewedReducer
});
