import Link from 'next/link';
import { BiHome, BiRocket } from 'react-icons/bi';
import { getCommunities } from '@/libs/utils/communities';
import { cookies } from 'next/headers';
import {
  CommunitiesCollapsibleButton,
  SideBarMainSection,
  TopicCollapsibleButton,
} from './collapsibleCustomButton';

const MainSideBar = async () => {
  const cookieStore = cookies();

  const userId = cookieStore.get('user-id');

  const community = await getCommunities({});

  if (!userId?.value) throw new Error('User not found');

  return (
    <>
      <nav className="sticky overflow-scroll left-0">
        <SideBarMainSection />
        <div className="px-2">
          <hr className="my-2 border-t border-gray-white" />
        </div>
        <CommunitiesCollapsibleButton
          communities={community}
          userId={userId.value}
        />
        <div className="px-2">
          <hr className="my-2 border-t border-gray-white" />
        </div>
        <TopicCollapsibleButton topics={[]} />
      </nav>
    </>
  );
};

export default MainSideBar;
