import { withRouter } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import * as R from 'ramda';

import ContextStore from 'src/store';

export default R.pipe(
  withRouter,
  React.memo,
)(props => {
  const { isLogin, dispatch } = useContext(ContextStore);
  const [id, setId] = useState('');

  const doLogin = () => {
    dispatch({ type: 'DO_LOGIN', payload: id });
  };

  return (
    <>
      {isLogin === false ? (
        <>
          <input type="text" onChange={e => setId(e.target.value)} />
          <button onClick={doLogin}>login</button>
        </>
      ) : (
        props.children
      )}
    </>
  );
});
