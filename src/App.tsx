import React from "react";
import "./App.css";
import DishForm from "./components/DishForm/DishForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <DishForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
