import { cn, cnExt } from "@/utils/cn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { RiArrowRightLine } from "@remixicon/react";
import * as React from "react";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
const DropdownMenuArrow = DropdownMenuPrimitive.Arrow;

const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 8, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={forwardedRef}
        sideOffset={sideOffset}
        className={cnExt(
          "z-50 w-[300px] overflow-hidden rounded-2xl bg-bg-white-0 p-2 shadow-regular-md ring-1 ring-inset ring-stroke-soft-200",
          "flex flex-col gap-1",
          // origin
          "data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom",
          // animation
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  ),
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.Item
      ref={forwardedRef}
      className={cnExt(
        // base
        "group/item relative cursor-pointer select-none rounded-lg p-2 text-paragraph-sm text-text-strong-950 outline-none",
        "flex items-center gap-2",
        "transition duration-200 ease-out", // hover
        "data-[highlighted]:bg-bg-weak-50", // focus
        "focus:outline-none", // disabled
        "data-[disabled]:text-text-disabled-300",
        inset && "pl-9",
        className,
      )}
      {...rest}
    />
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

function DropdownItemIcon({ className, as, ...rest }) {
  const Component = as || "div";

  return (
    <Component
      className={cnExt(
        // base
        "size-5 text-text-sub-600", // disabled
        "group-has-[[data-disabled]]:text-text-disabled-300",
        className,
      )}
      {...rest}
    />
  );
}
DropdownItemIcon.displayName = "DropdownItemIcon";

const DropdownMenuGroup = React.forwardRef(
  ({ className, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.Group
      ref={forwardedRef}
      className={cnExt("flex flex-col gap-1", className)}
      {...rest}
    />
  ),
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuLabel = React.forwardRef(
  ({ className, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.Label
      ref={forwardedRef}
      className={cnExt(
        "px-2 py-1 text-subheading-xs uppercase text-text-soft-400",
        className,
      )}
      {...rest}
    />
  ),
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={forwardedRef}
      className={cnExt(
        // base
        "group/item relative cursor-pointer select-none rounded-lg p-2 text-paragraph-sm text-text-strong-950 outline-0",
        "flex items-center gap-2",
        "transition duration-200 ease-out", // hover
        "data-[highlighted]:bg-bg-weak-50", // disabled
        "data-[disabled]:text-text-disabled-300",
        inset && "pl-9",
        className,
      )}
      {...rest}
    >
      {children}
      <span className="flex-1" />
      <DropdownItemIcon as={RiArrowRightLine} />
    </DropdownMenuPrimitive.SubTrigger>
  ),
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...rest }, forwardedRef) => (
    <DropdownMenuPrimitive.SubContent
      ref={forwardedRef}
      className={cnExt(
        "z-50 w-max overflow-hidden rounded-2xl bg-bg-white-0 p-2 shadow-regular-md ring-1 ring-inset ring-stroke-soft-200",
        "flex flex-col gap-1",
        // animation
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...rest}
    />
  ),
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn("text-xs ml-auto tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownItemIcon,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuShortcut,
};
