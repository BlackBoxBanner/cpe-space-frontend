import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const variants = tv({
  base: "font-sans",
});

export type ButtonVariant = VariantProps<typeof variants>;

type ButtonProps = ComponentProps<"button"> & ButtonVariant;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} className={cn("font-sans", "")} {...props} />;
  },
);

Button.displayName = "Button";
