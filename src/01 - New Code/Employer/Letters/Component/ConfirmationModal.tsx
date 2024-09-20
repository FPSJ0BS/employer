import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box sx={style}>
        <WarningAmberIcon style={{ fontSize: 60, color: "#ffa117" }} />
        <Typography
          id="confirmation-modal-title"
          variant="h6"
          component="h2"
          sx={{ mt: 2 }}
        >
          Are you sure?
        </Typography>
        <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
          You will not be able to recover the deleted record!
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            style={{ background: "#c62828" }}
          >
            Yes, Delete It!
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
