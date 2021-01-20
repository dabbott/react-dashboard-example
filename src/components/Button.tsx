import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, disabled, onClick }: Props) {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
