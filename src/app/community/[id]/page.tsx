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

type UserType = z.infer<typeof UserSchema>;
type CommunityType = z.infer<typeof CommunitiesSchema> & {
  owner: Pick<UserType, 'name' | 'id' | 'image'>;
};

type PostType = z.infer<typeof PostSchema> & {
  user: UserType;
  PostTopic: z.infer<typeof PostTopicSchema>;
  comments: z.infer<typeof CommentSchema>;
  communities: z.infer<typeof CommunitiesSchema>;
  topics: z.infer<typeof TopicSchema>;
};

const Communities = async ({ params: { id } }: { params: { id: string } }) => {
  const communityData = await axios.get<{ data: CommunityType[] }>(
    '/api/communities',
    {
      params: { id },
    },
  );

  // TODO - get Post from Post API

  const postData = await axios.get<{ data: PostType[] }>('/api/post', {
    params: { communitiesId: id },
  });

  return (
    <>
      <section>
        <CommunityList community={communityData.data.data[0]} />
        <div className="mt-8">
          <CreatePost />
        </div>
      </section>
      {/* <CommunitiesTopPart /> */}
      {/* <hr className="border-t border-gray mx-3 my-7" />
      <CreatePost />
      <StatusBox
        Icon={() => <BiBookOpen />}
        title="No post yet"
        color="bg-[#0D0D0D]"
      /> */}
    </>
  );
};

export default Communities;
