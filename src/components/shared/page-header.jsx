import { cn } from "@/utils/cn";
import * as React from "react";

const PageHeader = React.forwardRef(
  ({ borderless = false, className, ...props }, ref) => (
    <div
      className={cn(!borderless && "sticky top-0 z-10 border-b bg-bg-white-0")}
    >
      <div
        ref={ref}
        className={cn("container flex justify-between gap-3 py-2", className)}
        {...props}
      />
    </div>
  ),
);
PageHeader.displayName = "PageHeader";

const PageHeaderContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3", className)}
    {...props}
  />
));
PageHeaderContent.displayName = "PageHeaderContent";

const PageIcon = React.forwardRef(({ className, as, ...props }) => {
  const Component = as || "div";
  return (
    <Component
      className={cn("size-12 rounded-full border p-3", className)}
      {...props}
    />
  );
});
PageIcon.displayName = "PageIcon";

const PageHeaderInfo = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
PageHeaderInfo.displayName = "PageHeaderInfo";

const PageTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("font-medium", className)} {...props} />
));
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-paragraph-sm text-text-sub-600", className)}
    {...props}
  />
));
PageDescription.displayName = "PageDescription";

const PageQuickActions = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
PageQuickActions.displayName = "PageQuickActions";

export {
  PageHeader,
  PageHeaderContent,
  PageIcon,
  PageHeaderInfo,
  PageTitle,
  PageDescription,
  PageQuickActions,
};
