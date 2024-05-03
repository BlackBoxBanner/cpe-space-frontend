import { cn } from "@dookdiks/utils";
import Link from "next/link";
import { BiBell, BiChat } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";

const MainNavBar = async () => {
	return (
		<>
			<nav className="h-[4.25rem] relative flex justify-between items-center px-4 ">
				<form method="get" action={"/search"}>
					<input type="search" name="input" id="search-input" />
				</form>
				<div className="flex gap-4">
					<Link href="/notification" passHref legacyBehavior>
						<BiBell className={cn("fill-alabaster")} />
					</Link>
					<Link href="/chat" passHref legacyBehavior>
						<BiChat className={cn("fill-alabaster")} />
					</Link>
					<Link href="/profile" passHref legacyBehavior>
						<FaRegCircle />
					</Link>
				</div>
			</nav>
		</>
	);
};

export default MainNavBar;
