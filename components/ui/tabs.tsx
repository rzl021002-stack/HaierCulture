import React from "react";
import {
  Tabs as TabsPrimitive,
  TabsContent as TabsContentPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
} from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsListPrimitive>,
  React.ComponentPropsWithoutRef<typeof TabsListPrimitive>
>(({ className, ...props }, ref) => (
  <TabsListPrimitive
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-900 p-1 text-slate-400 ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsListPrimitive.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTriggerPrimitive>,
  React.ComponentPropsWithoutRef<typeof TabsTriggerPrimitive>
>(({ className, ...props }, ref) => (
  <TabsTriggerPrimitive
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsTriggerPrimitive.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof TabsContentPrimitive>
>(({ className, ...props }, ref) => (
  <TabsContentPrimitive
    ref={ref}
    className={`mt-2 ring-offset-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsContentPrimitive.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
