'use client';

import SearchAccounts from './_component/searchAccounts';
import SearchCommunity from './_component/searchCommunity';
import SearchTopic from './_component/searchTopic';

const SearchPage = () => {
  // TODO - create a search component that will display the search results for accounts, community, and topics
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
