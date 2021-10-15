import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material/";
import FilteredDrinks from "../Drinks/FilteredDrinks";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
//Kupus teški al radi sve

//Serch Config
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.4),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchTab(props) {
  const dispatch = useDispatch();
  const isClicked = useSelector((state) => state.ui.searchIsClicked);

  const [searchTerm, setSearchTerm] = useState("");
  const loadedDrinksGroup = [];
  for (const key in props.drinks) {
    loadedDrinksGroup.push({
      id: props.drinks[key].id,
      drinks: props.drinks[key].drinks,
      title: props.drinks[key].title,
    });
  }
  let drama = [];
  //Sva pića
  const loadedDrinksList = loadedDrinksGroup.map((item) => {
    for (const key in item.drinks) {
      drama.push({
        title: item.drinks[key].title,
        price: item.drinks[key].price,
        id: item.drinks[key].id,
        mjera: item.drinks[key].mjera,
      });
    }
    return item.drinks;
  });
  const renderedList = drama
    .filter((val) => {
      if (searchTerm === "") {
        return;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map((val) => {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <FilteredDrinks
            key={val.id}
            title={val.title}
            price={val.price}
            mjera={val.mjera}
            id={val.id}
          />
        </Box>
      );
    });
  //onBlur nešto neće pa ovo ako se klikne van searcha
  useEffect(() => {
    if (isClicked === false) {
      setSearchTerm("");
    } else {
      return;
    }
  }, [isClicked]);

  return (
    <AppBar
      id="form"
      position="sticky"
      onFocus={(e) => {
        dispatch(uiActions.searchIsClicked(true));
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Pretraži pića"
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </Search>
      <div
        style={{
          maxHeight: 150,
          overflow: "auto",
        }}
      >
        <Paper>{renderedList}</Paper>
      </div>
    </AppBar>
  );
}
