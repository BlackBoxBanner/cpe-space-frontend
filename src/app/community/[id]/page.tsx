import { CommunityList } from '@/app/search/_component/searchCommunity';
import { axios } from '@/libs/axiosInstance';
import { z } from 'zod';
import { CommunitiesSchema, UserSchema } from '@/types/zodSchema';

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

  return (
    <>
      <CommunityList community={communityData.data.data[0]} />
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
