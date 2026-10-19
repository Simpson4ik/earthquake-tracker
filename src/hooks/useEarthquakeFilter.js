import { useState } from 'react';

export function useEarthquakeFilter(items) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredItems
  };
}