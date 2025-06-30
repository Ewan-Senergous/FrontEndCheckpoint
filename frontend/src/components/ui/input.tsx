import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,background-color] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "[-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_rgb(232,240,254)]",
          "[-webkit-autofill:focus]:!shadow-[inset_0_0_0px_1000px_rgb(232,240,254)]",
          "[-webkit-autofill:hover]:!shadow-[inset_0_0_0px_1000px_rgb(232,240,254)]",
          type === "file" ? "pt-1.5 font-medium" : "",
          value && value.toString().trim() !== ""
            ? "bg-[rgb(232,240,254)]"
            : "bg-background",
          className
        )}
        ref={ref}
        value={value}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
