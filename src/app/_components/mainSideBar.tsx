import SideBarButton from "@/components/sidebarbutton";
import { AiOutlinePushpin } from "react-icons/ai";
import { BiHome, BiRocket, BiHive } from "react-icons/bi";

const MainSideBar = async () => {
	return (
		<>
			<nav className="sticky overflow-scroll left-0 pr-6">
				<SideBarButton Icon={() => <BiHome />} title="Home" />
				<SideBarButton Icon={() => <BiRocket />} title="Trending" />
				<SideBarButton Icon={() => <BiHive />} title="Communities" />
				<SideBarButton Icon={() => <AiOutlinePushpin />} title="Topics" />
			</nav>
		</>
	);
};

export default MainSideBar;
