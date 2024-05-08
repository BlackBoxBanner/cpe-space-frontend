import { getCommunities } from '@/libs/utils/communities';
import { cookies } from 'next/headers';
import {
  CommunitiesCollapsibleButton,
  SideBarMainSection,
  TopicCollapsibleButton,
} from './collapsibleCustomButton';
import { getTopics } from '@/libs/utils/topics';

const MainSideBar = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('user-id');
  const community = await getCommunities({});
  const topics = await getTopics({});

  if (!userId?.value) throw new Error('User not found');

  return (
    <>
      <nav className="sticky overflow-scroll left-0 no-scrollbar">
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
        <TopicCollapsibleButton topics={topics} />
      </nav>
    </>
  );
};

export default MainSideBar;
