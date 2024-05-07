'use client';

import { useEffect, useState } from 'react';
import { axios } from '@/libs/axiosInstance';
import { cn } from '@dookdiks/utils';
import { AiOutlineSearch } from 'react-icons/ai';

type CommunityType = {
    name: string;
};

const CommunityDisplayTag = () => {
    const [data, setData] = useState<CommunityType[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

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
        if (selectedCommunities.includes(communityName)) {
            setSelectedCommunities(selectedCommunities.filter(name => name !== communityName));
        } else {
            setSelectedCommunities([...selectedCommunities, communityName]);
        }
    };

    const filteredData = data.filter(community =>
        community.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div className='flex'>
                <div className='bg-white border border-liberty flex p-2 rounded-full w-fit text-liberty items-center mr-2'>
                    <AiOutlineSearch />
                    <input
                        type="text"
                        placeholder="Search"
                        className='outline-none ml-2 w-40'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div className='flex'>
                    {filteredData.map((community, index) => (
                        <div
                            className={cn('border border-smoky-black flex p-2 rounded-full justify-center items-center mr-2 w-40 cursor-pointer', {
                                'bg-liberty': selectedCommunities.includes(community.name),
                                'text-white': selectedCommunities.includes(community.name),
                                'border-none': selectedCommunities.includes(community.name)
                            })}
                            key={`community-${index}`}
                            onClick={() => handleCommunityClick(community.name)}
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
