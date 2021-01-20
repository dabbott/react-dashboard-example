import React, { useReducer } from "react";
import { BASE_URL } from "../App";
import { reducer } from "../reducers/currencies";
import { InfoResource } from "../resources";
import { useResource } from "../utils/resource";
import Button from "./Button";
import Feed from "./List";
import { HorizontalSpacer } from "./Spacer";

export default function Currencies() {
  const currencies = useResource<InfoResource[]>(`${BASE_URL}/info`);

  const [items, dispatch] = useReducer(
    reducer,
    currencies.map((resource) => ({
      currency: resource,
      selected: false,
    }))
  );
  // const [items, dispatch] = useReducer(reducer, initialState);

  return (
    <Feed>
      <h2>Currencies</h2>
      {items.map((item) => (
        <div
          key={item.currency.id}
          className="row"
          style={{
            backgroundColor: item.selected ? "lightblue" : "transparent",
          }}
        >
          <div className="column">
            <h2>{item.currency.title}</h2>
            <p>{item.currency.price}</p>
          </div>
          <HorizontalSpacer />
          <Button
            onClick={() => {
              dispatch({ type: "select", id: item.currency.id });
            }}
          >
            {item.selected ? "Deselect" : "Select"}
          </Button>
        </div>
      ))}
      <Button
        disabled={!items.some((item) => item.selected)}
        onClick={() => {
          dispatch({ type: "delete" });
        }}
      >
        Remove selected
      </Button>
    </Feed>
  );
}
