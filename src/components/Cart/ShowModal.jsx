import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import CartItem from "./CartItem";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { useMediaQuery } from "@mui/material";
import { cartActions } from "../../store/cart-slice";
import ChildModal from "./ChildModal";

export default function ShowModal() {
  const matches = useMediaQuery("(max-width: 400px)");
  const [showOrder, setShowOrder] = useState(false);

  const showModal = useSelector((state) => state.ui.cartIsVisible);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches === true ? 330 : 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const totalCartPrice = useSelector((state) => state.cart.totalItemsPrice);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeAllHandler = () => {
    dispatch(cartActions.removeAllItems());
    dispatch(uiActions.toggle());
  };

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const openOrderWindowHandler = (a) => {
    setShowOrder(!showOrder);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={toggleCartHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Vaša Košarica
            </Typography>
            <div
              style={{
                maxHeight: matches === true ? 240 : 300,
                overflow: "auto",
              }}
            >
              <List>
                <Box
                  id="transition-modal-description"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={{
                        id: item.id,
                        title: item.name,
                        quantity: item.quantity,
                        total: item.totalPrice,
                        price: item.price,
                        titleEng: item.titleEng,
                      }}
                    />
                  ))}
                </Box>
              </List>
            </div>
            <Grid container>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                {totalCartPrice === 0 ? (
                  ""
                ) : (
                  <Button
                    fullWidth
                    size="small"
                    onClick={openOrderWindowHandler}
                    variant="contained"
                    color="primary"
                  >
                    {`Naruči ${totalCartPrice} kn`}
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} style={{ paddingRight: 4 }}>
                <Button
                  fullWidth
                  size="small"
                  onClick={toggleCartHandler}
                  variant="outlined"
                >
                  Zatvori prozor
                </Button>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: 4 }}>
                {totalCartPrice === 0 ? (
                  ""
                ) : (
                  <Button
                    fullWidth
                    size="small"
                    onClick={removeAllHandler}
                    variant="outlined"
                  >
                    Isprazni košaricu
                  </Button>
                )}
              </Grid>
            </Grid>
            {showOrder && (
              <ChildModal
                openOrderWindowHandler={openOrderWindowHandler}
                openModal={showOrder}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
