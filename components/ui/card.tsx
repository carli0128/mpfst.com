import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-700 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}