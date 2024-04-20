import { Link } from "@/components/common/button";
import { cn } from "@dookdiks/utils";
import { WelcomeText } from "@/app/auth/_component/welcomeText";

const WelcomePage = () => {
	return (
		<>
			<WelcomeText />
			<div className={cn("flex flex-col gap-8 justify-center")}>
				<Link
					href={"/auth/signup"}
					buttonStyle={{ color: "ghost", size: "lg" }}
					prefetch
				>
					Sign up
				</Link>
				<Link
					href={"/auth/signin"}
					buttonStyle={{ color: "orange", size: "lg" }}
					prefetch
				>
					Log in
				</Link>
			</div>
		</>
	);
};

export default WelcomePage;
