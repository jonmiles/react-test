import { ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  disabled = false,
  onClick = () => undefined,
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, { [styles.disabled]: disabled })}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
}
