import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material/";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { provider, fprovider, auth } from "../firebase/firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { uiActions } from "../../store/ui-slice";
import CircularProgress from "@mui/material/CircularProgress";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function User() {
  const dispatch = useDispatch();
  const userIsLoading = useSelector((state) => state.ui.userIsLoading);
  //GoogleSignIn
  const signInwithGoogle = () => {
    setAnchorEl(null);
    dispatch(uiActions.userIsLoadingHandler("true"));
    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  };
  //FacebookSignIn
  const signInWithFacebook = () => {
    setAnchorEl(null);
    dispatch(uiActions.userIsLoadingHandler("true"));
    signInWithRedirect(auth, fprovider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  };
  //
  //Handeling Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    dispatch(userActions.logOutUser());
    setAnchorEl(null);
  };

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result === null) {
        return;
      } else {
        dispatch(
          userActions.logInUser({
            token: result.user.accessToken,
            user: result.user.displayName,
            photoURL: result.user.photoURL,
          })
        );
        dispatch(uiActions.userIsLoadingHandler("false"));
      }
    });
  }, []);
  //
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const photoURL = useSelector((state) => state.user.userPhoto);
  return (
    <div style={{ marginRight: 10 }}>
      {userIsLoading === "true" ? (
        <div>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          {isLoggedIn === true || isLoggedIn === "true" ? (
            <div>
              <IconButton
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="secondary"
                onClick={handleClick}
              >
                <Avatar alt="user" src={photoURL} />
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
                <MenuItem>Profil</MenuItem>
                <MenuItem>Kartica vjernosti: 10🌅</MenuItem>
                <MenuItem onClick={logOutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="secondary"
                onClick={handleClick}
              >
                <AccountCircleIcon fontSize="large" />
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
                <MenuItem onClick={signInwithGoogle}>
                  <GoogleIcon size="small" style={{ paddingRight: 5 }} />
                  Login with google
                </MenuItem>
                <MenuItem onClick={signInWithFacebook}>
                  <FacebookIcon size="small" style={{ paddingRight: 5 }} />{" "}
                  Login with facebook
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
