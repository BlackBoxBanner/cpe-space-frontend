import { cn } from "@dookdiks/utils";
import Image from "next/image";
import top from "@/assets/welcome/top.png";
import bottom from "@/assets/welcome/bottom.png";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main
				className={cn(
					"bg-alabaster h-screen max-h-screen p-8 grid grid-rows-3"
				)}
			>
				<section className="-translate-y-6">
					<Image src={top} width={7372} height={1392} alt="" />
				</section>
				<section className={cn("px-14 grid grid-cols-[auto,1fr] gap-24 z-50")}>
					{children}
				</section>
				<section className="translate-y-2">
					<Image src={bottom} width={7372} height={1392} alt="" />
				</section>
			</main>
		</>
	);
}
