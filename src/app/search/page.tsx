'use client';

import SearchAccounts from './_component/searchAccounts';
import SearchCommunity from './_component/searchCommunity';
import SearchTopic from './_component/searchTopic';

const SearchPage = () => {
  return (
    <>
      <section>
        <SearchAccounts />
        <SearchCommunity />
        <SearchTopic />
      </section>
    </>
  );
};

export default SearchPage;
