import { recursiveCloneChildren } from "@/utils/recursive-clone-children";
import { tv } from "@/utils/tv";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const INPUT_ROOT_NAME = "InputRoot";
const INPUT_WRAPPER_NAME = "InputWrapper";
const INPUT_EL_NAME = "InputEl";
const INPUT_ICON_NAME = "InputIcon";
const INPUT_AFFIX_NAME = "InputAffixButton";
const INPUT_INLINE_AFFIX_NAME = "InputInlineAffixButton";

export const inputVariants = tv({
  slots: {
    root: [
      // base
      "group relative flex w-full overflow-hidden bg-bg-white-0 text-text-strong-950 shadow-regular-xs",
      "transition duration-200 ease-out",
      "divide-x divide-stroke-soft-200",
      // before
      "before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-stroke-soft-200",
      "before:pointer-events-none before:rounded-[inherit]",
      "before:transition before:duration-200 before:ease-out",
      // hover
      "hover:shadow-none",
      // focus
      "has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950",
      // disabled
      "has-[input:disabled]:shadow-none has-[input:disabled]:before:ring-transparent",
    ],
    wrapper: [
      // base
      "group/input-wrapper flex w-full cursor-text items-center bg-bg-white-0",
      "transition duration-200 ease-out",
      // hover
      "group-hover/input-wrapper:not(:focus-within):hover:bg-bg-weak-50 hover:bg-bg-weak-50",
      // disabled
      "has-[input:disabled]:pointer-events-none has-[input:disabled]:bg-bg-weak-50",
    ],
    input: [
      // base
      "w-full bg-transparent bg-none text-paragraph-sm text-text-strong-950 outline-none",
      "transition duration-200 ease-out",
      // placeholder
      "placeholder:select-none placeholder:text-text-soft-400 placeholder:transition placeholder:duration-200 placeholder:ease-out",
      // hover placeholder
      "group-hover/input-wrapper:placeholder:text-text-sub-600",
      // focus
      "focus:outline-none",
      // focus placeholder
      "group-has-[input:focus]:placeholder:text-text-sub-600",
      // disabled
      "disabled:text-text-disabled-300 disabled:placeholder:text-text-disabled-300",
    ],
    icon: [
      // base
      "flex size-5 shrink-0 select-none items-center justify-center",
      "transition duration-200 ease-out",
      // placeholder state
      "group-has-[:placeholder-shown]:text-text-soft-400",
      // filled state
      "text-text-sub-600",
      // hover
      "group-hover/input-wrapper:not(:focus-within):group-has-[:placeholder-shown]:text-text-sub-600",
      // focus
      "group-has-[input:focus]/input-wrapper:text-text-sub-600",
      // disabled
      "group-has-[input:disabled]/input-wrapper:text-text-disabled-300",
    ],
    affix: [
      // base
      "shrink-0 bg-bg-white-0 text-paragraph-sm text-text-sub-600",
      "flex items-center justify-center truncate",
      "transition duration-200 ease-out",
      // placeholder state
      "group-has-[:placeholder-shown]:text-text-soft-400",
      // focus state
      "group-has-[input:focus]:text-text-sub-600",
    ],
    inlineAffix: [
      // base
      "text-paragraph-sm text-text-sub-600",
      // placeholder state
      "group-has-[:placeholder-shown]:text-text-soft-400",
      // focus state
      "group-has-[input:focus]:text-text-sub-600",
    ],
  },
  variants: {
    size: {
      medium: {
        root: "rounded-10",
        wrapper: "gap-2 px-3",
        input: "h-10",
      },
      small: {
        root: "rounded-lg",
        wrapper: "gap-2 px-2.5",
        input: "h-9",
      },
      xsmall: {
        root: "rounded-lg",
        wrapper: "gap-1.5 px-2",
        input: "h-8",
      },
    },
    hasError: {
      true: {
        root: [
          // base
          "before:ring-error-base",
          // hover
          "hover:before:ring-error-base",
          // focus
          "has-[input:focus]:shadow-button-error-focus has-[input:focus]:before:ring-error-base",
        ],
      },
      false: {
        root: [
          // hover
          "hover:before:ring-transparent",
        ],
      },
    },
  },
  compoundVariants: [
    //#region affix
    {
      size: "medium",
      class: {
        affix: "px-3",
      },
    },
    {
      size: ["small", "xsmall"],
      class: {
        affix: "px-2.5",
      },
    },
    //#endregion
  ],
  defaultVariants: {
    size: "medium",
  },
});

function InputRoot({ className, children, size, hasError, asChild, ...rest }) {
  const uniqueId = React.useId();
  const Component = asChild ? Slot : "div";

  const { root } = inputVariants({
    size,
    hasError,
  });

  const sharedProps = {
    size,
    hasError,
  };

  const extendedChildren = recursiveCloneChildren(
    children,
    sharedProps,
    [
      INPUT_WRAPPER_NAME,
      INPUT_EL_NAME,
      INPUT_ICON_NAME,
      INPUT_AFFIX_NAME,
      INPUT_INLINE_AFFIX_NAME,
    ],
    uniqueId,
    asChild,
  );

  return (
    <Component className={root({ class: className })} {...rest}>
      {extendedChildren}
    </Component>
  );
}
InputRoot.displayName = INPUT_ROOT_NAME;

function InputWrapper({
  className,
  children,
  size,
  hasError,
  asChild,
  ...rest
}) {
  const Component = asChild ? Slot : "label";

  const { wrapper } = inputVariants({
    size,
    hasError,
  });

  return (
    <Component className={wrapper({ class: className })} {...rest}>
      {children}
    </Component>
  );
}
InputWrapper.displayName = INPUT_WRAPPER_NAME;

const Input = React.forwardRef(
  (
    { className, type = "text", size, hasError, asChild, ...rest },
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "input";

    const { input } = inputVariants({
      size,
      hasError,
    });

    return (
      <Component
        type={type}
        className={input({ class: className })}
        ref={forwardedRef}
        {...rest}
      />
    );
  },
);
Input.displayName = INPUT_EL_NAME;

function InputIcon({ size, hasError, as, className, ...rest }) {
  const Component = as || "div";
  const { icon } = inputVariants({ size, hasError });

  return <Component className={icon({ class: className })} {...rest} />;
}
InputIcon.displayName = INPUT_ICON_NAME;

function InputAffix({ className, children, size, hasError, ...rest }) {
  const { affix } = inputVariants({
    size,
    hasError,
  });

  return (
    <div className={affix({ class: className })} {...rest}>
      {children}
    </div>
  );
}
InputAffix.displayName = INPUT_AFFIX_NAME;

function InputInlineAffix({ className, children, size, hasError, ...rest }) {
  const { inlineAffix } = inputVariants({
    size,
    hasError,
  });

  return (
    <span className={inlineAffix({ class: className })} {...rest}>
      {children}
    </span>
  );
}
InputInlineAffix.displayName = INPUT_INLINE_AFFIX_NAME;

export {
  InputRoot,
  InputWrapper,
  Input,
  InputIcon,
  InputAffix,
  InputInlineAffix,
};
