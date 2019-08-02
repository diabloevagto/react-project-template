import { useCallback, useEffect, useState } from 'react';

export default (apiFetch, body, immediately = false) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(body);
  const [start, setStart] = useState(immediately);

  const doReset = () => {
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    if (!start) {
      return;
    }

    doReset();

    const subscription = apiFetch(payload).subscribe({
      next(response) {
        setResponse(response);
        setLoading(false);
        setStart(false);
      },
      error(err) {
        setError(err);
        setLoading(false);
        setStart(false);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [apiFetch, payload, start]);

  return {
    loading,
    error,
    response,
    doStart: useCallback(() => setStart(true), []),
    setPayloadAndFetch: useCallback(body => {
      setPayload(body);
      setStart(true);
    }, []),
  };
};
