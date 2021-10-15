import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Box from "@mui/material/Box";
import { Typography, ListItem } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

export default function FilteredDrinks(props) {
  const classes = useStyles();
  console.log();

  const dispatch = useDispatch();
  const { title, price, id, mjera, key } = props;
  const addItemHandler = (e) => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        mjera,
      })
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <ListItem>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Typography
            className={classes.text}
          >{`${title} / ${mjera}`}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography className={classes.text}>{`${price}kn`}</Typography>
            <motion.div onClick={addItemHandler} whileTap={{ scale: 2.2 }}>
              <IconButton>
                <AddCircleOutlinedIcon />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      </ListItem>
    </div>
  );
}
