// src/components/SlidingModal.tsx
import React, { useEffect, useRef } from "react";
import { Box, Modal } from "@mui/material";
import { gsap } from "gsap";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  right: 0,
  transform: "translateY(-50%)",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 2,
  width: "80%",
  height: "100vh",
  overflow: "auto",
};

interface SlidingModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

const SlidingModal: React.FC<SlidingModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        modalRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box ref={modalRef} sx={style}>
        <div
          style={{
            background: "#dd4975",
            color: "#fff",
            borderRadius: "89px",
            width: "50px",
            textAlign: "center",
            position: "absolute",
            right: "0px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </div>
        {children}
      </Box>
    </Modal>
  );
};

export default SlidingModal;
