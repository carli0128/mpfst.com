"use client";

import * as React from "react";

/**
 * Dependency‑free Tabs that keeps the original look:
 *  - Underlined active tab
 *  - Subtle hover color
 *  - No global CSS required
 *  - Mobile-safe: triggers don't wrap or shrink; no page overflow
 *
 * API matches your existing usage:
 *   <Tabs defaultValue="overview">
 *     <TabsList className="grid grid-cols-6 mb-6">
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       ...
 *     </TabsList>
 *     <TabsContent value="overview">...</TabsContent>
 *   </Tabs>
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Ctx = {
  value: string;
  setValue: (v: string) => void;
  idBase: string;
};
const TabsCtx = React.createContext<Ctx | null>(null);
function useTabsCtx(): Ctx {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs.* must be used within <Tabs>");
  return ctx;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...rest
}) => {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string>(defaultValue ?? "");
  const current = controlled ? (value as string) : inner;
  const idBase = React.useId();
  const setValue = React.useCallback(
    (v: string) => {
      if (!controlled) setInner(v);
      onValueChange?.(v);
    },
    [controlled, onValueChange]
  );
  return (
    <div className={className} {...rest}>
      <TabsCtx.Provider value={{ value: current, setValue, idBase }}>
        {children}
      </TabsCtx.Provider>
    </div>
  );
};

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      role="tablist"
      // Keep whatever layout you pass (grid/flex), but ensure it never
      // forces page overflow on phones. If the grid is wider than the
      // viewport, the strip will scroll *inside itself*.
      className={cn(
        "w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]",
        className
      )}
      {...rest}
    >
      <div className="no-scrollbar">{children}</div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, onClick, ...rest }, ref) => {
    const { value: active, setValue, idBase } = useTabsCtx();
    const isActive = active === value;
    const tabId = `${idBase}-tab-${value}`;
    const panelId = `${idBase}-panel-${value}`;

    return (
      <button
        ref={ref}
        id={tabId}
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        data-state={isActive ? "active" : "inactive"}
        // Style to match your original simple tabs: gray text, blue underline when active
        className={cn(
          // prevent wrapping/shrinking on mobile
          "shrink-0 whitespace-nowrap",
          // spacing and typography close to the original
          "px-3 py-2 text-xs md:text-sm font-normal transition-colors",
          // base color and hover
          "text-gray-300 hover:text-white",
          // underline style
          "border-b-2 border-transparent data-[state=active]:border-blue-500",
          // active color
          "data-[state=active]:text-white",
          className
        )}
        onClick={(e) => {
          setValue(value);
          onClick?.(e);
        }}
        {...rest}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...rest }, ref) => {
    const { value: active, idBase } = useTabsCtx();
    const isActive = active === value;
    const tabId = `${idBase}-tab-${value}`;
    const panelId = `${idBase}-panel-${value}`;

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        data-state={isActive ? "active" : "inactive"}
        hidden={!isActive}
        className={cn("mt-2 focus-visible:outline-none", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export {};
