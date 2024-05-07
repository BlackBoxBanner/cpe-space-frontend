import StatusBox from '@/components/statusbox';

import CreatePost from '../../_components/createpost';
import { BiBookOpen } from 'react-icons/bi';

const Communities = () => {
  return (
    <>
      {/* <CommunitiesTopPart /> */}
      <hr className="border-t border-gray mx-3 my-7" />
      <CreatePost />
      <StatusBox
        Icon={() => <BiBookOpen />}
        title="No post yet"
        color="bg-[#0D0D0D]"
      />
    </>
  );
};

export default Communities;
