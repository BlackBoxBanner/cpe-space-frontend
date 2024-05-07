'use client';

import { useSearchCategory } from './searchContext';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { CommunitiesSchema, UserSchema } from '@/types/zodSchema';
import { axios } from '@/libs/axiosInstance';
import Image from 'next/image';
import { cn } from '@dookdiks/utils';
import { useSearchQuery } from '@/libs/utils/basic/createQuery';
import { Button } from '@/components/common/button';

type UserType = z.infer<typeof UserSchema>;
type CommunityType = z.infer<typeof CommunitiesSchema> & {
  owner: Pick<UserType, 'name' | 'id' | 'image'>;
};

type CommunityDisplayProps = {
  search?: string;
};

const CommunityDisplay = ({ search }: CommunityDisplayProps) => {
  const [data, setData] = useState<Omit<CommunityType, 'password'>[]>([]);

  useEffect(() => {
    axios
      .get<{ data: CommunityType[] }>('/api/communities/search', {
        params: { search: search },
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return data.map((community, index) => {
    return (
      <CommunityList community={community} key={`account-display-${index}`} />
    );
  });
};

type CommunityListProps = {
  community: CommunityType;
};

const CommunityList = ({ community }: CommunityListProps) => {
  return (
    <div className={cn('flex border-b border-gray-white py-8')}>
      <div className="overflow-hidden w-full rounded-3xl border border-smoky-black relative">
        <Image
          src={`/api/image/${community.image}`}
          className="bg-cover object-cover w-full h-44 rounded-t-lg"
          width={3000}
          height={2000}
          alt={`profile image of ${community.name}`}
        />
        <div className="text-fill-yellow text-stroke absolute bottom-2 left-6 font-semibold text-[4rem]">
          {community.name}
        </div>
      </div>
      <div className="flex flex-col overflow-hidden w-56 p-4 rounded-3xl border border-smoky-black relative justify-between">
        <div className="flex flex-col gap-2 font-light">
          <div className="flex justify-between items-center h-6">
            <div>Members</div>
            <div className="text-2xl font-normal">{22}</div>
          </div>
          <div className="flex justify-between items-center h-6">
            <div>Owner</div>
            <div className="border border-smoky-black rounded-full aspect-square w-7 overflow-hidden">
              <Image
                src={`/api/image/${community.owner.image}`}
                width={1000}
                height={1000}
                alt={`profile image of ${community.owner.name}`}
              />
            </div>
          </div>
        </div>
        <div>
          {/* TODO - click to join the comunity */}
          <Button
            buttonStyle={{
              size: 'sm',
            }}
            className="text-sm w-full font-light py-1 rounded-xl"
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchCommunity = () => {
  const { search } = useSearchCategory();

  const { searchParams } = useSearchQuery();

  const input = searchParams.get('input');

  if (search !== 'community') return;
  return <CommunityDisplay search={input ? input : undefined} />;
};

export default SearchCommunity;
