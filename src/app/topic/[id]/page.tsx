import CreatePost from '@/app/_components/createpost';
import { TopicList } from '@/app/search/_component/searchTopic';
import { Post } from '@/components/common/post';
import { getTopicsPost } from '@/libs/utils/topics';

const TopicPage = async ({ params: { id } }: { params: { id: string } }) => {
  const topic = await getTopicsPost(id);

  if (!topic) throw new Error('Topic not found');

  return (
    <>
      <section>
        <TopicList topic={topic[0]} />
        <div className="my-8">
          <CreatePost />
        </div>
        <div className="flex flex-col gap-8">
          {topic[0].posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TopicPage;
