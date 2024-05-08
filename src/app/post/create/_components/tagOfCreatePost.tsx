import { Button } from '@/components/common/button';
import CommunityListTag from './searchCommunityTag';
import TopicListTag from './searchtopicTag';

const TagOfCreatePost = () => {
  return (
    <>
      <div>
        <div>
          <div className="mb-1">Communities :</div>
          <CommunityListTag />
        </div>
        <div className="mt-3 ">
          <div className="mb-1">Topics :</div>
          <TopicListTag />
        </div>
        <div className="flex justify-end">
          <Button className="w-40 rounded-full mt-4">Post</Button>
        </div>
      </div>
    </>
  );
};

export default TagOfCreatePost;
