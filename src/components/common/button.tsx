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
		},
		size: {
			sm: "",
			md: "py-3 px-2 text-base rounded-lg min-w-20",
			lg: "py-5 px-4 text-[1.6rem] rounded-xl min-w-40",
			free: "",
			circle: "rounded-full aspect-square p-4",
		},
		position: {
			start: "text-start",
			center: "text-center",
			end: "text-end",
		},
		widthFull: {
			true: "w-full",
		},
	},
	defaultVariants: {
		color: "orange",
		size: "md",
		widthFull: false,
		position: "center",
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
			<Comp
				className={buttonVariants({
					...buttonStyle,
					class: props.className,
				})}
				ref={ref}
				{...props}
			/>
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
