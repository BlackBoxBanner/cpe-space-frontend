import CreatePost from '@/app/_components/createpost';
import { TopicList } from '@/app/search/_component/searchTopic';
import { axios } from '@/libs/axiosInstance';
import { TopicSchema } from '@/types/zodSchema';
import { z } from 'zod';

type TopicType = z.infer<typeof TopicSchema>;

const TopicPage = async ({ params: { id } }: { params: { id: string } }) => {
  const topic = await axios.get<{ data: TopicType[] }>('/api/topic', {
    params: { id },
  });

  if (!topic.data.data[0]) throw new Error('Topic not found');
  return (
    <>
      <section>
        <TopicList topic={topic.data.data[0]} />
        <div className="mt-8">
          <CreatePost />
        </div>
      </section>
    </>
  );
};

export default TopicPage;
