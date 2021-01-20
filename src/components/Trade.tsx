import React, { useState } from "react";
import Block from "./Block";
import Tabs from "./Tabs";
import useNumericValue from "../hooks/useNumericValue";
import Button from "./Button";
import { VerticalSpacer } from "./Spacer";
import styles from "./Trade.module.css";

interface ConvertProps {
  title: string;
  exchangeRate: string;
}

function Convert({ title, exchangeRate }: ConvertProps) {
  const { amount, displayAmount, setAmount } = useNumericValue(exchangeRate);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="0"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      ></input>
      <p>Enter an amount</p>
      <VerticalSpacer size={24} />
      <Button>
        {title} {displayAmount ? `${displayAmount} BTC` : ""}
      </Button>
    </div>
  );
}

interface Props {
  title: string;
  price: string;
}

export default function Trade({ title, price }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Block>
      <h2>{title}</h2>
      <VerticalSpacer size={12} />
      <Tabs
        tabs={[
          {
            title: "Buy",
            content: <Convert title="Buy" exchangeRate={price} />,
          },
          {
            title: "Sell",
            content: <Convert title="Sell" exchangeRate={price} />,
          },
          {
            title: "Convert",
            content: <Convert title="Convert" exchangeRate={price} />,
          },
        ]}
        selectedIndex={selectedIndex}
        onChangeSelectedIndex={setSelectedIndex}
      />
    </Block>
  );
}
