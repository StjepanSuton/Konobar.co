import AllDrinksList from "./components/Drinks/AllDrinksList";
import React from "react";
import Header from "./components/UI/Header";
import { Box } from "@mui/material";
import ShowModal from "./components/Cart/ShowModal";
import FAB from "./components/UI/FAB";
import SiteFooter from "./components/UI/SiteFooter";
import { createTheme, ThemeProvider } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import konobar from "./slike/Konobar.png";
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
  const matches = useMediaQuery("(max-width:1050px)");

  return (
    <div style={{ width: "100%" }}>
      {matches === true ? (
        <ThemeProvider theme={theme}>
          <Header></Header>
          <Box
            sx={{
              flexgrow: 1,
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
      ) : (
        <p
          style={{
            display: "flex",
            margin: 0,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            fontSize: 40,
          }}
        >
          This site is intended for mobile users please enter the mobile mode in
          developer options in your browser and reload the page or open the app
          in your mobile device browser
          <img src={konobar} alt="konobar" />
        </p>
      )}
    </div>
  );
}

export default App;
