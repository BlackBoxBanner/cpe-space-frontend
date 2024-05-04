import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@dookdiks/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BiBell } from "react-icons/bi";
import { BiChat } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import Link from "next/link";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();

	const session = cookieStore.get("cpe_space_session");
	const user = cookieStore.get("user-id");

	return (
		<html lang="en">
			<body
				className={cn(
					outfit.variable,
					spaceGrotesk.variable,
					"font-sans bg-liberty min-h-dvh overflow-auto"
				)}
			>
				{session && user ? <MainLayout>{children}</MainLayout> : children}
			</body>
		</html>
	);
}

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className="sticky top-0 z-50">
				<MainNavBar />
			</header>
			<div className="h-full grid grid-rows-[1fr,auto]">
				<section className="bg-alabaster max-h-[85.5dvh] overflow-hidden rounded-[1.75rem] grid grid-cols-[350px,auto,1fr] gap-x-6 p-4 relative">
					<MainSideBar />
					<span className="border-r border-r-smoky-black" />
					<div className="overflow-auto min-h-screen">{children}</div>
				</section>
				<footer className="h-12"></footer>
			</div>
		</>
	);
};

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

const MainSideBar = async () => (
	<>
		<MainSideBar />
	</>
);
