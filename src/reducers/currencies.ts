import { InfoResource } from "../resources";

const INITIAL_RESOURCES: InfoResource[] = [
  {
    id: 1,
    symbol: "BTC",
    price: "18713.24",
    title: "Bitcoin",
    content:
      "The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.",
    links: [
      { url: "/", title: "Official website" },
      { url: "/", title: "Whitepaper" },
    ],
  },
  {
    id: 2,
    symbol: "ETH",
    price: "512.56",
    title: "Ethereum",
    content:
      "Ethereum is both a cryptocurrency and a decentralized computing platform. Developers can use the platform to create decentralized applications and issue new crypto assets, known as Ethereum tokens.",
    links: [
      { url: "/", title: "Official website" },
      { url: "/", title: "Whitepaper" },
    ],
  },
  {
    id: 3,
    symbol: "XRP",
    price: "0.32",
    title: "XRP",
    content:
      "XRP is the cryptocurrency used by the Ripple payment network. Built for enterprise use, XRP aims to be a fast, cost-efficient cryptocurrency for cross-border payments.",
    links: [
      { url: "/", title: "Official website" },
      { url: "/", title: "Whitepaper" },
    ],
  },
  {
    id: 4,
    symbol: "LINK",
    price: "14.29",
    title: "Chainlink",
    content:
      "Chainlink (LINK) is an Ethereum token that powers the Chainlink decentralized oracle network. This network allows smart contracts on Ethereum to securely connect to external data sources, APIs, and payment systems.",
    links: [
      { url: "/", title: "Official website" },
      { url: "/", title: "Whitepaper" },
    ],
  },
];

/**
 * A reducer takes the current state and an action object and returns
 * a new state (reference identity of the state object MUST change!)
 */
export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "select":
      return state.map((item) =>
        action.id === item.currency.id
          ? { ...item, selected: !item.selected }
          : item
      );
    case "delete":
      return state.filter((item) => !item.selected);
  }
}

/**
 * What should the types of our state and action be?
 */
type State = { currency: InfoResource; selected: boolean }[];
type Action = { type: "select"; id: number } | { type: "delete" };

/*
 * What shape should the initial state be?
 * We want to keep track of an array of InfoResource items, AND also
 * whether each one is selected or not
 */
export const initialState: State = INITIAL_RESOURCES.map((resource) => ({
  currency: resource,
  selected: false,
}));

// export const actionCreators = {
//   select: (id: number): Action => ({ type: "select", id }),
//   delete: (): Action => ({ type: "delete" })
// };
