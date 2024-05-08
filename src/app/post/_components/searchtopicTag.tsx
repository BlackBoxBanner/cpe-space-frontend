'use client';

import { useEffect, useState } from 'react';
import { axios } from '@/libs/axiosInstance';
import { cn } from '@dookdiks/utils';
import { AiOutlineSearch } from 'react-icons/ai';
import { z } from 'zod';
import { TopicSchema } from '@/types/zodSchema';
import { useCreatePostContext } from './context';

type TopicType = z.infer<typeof TopicSchema>;

const TopicDisplayTag = () => {
  const { selectedTags, setSelectedTags } = useCreatePostContext();
  const [data, setData] = useState<TopicType[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

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

    if (selectedTags.includes(topicName)) {
      updatedSelectedTopics = selectedTags.filter(name => name !== topicName);
    } else {
      updatedSelectedTopics = [...selectedTags, topicName];
    }

    setSelectedTags(updatedSelectedTopics);
  };

  const filteredData = data.filter(topic =>
    topic.name.toLowerCase().includes(searchInput.toLowerCase()),
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
        <div className="flex w-[45rem] overflow-scroll">
          {filteredData.map((topic, index) => (
            <div
              className={cn(
                'border border-smoky-black flex p-2 rounded-full justify-center items-center mr-2 w-40 cursor-pointer',
                {
                  'bg-liberty': selectedTags.includes(topic.id),
                  'text-white': selectedTags.includes(topic.id),
                  'border-none': selectedTags.includes(topic.id),
                },
              )}
              key={`topic-${index}`}
              onClick={() => handleTopicClick(topic.id)}
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
