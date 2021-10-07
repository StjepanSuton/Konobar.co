import AllDrinksList from "./components/Meals/AllDrinksList";
import Header from "./components/UI/Header";
import { Box } from "@mui/material";
import ShowModal from "./components/Cart/ShowModal";
import { createTheme, ThemeProvider } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#eb4034",
    },
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
            p: 1,
            m: 1,
          }}
        >
          <AllDrinksList />
        </Box>
        <ShowModal></ShowModal>
      </ThemeProvider>
    </div>
  );
}

export default App;
