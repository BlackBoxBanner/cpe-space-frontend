"use client";

import { cn } from "@dookdiks/utils";

const ExampleForm = () => {
	const clientAction = async (formData: FormData) => {
		const name = formData.get("name") as string;
		alert(`Hello ${name} from client!\nUsing client action!`);
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

				<div className={cn("flex  items-center gap-2")}>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						className={cn("p-2 rounded border-neutral-900 border-2")}
						placeholder="name"
					/>
				</div>
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

export default ExampleForm;
