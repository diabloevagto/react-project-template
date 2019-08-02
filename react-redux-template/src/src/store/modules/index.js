import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import user from './user';

export default {
  rootEpic: combineEpics(...Object.values(user.epic)),
  rootReducer: combineReducers({
    user: user.reducer,
  }),
};
