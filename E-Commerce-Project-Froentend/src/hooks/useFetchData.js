import axios from "axios";
import Axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      console.log("Fetched data from API: ", res.data);
      setData(res.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchData;
