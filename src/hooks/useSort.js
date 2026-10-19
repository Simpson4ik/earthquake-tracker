import { useState } from 'react';
import { getColumn } from '../constants/columns';

export function useSort(initialSort) {
  const [sort, setSort] = useState(initialSort);

  const toggleSort = (key) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: getColumn(key).defaultDirection };
    });
  };

  return [sort, toggleSort];
}
