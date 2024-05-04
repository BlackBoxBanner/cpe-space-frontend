import { cn } from '@dookdiks/utils';
import Link from 'next/link';
import { BiBell, BiChat } from 'react-icons/bi';
import { FaRegCircle } from 'react-icons/fa';
import SearchForm from './searchForm';

const MainNavBar = async () => {
  return (
    <>
      <nav className="h-[4.25rem] relative grid grid-cols-[1fr,auto] items-center px-4 ">
        <SearchForm />
        <div className="flex gap-4">
          <Link href="/notification" passHref legacyBehavior>
            <BiBell className={cn('fill-alabaster')} />
          </Link>
          <Link href="/chat" passHref legacyBehavior>
            <BiChat className={cn('fill-alabaster')} />
          </Link>
          <Link href="/profile" passHref legacyBehavior>
            <FaRegCircle />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainNavBar;
