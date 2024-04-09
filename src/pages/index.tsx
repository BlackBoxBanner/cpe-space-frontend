import { Inter } from "next/font/google";
import DemoSignin from "@/components/DemoSignin";
import DemoSignout from "@/components/DemoSignout";
import DemoRegister from "@/components/DemoRegister";
import { imagePath } from "@/lib/utils/image/get";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-evenly p-24 gap-8 ${inter.className}`}
		>
			<DemoSignin />
			<DemoSignout />
			<DemoRegister />
			<Image
				alt="user-images/64070503000_profile.jpg"
				src={imagePath("user-images/64070503000_profile.png")}
				width={200}
				height={200}
			/>
		</main>
	);
}
