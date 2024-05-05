import SideBarButton from '@/components/sidebarbutton';
import SideBarCollapsible from '@/components/sidebarcollapsible';
import Link from 'next/link';
import { AiOutlinePushpin } from 'react-icons/ai';
import { BiHive, BiHome, BiRocket } from 'react-icons/bi';
const MainSideBar = async () => {
  return (
    <>
      <nav className="sticky overflow-scroll left-0 pr-6">
        <Link href="/" passHref legacyBehavior>
          <SideBarButton Icon={() => <BiHome />} title="Home" />
        </Link>
        <Link href="/trending" passHref legacyBehavior>
          <SideBarButton Icon={() => <BiRocket />} title="Trending" />
        </Link>
        <hr className="my-2 border-t border-gray" />
        <SideBarCollapsible Icon={() => <BiHive />} title="Communities" />
        <hr className="my-2 border-t border-gray" />
        <SideBarCollapsible Icon={() => <AiOutlinePushpin />} title="Topics" />
      </nav>
    </>
  );
};

export default MainSideBar;
