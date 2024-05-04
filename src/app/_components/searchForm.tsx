'use client';

import { useSearchQuery } from '@/libs/utils/basic/createQuery';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';

const SearchForm = () => {
  const { searchParams } = useSearchQuery();

  const input = searchParams.get('input');

  const ref = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState(input ? input : '');

  const router = useRouter();

  return (
    <>
      <form
        method="get"
        action={'/search'}
        className="w-fit"
        onSubmit={() => {
          if (searchInput === '') {
            router.push('/');
          }
        }}
      >
        <label className="w-fit">
          <div className="flex items-center justify-center w-[35rem] gap-4 bg-alabaster text-libert  py-2 px-3 text-xl font-light rounded-xl">
            <AiOutlineSearch className="fill-liberty" />
            <input
              className="appearance-none placeholder:text-liberty text-liberty bg-transparent font-light w-full focus:outline-none focus:ring-0 flex items-center justify-center"
              defaultValue={''}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              type="text"
              name="input"
              id="search-input"
              placeholder="Search"
              autoComplete="off"
              ref={ref}
            />
            {searchInput ? (
              <button
                type="reset"
                onClick={() => {
                  setSearchInput('');
                  ref.current?.focus();
                }}
              >
                <AiOutlineCloseCircle className="fill-liberty" />
              </button>
            ) : null}
          </div>
        </label>
      </form>
    </>
  );
};

export default SearchForm;
