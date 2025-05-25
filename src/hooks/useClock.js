import { useState, useEffect } from 'react';

const useClock = (initialDate) => {
  const [time, setTime] = useState(new Date(initialDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

export default useClock;
