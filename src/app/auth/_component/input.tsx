import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input"> & {
	label?: ComponentProps<"label">;
	error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label: labelProps,
			id,
			placeholder = "input",
			className,
			value = "",
			error = false,
			...props
		},
		ref
	) => {
		return (
			<>
				<div className="relative w-full h-auto">
					<input
						value={value}
						ref={ref}
						className={cn(
							"peer",
							"appearance-none ",
							"py-5 px-6 text-[1.6rem] rounded-xl min-w-40 w-full",
							"border border-smoky-black bg-alabaster",
							{
								"border border-error text-error": error,
							},
							className
						)}
						placeholder={""}
						id={id}
						// pattern="/.*\S.*/"
						{...props}
					/>
					<label
						className={cn(
							"ease-in-out duration-200 cursor-text",
							"absolute left-6 text-[1.6rem] text-gray  translate-y-1/2",
							"peer-focus:left-0 peer-focus:-translate-y-12 peer-focus:text-smoky-black",
							{
								"left-0 -translate-y-12 text-smoky-black": value,
								"text-error peer-focus:text-error": error,
							}
						)}
						htmlFor={id}
						{...labelProps}
					>
						{placeholder}
					</label>
				</div>
			</>
		);
	}
);

Input.displayName = "Input";

export { Input };
