import { CommunityList } from '@/app/search/_component/searchCommunity';
import { axios } from '@/libs/axiosInstance';
import { z } from 'zod';
import {
  CommentSchema,
  CommunitiesSchema,
  PostSchema,
  PostTopicSchema,
  TopicSchema,
  UserSchema,
} from '@/types/zodSchema';
import CreatePost from '@/app/_components/createpost';
import { getCommunitiesPost } from '@/libs/utils/communities';
import { Post } from '@/components/common/post';

type UserType = z.infer<typeof UserSchema>;
type CommunityType = z.infer<typeof CommunitiesSchema> & {
  owner: Pick<UserType, 'name' | 'id' | 'image'>;
};

const Communities = async ({ params: { id } }: { params: { id: string } }) => {
  const communityData = await axios.get<{ data: CommunityType[] }>(
    '/api/communities',
    {
      params: { id },
    },
  );

  const postData = await getCommunitiesPost(id);

  return (
    <>
      <section>
        <CommunityList community={communityData.data.data[0]} />
        <div className="my-8 ">
          <CreatePost />
        </div>
        <div className="flex flex-col gap-8">
          {postData?.map(post => <Post key={post.id} post={post} />)}
        </div>
      </section>
    </>
  );
};

export default Communities;
