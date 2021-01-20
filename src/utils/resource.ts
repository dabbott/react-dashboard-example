import fetchData from "./fetchData";
import { SuspendedValue } from "./SuspendedValue";

const cache: { [key: string]: any } = {};

export function useResource<T>(url: string): T {
  if (!(url in cache)) {
    cache[url] = new SuspendedValue<T>(fetchData(url));
  }

  return cache[url].unwrappedValue;
}
