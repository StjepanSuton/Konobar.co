import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

export default function DrinksList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { title, price, id } = props;
  console.log();

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <List>
      <motion.div whileTap={{ scale: 1.1 }}>
        <div onClick={addItemHandler}>
          <ListItem>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexGrow: 1,
              }}
            >
              <Typography
                className={classes.text}
              >{`${title} ${price}kn`}</Typography>
            </Box>
            <IconButton>
              <AddCircleOutlinedIcon />
            </IconButton>
          </ListItem>
        </div>
      </motion.div>
    </List>
  );
}
