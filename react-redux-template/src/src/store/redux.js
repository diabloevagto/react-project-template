import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import React from 'react';

import modules from './modules';

const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
  const store = createStore(
    modules.rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(modules.rootEpic);

  return store;
};

const store = configureStore();

const WrapRedux = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export { WrapRedux };
