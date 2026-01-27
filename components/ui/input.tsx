/**
 * @file Input - Shadcn UI input component.
 * @description Renders a styled single-line text input. Includes built-in
 * password visibility toggle: when type="password", an eye open/closed icon
 * allows the user to toggle between masked and plain text display.
 *
 * @props Accepts all native HTMLInputElement attributes including:
 *   - type {string} - Input type; "password" enables visibility toggle.
 *   - placeholder {string} - Placeholder text.
 *   - disabled {boolean} - Disables the input.
 *   - className {string} - Additional CSS classes.
 *
 * @dependencies
 *   - @radix-ui/react-icons (EyeClosedIcon, EyeOpenIcon) - Password toggle icons.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
import * as React from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Styled text input with optional password visibility toggle. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
            {showPassword ? (
              <EyeOpenIcon
                className="h-5 w-5"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeClosedIcon
                className="h-5 w-5"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
