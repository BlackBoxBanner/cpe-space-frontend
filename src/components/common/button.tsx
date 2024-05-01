import Link from "next/link";
import { ComponentProps, forwardRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@dookdiks/utils";

export const buttonVariants = tv({
	base: "font-sans ease-in-out duration-300 disabled:bg-timberwolf disabled:text-alabaster",
	variants: {
		color: {
			orange: "bg-orange text-alabaster hover:bg-[#F2A685]",
			ghost:
				"bg-transparent text-smoky-black border-smoky-black border hover:border-timberwolf hover:text-timberwolf",
			link: "text-liberty hover:text-[#9EAAC9]",
		},
		size: {
			sm: " w-full",
			md: "py-3 px-2 text-base rounded-lg min-w-20 w-full",
			lg: "py-5 px-4 text-[1.6rem] rounded-xl min-w-40 w-full",
			free: "",
			circle: "rounded-full aspect-square p-4",
			link: "",
			"min-width": "w-auto py-3 px-2 text-base rounded-full min-w-28",
		},
		position: {
			start: "text-start",
			center: "text-center",
			end: "text-end",
		},
		widthFull: {
			true: "w-full",
		},
		underline: {
			true: "",
		},
		active: {
			orange: "bg-orange text-alabaster border-orange hover:bg-[#F2A685]",
		},
	},
	defaultVariants: {
		color: "orange",
		size: "md",
		widthFull: false,
		position: "center",
		underline: false,
	},
});

export type ButtonVariant = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentProps<"button"> & {
	asChild?: boolean;
	buttonStyle?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ asChild = false, buttonStyle, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<div className="relative group w-full">
				<Comp
					className={buttonVariants({
						class: props.className,
						...buttonStyle,
					})}
					ref={ref}
					{...props}
				/>

				{buttonStyle?.underline ? (
					<span
						className={cn(
							"absolute w-[0%] group-hover:w-full border-b -bottom-1 left-0 ease-in-out duration-300 border-liberty group-hover:border-[#9EAAC9]"
						)}
					/>
				) : null}
				{}
			</div>
		);
	}
);

Button.displayName = "Button";

type LinkProps = ComponentProps<typeof Link> & { buttonStyle?: ButtonVariant };

const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
	({ children, buttonStyle, ...props }, ref) => {
		return (
			<Link
				{...props}
				className={buttonVariants({
					...buttonStyle,
					class: props.className,
				})}
				ref={ref}
			>
				{children}
			</Link>
		);
	}
);

LinkComponent.displayName = "Link";

export { LinkComponent as Link };
