import { cn } from '@dookdiks/utils';
import {
  CategorySearchSection,
  CategorySearchSectionProps,
} from './_component/categorySearchSection';
import { SearchProvider } from './_component/searchContext';
import { Suspense } from 'react';
import Loading from './loading';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoryButtonList: CategorySearchSectionProps['list'] = [
    {
      name: 'Accounts',
      value: 'accounts',
    },
    {
      name: 'Community',
      value: 'community',
    },
    {
      name: 'Topic',
      value: 'topic',
    },
  ];
  return (
    <>
      <SearchProvider>
        <section>
          <div className={cn('flex justify-end gap-4')}>
            <CategorySearchSection list={categoryButtonList} />
          </div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </SearchProvider>
    </>
  );
}
