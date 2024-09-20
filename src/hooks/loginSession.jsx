import { useState } from 'react';

const useLoginSession = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return null;
    }
  });

  const setValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error('Error removing data from local storage:', error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLoginSession;
