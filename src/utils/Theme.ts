import { createContext } from "react";

export type Theme = {
  name: "light" | "dark";
  className: string;
  backgroundColor: string;
  textColor: string;
};

export const lightTheme: Theme = {
  name: "light",
  className: "theme--light",
  backgroundColor: "white",
  textColor: "black",
};

export const darkTheme: Theme = {
  name: "dark",
  className: "theme--dark",
  backgroundColor: "black",
  textColor: "white",
};

export const ThemeContext = createContext(lightTheme);
