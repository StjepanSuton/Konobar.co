import AllDrinksList from "./components/Drinks/AllDrinksList";
import React from "react";
import Header from "./components/UI/Header";
import { Box } from "@mui/material";
import ShowModal from "./components/Cart/ShowModal";
import FAB from "./components/UI/FAB";
import SiteFooter from "./components/UI/SiteFooter";
import { createTheme, ThemeProvider } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0058db",
    },
    secondary: { main: "#ffffff" },
  },
  typography: {
    fontFamily: "Glory",
  },
});

function App() {
  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AllDrinksList />
        </Box>
        <ShowModal></ShowModal>
        <FAB />
        <SiteFooter />
      </ThemeProvider>
    </div>
  );
}

export default App;
