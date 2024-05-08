'use client';

import { useEffect, useState } from 'react';
import { axios } from '@/libs/axiosInstance';
import { cn } from '@dookdiks/utils';
import { AiOutlineSearch } from 'react-icons/ai';
import { z } from 'zod';
import { CommunitiesSchema } from '@/types/zodSchema';
import { useCreatePostContext } from './context';

type CommunityType = z.infer<typeof CommunitiesSchema>;

const CommunityDisplayTag = () => {
  const { selectedCommunities, setSelectedCommunities } =
    useCreatePostContext();
  const [data, setData] = useState<CommunityType[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    axios
      .get<{ data: CommunityType[] }>('/api/communities')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleCommunityClick = (communityName: string) => {
    let updatedCommunities: string[];

    if (selectedCommunities.includes(communityName)) {
      updatedCommunities = selectedCommunities.filter(
        name => name !== communityName,
      );
    } else {
      updatedCommunities = [communityName];
    }

    setSelectedCommunities(updatedCommunities);
  };

  const filteredData = data.filter(community =>
    community.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <>
      <div className="flex">
        <div className="bg-white border border-liberty flex p-2 rounded-full w-fit text-liberty items-center mr-2">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search"
            className="outline-none ml-2 w-40"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex">
          {filteredData.map((community, index) => (
            <div
              className={cn(
                'border border-smoky-black flex p-2 rounded-full justify-center items-center mr-2 w-40 cursor-pointer',
                {
                  'bg-liberty': selectedCommunities.includes(community.id),
                  'text-white': selectedCommunities.includes(community.id),
                  'border-none': selectedCommunities.includes(community.id),
                },
              )}
              key={`community-${index}`}
              onClick={() => handleCommunityClick(community.id)}
            >
              <div>{community.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommunityDisplayTag;
