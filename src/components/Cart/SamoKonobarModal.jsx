import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function SamoKonobar(props) {
  const [loading, setLoading] = useState(false);
  const open = props.openModal;

  const handleCloseHandler = () => {
    props.openOrderWindowHandler();
  };
  const loader = <ClimbingBoxLoader loading={loading} size={10} />;

  useEffect(() => {
    if (open === true) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 6500);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={open}
        onClose={handleCloseHandler}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {loading === true ? (
          <Box sx={{ ...style, width: 240 }}>
            <h4 id="child-modal-title">Čekanje na odgovor konobara</h4>
            {loader}
          </Box>
        ) : (
          <Box sx={{ ...style, width: 240 }}>
            <h2 id="child-modal-title">
              Konobar će uskoro biti tu da vam ispuni želje
            </h2>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCloseHandler}
            >
              Zatvori prozor
            </Button>
          </Box>
        )}
      </Modal>
    </React.Fragment>
  );
}
