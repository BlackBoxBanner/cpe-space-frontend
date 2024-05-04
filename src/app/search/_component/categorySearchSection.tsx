'use client';

import { Button } from '@/components/common/button';
import { useSearchQuery } from '@/libs/utils/basic/createQuery';
import { isCategory } from './utils';
import { useEffect } from 'react';
import { useSearchCategory } from './searchContext';

export type CategorySearchSectionProps = {
  list: { name: string; value: string }[];
};

export const CategorySearchSection = ({ list }: CategorySearchSectionProps) => {
  const { searchParams, routeWithQuery } = useSearchQuery();

  const search = searchParams.get('search');
  const input = searchParams.get('input');

  const { search: searchCategory, setSearch } = useSearchCategory();

  useEffect(() => {
    if (!search) {
      setSearch('accounts');
    } else {
      setSearch(search);
    }
  }, []);

  return list.map(({ name, value }, index) => {
    return (
      <Button
        className="min-w-36 text-xl font-light rounded-full"
        buttonStyle={{
          color: value == isCategory(searchCategory) ? 'orange' : 'ghost',
        }}
        onClick={() => {
          routeWithQuery(
            { name: 'search', value: value },
            { name: 'input', value: input ? input : '' },
          );
          setSearch(value);
        }}
        key={`category-search-section-${index}-${value}`}
      >
        {name}
      </Button>
    );
  });
};
