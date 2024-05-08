'use client';

import { useEffect, useState } from 'react';
import { axios } from '@/libs/axiosInstance';
import { cn } from '@dookdiks/utils';
import { AiOutlineSearch } from 'react-icons/ai';

type TopicType = {
    name: string;
};

const TopicDisplayTag = () => {
    const [data, setData] = useState<TopicType[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedTopic, setSelectedTopic] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get<{ data: TopicType[] }>('/api/Topic')
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleTopicClick = (TopicName: string) => {
        if (selectedTopic.includes(TopicName)) {
            setSelectedTopic(selectedTopic.filter(name => name !== TopicName));
        } else {
            setSelectedTopic([...selectedTopic, TopicName]);
        }
    };

    const filteredData = data.filter(Topic =>
        Topic.name.toLowerCase().includes(searchInput.toLowerCase())
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
                    {filteredData.map((Topic, index) => (
                        <div
                            className={cn('border border-smoky-black flex p-2 rounded-full justify-center items-center mr-2 w-40 cursor-pointer', {
                                'bg-liberty': selectedTopic.includes(Topic.name),
                                'text-white': selectedTopic.includes(Topic.name),
                                'border-none': selectedTopic.includes(Topic.name)
                            })}
                            key={`Topic-${index}`}
                            onClick={() => handleTopicClick(Topic.name)}
                        >
                            <div>{Topic.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopicDisplayTag;
