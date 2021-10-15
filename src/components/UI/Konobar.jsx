import React, { useState } from "react";
import Konobarco from "../../slike/KonobarBijelo.png";
import { Menu, IconButton } from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";
import SamoKonobar from "../Cart/SamoKonobarModal";

export default function Konobar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openOrderWindowHandler = (a) => {
    setAnchorEl(null);
    setShowOrder(!showOrder);
  };
  return (
    <div>
      <IconButton
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="secondary"
        onClick={handleClick}
      >
        <img style={{ width: 220 }} src={Konobarco} alt="Konobarco" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openOrderWindowHandler}>Pozovi konobara</MenuItem>
      </Menu>
      <SamoKonobar
        openOrderWindowHandler={openOrderWindowHandler}
        openModal={showOrder}
      />
    </div>
  );
}
