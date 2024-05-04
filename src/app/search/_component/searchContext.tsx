'use client';

import { createContext, useContext, useState } from 'react';
import { SearchCategory, isCategory } from './utils';

type SearchContextType = {
  search: SearchCategory;
  setSearch: (search: SearchCategory | string) => void;
};

export const searchContext = createContext<SearchContextType>({
  search: 'accounts',
  setSearch: () => {},
});

type SearchProviderProps = {
  children: React.ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState<SearchCategory>('accounts');

  const setSearchHandler = (search: SearchCategory | string) => {
    setSearch(isCategory(search));
  };

  return (
    <searchContext.Provider value={{ search, setSearch: setSearchHandler }}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearchCategory = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error('useSearchCategory must be used within SearchProvider');
  }

  return context;
};
