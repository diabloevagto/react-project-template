import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import Loading from 'src/components/Loading';
import user from 'src/store/modules/user';

export default React.memo(() => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.isLoading);
  const response = useSelector((state) => state.user.response);

  useEffect(() => {
    dispatch(user.action.GET_USER.REQUEST({ user: 'facebook' }));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p>{JSON.stringify(loading)}</p>
          <p>{JSON.stringify(response)}</p>
        </>
      )}
    </>
  );
});
