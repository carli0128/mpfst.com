"use client";

import * as React from "react";

/**
 * Minimal, dependency-free Tabs implementation compatible with the API used by the site.
 * Preserves: <Tabs defaultValue="..."><TabsList>...<TabsTrigger value="x" />...<TabsContent value="x" />.
 * Adds only mobile behavior: the tab bar becomes a single-row, swipeable container on phones.
 */

// Local utility to merge class names (no external deps)
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type TabsCtx = {
  value: string;
  setValue: (v: string) => void;
  idBase: string;
};

const Ctx = React.createContext<TabsCtx | null>(null);
function useTabsCtx(): TabsCtx {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
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
      <Ctx.Provider value={{ value: current, setValue, idBase }}>
        {children}
      </Ctx.Provider>
      {/* Keep the scrollbar hidden while preserving horizontal swipe */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          // Mobile: single row & horizontal swipe; Desktop: normal layout
          "flex items-center gap-2 w-full max-w-full overflow-x-auto whitespace-nowrap no-scrollbar",
          "md:overflow-visible md:whitespace-normal",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
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
        className={cn(
          // Prevent label wrapping and shrinking on small screens
          "shrink-0 whitespace-nowrap px-3 py-2 text-xs md:text-sm",
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

// Satisfy --isolatedModules
export {};
