import { useState } from 'react';

export function useCounter(initialValue = 0, step = 1, min = 0, max = 100) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => {
      const nextValue = Number((prev + step).toFixed(2));
      return nextValue <= max ? nextValue : prev;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const nextValue = Number((prev - step).toFixed(2));
      return nextValue >= min ? nextValue : prev;
    });
  };

  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
}