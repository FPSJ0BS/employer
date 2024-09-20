import { useEffect, useState } from 'react';

const useCustomLoader = (initialValue = false) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const setLoader = (newValue) => {
    setIsLoading(newValue);
  };

  useEffect(() => {
    // Reset loading state when the component unmounts
    return () => {
      setIsLoading(false);
    };
  }, []);

  return [isLoading, setLoader];
};

export default useCustomLoader;
