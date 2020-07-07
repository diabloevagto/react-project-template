import React from 'react';

import { getUser } from 'src/api';
import Loading from 'src/components/Loading';
import useFetch from 'src/hooks/useFetch';

export default () => {
  const { loading, response } = useFetch(getUser, { user: 'facebook' }, true);

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
};
