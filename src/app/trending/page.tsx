import { axios } from '@/libs/axiosInstance';
import { Post, PostType } from '@/components/common/post';
import { ReturnResponse } from '@/types/ResponseType';
import CreatePost from '../_components/createpost';

export default async function Trending() {
  const postData = await axios.get<ReturnResponse<PostType[]>>('/api/post');

  if (postData.data.error) throw new Error('Error fetching post data');

  return (
    <div className="flex flex-col gap-6">
      {postData.data.data.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
export default Trending;
