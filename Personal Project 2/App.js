import React from "react";
import { AppProvider } from "./src/appContext";
import Home from "./src/home";

export default function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}