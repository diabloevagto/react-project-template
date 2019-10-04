import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { handleActions } from 'redux-actions';
import { ofType } from 'redux-observable';
import produce from 'immer';

import {
  addUniqueCount,
  createRequestActions,
  createRequestTypes,
} from 'src/utils/wrapAction';
import { getUser } from 'src/api';

// ------------------------- action -------------------------
const type = addUniqueCount({
  GET_USER: createRequestTypes('GET_USER'),
});
const action = createRequestActions(type);

// ------------------------- epic -------------------------
const getUserEpic = action$ =>
  action$.pipe(
    ofType(type.GET_USER.REQUEST),
    pluck('payload'),
    switchMap(payload =>
      getUser(payload).pipe(
        pluck('response'),
        map(action.GET_USER.SUCCESS),
        catchError(action.GET_USER.FAILURE),
      ),
    ),
  );

// ------------------------- reducer -------------------------
const initialState = {
  isLoading: false,
  response: null,
  error: null,
};

const reducer = handleActions(
  {
    [type.GET_USER.REQUEST]: produce(draft => {
      draft.isLoading = true;
      draft.response = null;
      draft.error = null;
    }),
    [type.GET_USER.SUCCESS]: produce((draft, { payload }) => {
      draft.isLoading = false;
      draft.response = payload;
    }),
    [type.GET_USER.FAILURE]: produce((draft, { payload }) => {
      draft.isLoading = false;
      draft.error = payload;
    }),
  },
  initialState,
);

// export
export default {
  type,
  action,
  epic: {
    getUserEpic,
  },
  reducer,
};
