import { cn } from '@dookdiks/utils';
import Link from 'next/link';
import { BiBell, BiChat } from 'react-icons/bi';
import SearchForm from './searchForm';
import { cookies } from 'next/headers';
import { getUsers } from '@/libs/utils/users/get';
import Image from 'next/image';

const MainNavBar = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get('user-id');

  if (!userId) return;

  const user = await getUsers({ id: userId.value });

  if (user.error) throw new Error('unable to get image');

  return (
    <>
      <nav className="h-[4.25rem] relative grid grid-cols-[1fr,auto] items-center px-4 ">
        <SearchForm />
        <div className="flex gap-6 items-center">
          <Link href="/notification" passHref>
            <BiBell size={22} className={cn('fill-alabaster')} />
          </Link>
          <Link href="/chat" passHref>
            <BiChat size={22} className={cn('fill-alabaster')} />
          </Link>
          <Link href="/profile" passHref legacyBehavior>
            <div className="rounded-full aspect-square w-10 overflow-hidden bg-alabaster cursor-pointer">
              <Image
                width={300}
                height={300}
                src={`/api/image/${user.data[0].image}`}
                alt={user.data[0].studentid}
              />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainNavBar;
