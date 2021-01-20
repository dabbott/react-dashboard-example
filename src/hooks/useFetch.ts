import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";
import { PromiseState } from "../utils/PromiseState";

export default function useFetch<T>(url: string): PromiseState<T> {
  const [state, setState] = useState<PromiseState<T>>({ type: "pending" });

  useEffect(() => {
    let isStale = false;

    async function getInfo() {
      try {
        const data = await fetchData<T>(url);

        if (isStale) return;

        setState({ type: "success", value: data });
      } catch (error) {
        if (isStale) return;

        setState({ type: "failure", value: error });
      }
    }

    getInfo();

    return () => {
      isStale = true;
    };
  }, [url]);

  return state;
}
