import  { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (req, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(req.url, {
        method: req.method ? req.method : "GET",
        body: req.body ? JSON.stringify(req.body) : null,
        headers: req.headers ? req.headers : {},
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return{
    isLoading,
    error,
    sendRequest
  }
};

export default useHttp;
