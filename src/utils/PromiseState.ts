export type PromiseState<T> =
  | {
      type: "pending";
    }
  | {
      type: "success";
      value: T;
    }
  | {
      type: "failure";
      value: Error;
    };
