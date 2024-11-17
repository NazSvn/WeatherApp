import { useCallback, useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP error! status:${res.status}`);

      const result = await res.json();

      setData(result);
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
