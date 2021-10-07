import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function Header() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <AppBar
      position="sticky"
      style={{
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "sapce-between",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KONOBAR.CO
        </Typography>
        <Button size="large" color="inherit" onClick={toggleCartHandler}>
          <Badge badgeContent={cartQuantity} color="error">
            <ShoppingCartRoundedIcon />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
