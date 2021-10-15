import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

const CartItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, quantity, price, id, mjera } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const addItemHandler = () => {
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
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        p: 0.9,
        m: 0.9,
      }}
      style={{ maxHeight: 300, overflow: "auto" }}
      elevation={9}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Typography
            className={classes.text}
          >{`${title}/${mjera}`}</Typography>
        </Box>
        <Typography>kn{price.toFixed(2)}</Typography>
      </Box>

      <Box
        sx={{
          flexGrow: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography className={classes.text} style={{ margin: 5 }}>
          {`x${quantity}`}
        </Typography>
        <IconButton
          size="small"
          style={{ margin: 5 }}
          variant="contained"
          onClick={removeItemHandler}
        >
          <RemoveCircleIcon />
        </IconButton>
        <IconButton size="small" variant="contained" onClick={addItemHandler}>
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CartItem;
