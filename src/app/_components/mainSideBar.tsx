import SideBarButton from '@/components/sidebarbutton';
import SideBarCollapsible from '@/components/sidebarcollapsible';
import { AiOutlinePushpin } from 'react-icons/ai';
import { BiHive, BiHome, BiRocket } from 'react-icons/bi';
const MainSideBar = async () => {
  return (
    <>
      <nav className="sticky overflow-scroll left-0 pr-6">
        <SideBarButton Icon={() => <BiHome />} title="Home" />
        <SideBarButton Icon={() => <BiRocket />} title="Trending" />
        <hr className="my-2 border-t border-gray" />
        <SideBarCollapsible Icon={() => <BiHive />} title="Communities" />
        <hr className="my-2 border-t border-gray" />
        <SideBarCollapsible Icon={() => <AiOutlinePushpin />} title="Topics" />
      </nav>
    </>
  );
};

export default MainSideBar;
