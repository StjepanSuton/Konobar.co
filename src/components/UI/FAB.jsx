import React from "react";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { motion } from "framer-motion";

export default function FAB() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <div>
      {cartQuantity === 0 || cartQuantity === null ? (
        ""
      ) : (
        <motion.div
          animate={{
            opacity: 1,
          }}
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Fab
            onClick={toggleCartHandler}
            color="primary"
            aria-label="add"
            style={{
              margin: 0,
              top: "auto",
              right: 20,
              bottom: 20,
              left: "auto",
              position: "fixed",
            }}
          >
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartRoundedIcon />
            </Badge>
          </Fab>
        </motion.div>
      )}
    </div>
  );
}
