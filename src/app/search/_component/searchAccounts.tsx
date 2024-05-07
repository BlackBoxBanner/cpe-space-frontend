'use client';

import { useSearchCategory } from './searchContext';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { UserSchema } from '@/types/zodSchema';
import { axios } from '@/libs/axiosInstance';
import Image from 'next/image';
import { cn } from '@dookdiks/utils';
import { useSearchQuery } from '@/libs/utils/basic/createQuery';

type UserType = z.infer<typeof UserSchema>;

type AccountDisplayProps = {
  search?: string;
};

const AccountDisplay = ({ search }: AccountDisplayProps) => {
  const [data, setData] = useState<Omit<UserType, 'password'>[]>([]);

  useEffect(() => {
    axios
      .get<{ data: Omit<UserType, 'password'>[] }>('/api/user/search', {
        params: { search },
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return data.map((user, index) => {
    return <AccountList user={user} key={`account-display-${index}`} />;
  });
};

type AccountListProps = {
  user: Omit<UserType, 'password'>;
};

const AccountList = ({ user }: AccountListProps) => {
  return (
    <div className={cn('flex gap-4 border-b border-gray-white py-8')}>
      <div
        className={cn(
          'aspect-square w-14 border border-smoky-black rounded-full overflow-clip',
        )}
      >
        <Image
          src={`/api/image/${user.image}`}
          width={1000}
          height={1000}
          alt={`profile image of ${user.name}`}
          className="object-cover bg-cover h-full w-full"
        />
      </div>
      <div className={cn('flex flex-col ')}>
        <p className={cn('text-xl')}>{user.name}</p>
        <p className={cn('text-lg font-light text-gray-white')}>{user.class}</p>
      </div>
    </div>
  );
};

const SearchAccounts = () => {
  const { search } = useSearchCategory();

  const { searchParams } = useSearchQuery();

  const input = searchParams.get('input');

  if (search !== 'accounts') return;
  return <AccountDisplay search={input ? input : undefined} />;
};

export default SearchAccounts;
