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

    const handleTopicClick = (topicName: string) => {
        let updatedSelectedTopics: string[];

        if (selectedTopic.includes(topicName)) {
            updatedSelectedTopics = selectedTopic.filter(name => name !== topicName);
        } else {
            updatedSelectedTopics = [...selectedTopic, topicName];
        }

        setSelectedTopic(updatedSelectedTopics);

        console.log(updatedSelectedTopics);
    };

    const filteredData = data.filter(topic =>
        topic.name.toLowerCase().includes(searchInput.toLowerCase())
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
                    {filteredData.map((topic, index) => (
                        <div
                            className={cn('border border-smoky-black flex p-2 rounded-full justify-center items-center mr-2 w-40 cursor-pointer', {
                                'bg-liberty': selectedTopic.includes(topic.name),
                                'text-white': selectedTopic.includes(topic.name),
                                'border-none': selectedTopic.includes(topic.name)
                            })}
                            key={`topic-${index}`}
                            onClick={() => handleTopicClick(topic.name)}
                        >
                            <div>{topic.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopicDisplayTag;
