import CreatePost from '@/app/_components/createpost';
import { TopicList } from '@/app/search/_component/searchTopic';
import { axios } from '@/libs/axiosInstance';
import { getTopicsPost } from '@/libs/utils/topics';
import { TopicSchema } from '@/types/zodSchema';
import { z } from 'zod';

type TopicType = z.infer<typeof TopicSchema>;

const TopicPage = async ({ params: { id } }: { params: { id: string } }) => {
  const topic = await getTopicsPost(id);

  if (!topic) throw new Error('Topic not found');
  return (
    <>
      <section>
        <TopicList topic={topic[0]} />
        <div className="mt-8">
          <CreatePost />
        </div>
      </section>
    </>
  );
};

export default TopicPage;
