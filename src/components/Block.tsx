import React from "react";
import styles from "./Block.module.css";

interface Props {
  children?: React.ReactNode;
}

export default function Block({ children }: Props) {
  return <div className={styles.block}>{children}</div>;
}
