import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    let variantClasses = "";
    if (variant === "default") {
      variantClasses = "bg-blue-600 hover:bg-blue-700 text-white";
    } else if (variant === "outline") {
      variantClasses = "border border-gray-500 text-white hover:bg-gray-700";
    } else if (variant === "ghost") {
      variantClasses = "bg-transparent hover:bg-gray-800 text-white";
    }

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded font-semibold transition-colors ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
