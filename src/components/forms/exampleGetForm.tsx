"use client";

import { getServerAction } from "@/actions/exmple";
import { cn } from "@dookdiks/utils";

const ExampleGetForm = () => {
	const clientAction = async () => {
		const message = await getServerAction();
		alert(`Server says: ${message}`);
	};

	return (
		<>
			<form
				action={clientAction}
				className={cn(
					"flex gap-2 border-2 flex-col rounded m-2 border-neutral-950 p-4 w-fit"
				)}
			>
				<div className={cn("font-semibold text-xl")}>client action - alert</div>
				<button
					className="bg-neutral-900 text-neutral-200 hover:bg-neutral-700 ease-in-out duration-200 p-2 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default ExampleGetForm;
