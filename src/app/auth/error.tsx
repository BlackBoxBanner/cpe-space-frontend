"use client";

import { cn } from "@dookdiks/utils";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className={cn("flex w-full flex-col justify-center items-center")}>
			<h2 className="text-4xl">{`${error.name} - ${error.message}`}</h2>
		</div>
	);
}
