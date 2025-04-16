import { recursiveCloneChildren } from "@/utils/recursive-clone-children";
import { tv } from "@/utils/tv";
import * as React from "react";

const HINT_ROOT_NAME = "HintRoot";
const HINT_ICON_NAME = "HintIcon";

export const hintVariants = tv({
  slots: {
    root: "group flex items-center gap-1 text-paragraph-xs text-text-sub-600",
    icon: "size-4 shrink-0 text-text-soft-400",
  },
  variants: {
    disabled: {
      true: {
        root: "text-text-disabled-300",
        icon: "text-text-disabled-300",
      },
    },
    hasError: {
      true: {
        root: "text-error-base",
        icon: "text-error-base",
      },
    },
  },
});

function HintRoot({ children, hasError, disabled, className, ...rest }) {
  const uniqueId = React.useId();
  const { root } = hintVariants({ hasError, disabled });

  const sharedProps = {
    hasError,
    disabled,
  };

  const extendedChildren = recursiveCloneChildren(
    children,
    sharedProps,
    [HINT_ICON_NAME],
    uniqueId,
  );

  return (
    <div className={root({ class: className })} {...rest}>
      {extendedChildren}
    </div>
  );
}
HintRoot.displayName = HINT_ROOT_NAME;

function HintIcon({ as, className, hasError, disabled, ...rest }) {
  const Component = as || "div";
  const { icon } = hintVariants({ hasError, disabled });

  return <Component className={icon({ class: className })} {...rest} />;
}
HintIcon.displayName = HINT_ICON_NAME;

export { HintRoot as Hint, HintIcon };
