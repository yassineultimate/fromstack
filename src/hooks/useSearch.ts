import { useState, useMemo } from 'react';

type SearchableObject = Record<string, any>;

export function useSearch<T extends SearchableObject>(
  items: T[],
  searchFields: (keyof T)[],
  defaultQuery: string = ''
) {
  const [query, setQuery] = useState(defaultQuery);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;

    const searchTerm = query.toLowerCase();
    return items.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }, [items, query, searchFields]);

  return {
    query,
    setQuery,
    filteredItems
  };
}