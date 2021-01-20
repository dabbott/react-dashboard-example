import React, { ReactNode } from "react";
import { VerticalSpacer } from "./Spacer";
import styles from "./Tabs.module.css";

export interface Tab {
  title: string;
  content: ReactNode;
}

interface Props {
  tabs: Tab[];
  selectedIndex: number;
  onChangeSelectedIndex: (index: number) => void;
}

export default function Tabs({
  tabs,
  selectedIndex,
  onChangeSelectedIndex,
}: Props) {
  const tabButtons = tabs.map((tab, index) => {
    return (
      <button
        className={styles.tab}
        aria-selected={index === selectedIndex}
        key={index}
        role={"tab"}
        onClick={() => {
          onChangeSelectedIndex(index);
        }}
      >
        {tab.title}
      </button>
    );
  });

  return (
    <div>
      <div>{tabButtons}</div>
      <hr />
      <VerticalSpacer size={20} />
      <div>{tabs[selectedIndex].content}</div>
    </div>
  );
}
