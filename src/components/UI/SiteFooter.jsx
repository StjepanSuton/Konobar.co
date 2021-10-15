import React from "react";
import { Box, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Konobar from "../../slike/Konobar.png";
const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

export default function SiteFooter() {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Box
      onClick={(e) => {
        dispatch(uiActions.searchIsClicked(false));
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "space-between",
        width: "100%",
        bgcolor: "primary.main",
      }}
    >
      <Typography className={classes.text} style={{ margin: 3 }}>
        Što je Konobar.co ?
      </Typography>
      <Typography variant="caption" color="secondary" style={{ margin: 3 }}>
        Konobar.co je besplatna aplikacija za narudžbu pića putem interneta koja
        olakšava posao konobaru i smanjuje vrijeme čekanja gostu
      </Typography>
      <Typography className={classes.text} style={{ margin: 3 }}>
        Kako naručiti piće ?
      </Typography>
      <Typography variant="caption" color="secondary" style={{ margin: 3 }}>
        Odaberete piće ili pića koja želite i pričekate da konobar potvrdi vašu
        narudžbu ili možete pozvati konobara pritiskom na naš logo
      </Typography>
      <Typography className={classes.text} style={{ margin: 3 }}>
        Imate pitanja ili ideju kako aplikaciju učiniti boljom ?
      </Typography>
      <Typography variant="caption" color="secondary" style={{ margin: 3 }}>
        Javite se na sutonstjepan@gmail.com sa svim prijedlozima, pohvalama i
        kritikama
      </Typography>
      <Box sx={{ alignSelf: "center" }}>
        <img
          src={Konobar}
          alt="Konobar.co logo"
          style={{ height: 150, width: 250 }}
        />
      </Box>
    </Box>
  );
}
