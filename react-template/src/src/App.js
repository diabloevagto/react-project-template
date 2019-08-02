import { Link, Route, Switch, withRouter } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';

import ContextStore from 'src/store';
import Facebook from 'src/page/Facebook';
import PageB from 'src/page/PageB';

const StyleDiv = styled.div`
  h1 {
    color: ${({ theme }) => theme.typography.header};
  }
  h2 {
    color: ${({ theme }) => theme.typography.subHeader};
  }
  p {
    color: ${({ theme }) => theme.typography.content};
  }
`;

export default R.pipe(
  withRouter,
  React.memo,
)(() => {
  const { userId } = useContext(ContextStore);

  return (
    <StyleDiv>
      <h1>React template</h1>
      <h2>hi, {userId}</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Facebook">Facebook</Link>
        </li>
        <li>
          <Link to="/b">b</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/Facebook" component={Facebook} />
        <Route exact path="/b" component={PageB} />
      </Switch>
    </StyleDiv>
  );
});
