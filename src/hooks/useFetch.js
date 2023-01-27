import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return { loading, error, data };
};
