'use client';

import { useSearchCategory } from './searchContext';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { TopicSchema, UserSchema } from '@/types/zodSchema';
import { axios } from '@/libs/axiosInstance';
import Image from 'next/image';
import { cn } from '@dookdiks/utils';
import { useSearchQuery } from '@/libs/utils/basic/createQuery';

type TopicType = z.infer<typeof TopicSchema>;

type TopicDisplayProps = {
  search?: string;
};

const TopicDisplay = ({ search }: TopicDisplayProps) => {
  const [data, setData] = useState<TopicType[]>([]);

  useEffect(() => {
    axios
      .get<{ data: TopicType[] }>('/api/topic/search', {
        params: { search },
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return data.map((topic, index) => {
    return <TopicList topic={topic} key={`account-display-${index}`} />;
  });
};

type TopicListProps = {
  topic: TopicType;
};

const TopicList = ({ topic }: TopicListProps) => {
  return (
    <div className={cn('flex gap-4 border-b border-gray-white py-8')}>
      <div className="flex items-center rounded-3xl h-28 text-alabaster stroke-smoky-black border border-smoky-black w-full bg-yellow-orange p-8 text-[4rem] relative">
        <p className="text-fill text-stroke">{topic.name}</p>
        {/* TODO - create follow button */}
        <button
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-4 font-light text-[1.5rem] border border-smoky-black rounded-2xl bg-alabaster text-smoky-black px-6 py-4',
          )}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

const SearchTopic = () => {
  const { search } = useSearchCategory();

  const { searchParams } = useSearchQuery();

  const input = searchParams.get('input');

  if (search !== 'topic') return;
  return <TopicDisplay search={input ? input : undefined} />;
};

export default SearchTopic;
