import React, { useState } from "react";
import DrinksList from "./DrinkList";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { CardActionArea, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={9} square {...props} />
))(({ theme }) => ({
  border: `0.5px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

export default function DrinksGroup(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const [open, setIsOpen] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setIsOpen(!open);
    setExpanded(open ? panel : false);
  };
  const loadedDrinksList = [];
  for (const key in props.drinks) {
    loadedDrinksList.push({
      id: props.drinks[key].id,
      mjera: props.drinks[key].mjera,
      mjeraEng: props.drinks[key].mjeraEng,
      title: props.drinks[key].title,
      titleEng: props.drinks[key].titleEng,
      price: props.drinks[key].price,
    });
  }

  const drinkList = loadedDrinksList.map((drink) => (
    <DrinksList
      key={drink.id}
      id={drink.id}
      title={drink.title}
      titleEng={drink.titleEng}
      price={drink.price}
      mjera={drink.mjera}
      mjeraEng={drink.mjeraEng}
    />
  ));

  return (
    <div style={{ paddingTop: 20 }}>
      <Card>
        <CardActionArea onClick={handleChange("panel1")}>
          <CardMedia
            component="img"
            height="90"
            image={props.img}
            alt="green iguana"
          />
        </CardActionArea>
      </Card>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary>
          <Box sx={{ display: "flex" }}>
            <Typography
              className={classes.text}
            >{`${props.title}/`}</Typography>{" "}
            <Typography>{props.titleEng}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            <List>{drinkList}</List>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
