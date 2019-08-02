import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';

import { WrapContext } from 'src/store/context';
import { WrapRedux } from 'src/store/redux';
import Auth from 'src/page/Auth';
import GlobalStyles from 'src/style/GlobalStyles';
import history from 'src/utils/history';
import theme from 'src/style/theme';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <WrapContext>
        <WrapRedux>
          <GlobalStyles />
          <Auth>
            <App />
          </Auth>
        </WrapRedux>
      </WrapContext>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
