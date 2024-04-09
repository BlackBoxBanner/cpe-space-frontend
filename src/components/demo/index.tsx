import {ComponentProps, forwardRef} from "react";
import {cn} from "@dookdiks/utils";

export const Button = ({className, ...restProps}: ComponentProps<"button">) => {
  return <button className={cn("border rounded border-black px-2 py-1 w-full", className)} {...restProps}/>
}

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(({className, ...restProps}, ref) => {
  return <input className={cn("border rounded border-black px-2", className)} ref={ref} {...restProps}/>
})

Input.displayName = "Input"

export const ErrorMessage = ({className, ...restProps}: ComponentProps<"input">) => {
  return <p className={cn("text-xs text-red-700", className)} {...restProps}/>
}