import { createContext } from "react";

export type Theme = {
  className: string;
  primary: string;
  text: string;
  textMuted: string;
  textHint: string;
  divider: string;
  background: string;
};

export const lightTheme: Theme = {
  className: "theme--light",
  primary: "rgb(22, 82, 240)",
  text: "rgb(5, 15, 25)",
  textMuted: "rgba(17, 51, 83, 0.6)",
  textHint: "rgba(17, 51, 83, 0.3)",
  divider: "rgb(236, 239, 241)",
  background: "rgb(255, 255, 255)",
};

export const darkTheme: Theme = {
  className: "theme--dark",
  primary: "rgb(22, 82, 240)",
  text: "white",
  textMuted: "rgba(255, 255, 255, 0.85)",
  textHint: "rgba(255, 255, 255, 0.5)",
  divider: "rgb(35, 35, 35)",
  background: "rgb(17, 17, 17)",
};

export const ThemeContext = createContext(lightTheme);
