import { useState } from "react";

export default function useConvertedValue(
  exchangeRate: string
): {
  amount: string;
  displayAmount: string;
  setAmount: (value: string) => void;
} {
  const [amount, setAmount] = useState("");

  const convertToBTC = (usdAmount: string) => {
    const price = parseFloat(usdAmount);

    if (isNaN(price)) {
      return " - (not 0)";
    }

    return (
      usdAmount && (price / parseFloat(exchangeRate)).toPrecision(3) + " BTC"
    );
  };

  return {
    amount,
    displayAmount: convertToBTC(amount),
    setAmount: (value: string) => {
      if (value !== "" && isNaN(parseFloat(value))) return;

      setAmount(value);
    },
  };
}
