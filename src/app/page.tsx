import { axios } from '@/libs/axiosInstance';
import CreatePost from './_components/createpost';
import { Post, PostType } from '@/components/common/post';
import { ReturnResponse } from '@/types/ResponseType';

export default async function Home() {
  const postData = await axios.get<ReturnResponse<PostType[]>>('/api/post');

  if (postData.data.error) throw new Error('Error fetching post data');

  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      <hr className="my-2 border-t border-gray" />
      <div className="flex flex-col gap-6">
        {postData.data.data.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
