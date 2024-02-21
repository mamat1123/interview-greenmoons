import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { store } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App name="StackBlitz" />
      </ThemeProvider>
    </StrictMode>
  </Provider>
);
