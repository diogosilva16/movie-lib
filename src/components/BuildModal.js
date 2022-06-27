import React from "react";
import { Modal, Box, Grid, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "80vw", xs: "100vw" },
  height: { md: "80vh", xs: "50vh" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const BuildModal = (props) => {
  return (
    <Modal
      open={props.openPortal}
      onClose={props.openPortal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.videoId != "" ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${props.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <Grid container sx={{height: "100%", width: "100%"}} justifyContent="center" alignItems="center">
              <Typography variant="h2">No video available.</Typography>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default BuildModal;
