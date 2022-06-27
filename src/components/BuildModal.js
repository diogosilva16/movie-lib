import React from "react";
import { Modal, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {md: "80vw", xs: "100vw"},
  height: {md: "80vh", xs: "50vh"},
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
      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${props.videoId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
      </Box>
    </Modal>
  );
};

export default BuildModal;
