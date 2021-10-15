import React, { useEffect } from "react";
import { Typography, Toolbar, AppBar, Rating } from "@mui/material";
import Exhibeo from "../../slike/Exhibeo.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import User from "./User";
import Konobar from "./Konobar";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
toast.configure();

export default function Header() {
  const dispatch = useDispatch();
  //Toast
  const mostRecentItem = useSelector((state) => state.cart.mostRecentItem);
  useEffect(() => {
    const notify = () =>
      toast.info(`${mostRecentItem.title} dodana u košaricu`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    if (mostRecentItem.title === undefined) {
      return;
    } else {
      notify();
    }
  }, [mostRecentItem]);

  return (
    <div
      onClick={(e) => {
        dispatch(uiActions.searchIsClicked(false));
      }}
    >
      <AppBar
        position="static"
        style={{
          flexGrow: 1,
          height: 80,
        }}
      >
        <Toolbar
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <Konobar />
          <User />
        </Toolbar>
      </AppBar>
      <div
        style={{
          position: "relative",
          textAlign: "center",
        }}
      >
        <img
          src={Exhibeo}
          alt="Exhibeo bar"
          style={{
            width: "100%",
            height: 200,
            zIndex: -10,
            overflow: "hidden",
          }}
        />
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 5,
            bottom: 2,
            zIndex: 1,
            backgroundColor: "#090909aa",
          }}
        >
          <Typography variant="h6" color="secondary">
            Dobrodošli u Caffe Bar Exhibeo
          </Typography>
          <Typography variant="legend" color="secondary">
            Ocjena:
          </Typography>
          <Rating
            style={{ paddingBottom: 5 }}
            size="small"
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
