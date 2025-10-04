"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal, dependency-free Tabs implementation compatible with the API used by the site.
 * It preserves your markup: <Tabs defaultValue="..."><TabsList>...<TabsTrigger value="x" />...
 * and <TabsContent value="x" />. No external libraries required.
 */

type Ctx = {
  value: string;
  setValue: (v: string) => void;
  idBase: string;
};

const TabsCtx = React.createContext<Ctx | null>(null);

function useTabsCtx(): Ctx {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs> root");
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
      {/* Tiny global helper so the tab bar can swipe without showing a scrollbar */}
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

// Keep TS happy with --isolatedModules
export {};
