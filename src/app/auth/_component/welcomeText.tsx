"use client";

import { cn } from "@dookdiks/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { popUpAnimation } from "@/animation/popUpAnimation";

export const WelcomeText = () => {
	useGSAP(() => {
		const loopTl = gsap.timeline({ repeat: -1 });
		const tl = gsap.timeline({});
		const delay = 2.5;

		const loopText = loopTl
			.fromTo(
				".slide",
				{
					translateY: 0,
				},
				{
					translateY: -(1 * 32),
					delay,
				}
			)
			.to(".slide", {
				translateY: -(2 * 32),
				delay,
			})
			.to(".slide", {
				translateY: 0,
				delay,
			});

		popUpAnimation(tl, ".animate-welcome-1").play();
		popUpAnimation(tl, ".animate-welcome-2").play();
		popUpAnimation(tl, ".animate-description").play();

		loopText.play();
	}, []);
	return (
		<>
			<div
				className={cn("font-decorate flex flex-col gap-2 justify-start py-4")}
			>
				<p
					id="welcome-text"
					className={cn(
						"text-[3.75rem] font-semibold flex overflow-hidden gap-4"
					)}
				>
					<span className="animate-welcome-1 opacity-0">Welcome to</span>
					<span className="animate-welcome-2 opacity-0">CPE Space</span>
				</p>
				<p className=" h-8 overflow-hidden">
					<span className="animate-description flex text-2xl gap-4 opacity-0">
						<span>🙌</span>
						<span>A place for sharing</span>
						<span className="slides flex flex-col">
							<span className="slide">knowledge</span>
							<span className="slide">experience</span>
							<span className="slide">happinesses</span>
						</span>
					</span>
				</p>
			</div>
		</>
	);
};
