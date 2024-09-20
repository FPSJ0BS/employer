import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { doGetLetterById, doSendMail } from "../../../../../api/apiAxios";

import { CKEditorComponent } from "./CKEditor";
import  CustomizedSnackbar  from "../../../../Reusable Components/Snackbar/snackbar";

// Define the props type
interface ShareModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data:any;
}

// Define the state type for the body
interface BodyContent {
  description: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  closeModal,
  data,
}) => {
  const [tempData, setTempData] = useState<any>({});
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<BodyContent | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] =
    useState<string>("");
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<string>("");

  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendEmail();
  };

  useEffect(() => {
    if (data?.id) {
      const getData = async () => {
        const res:any = await doGetLetterById(data.id);
        if (res.status) {
          setTempData({
            ...res.data.data,
          });
        }
      };
      getData();
    }
  }, [data?.id]);

  const handleSendEmail = async () => {
    setLoading(true); // Start loading
    try {
      const res = await doSendMail({
        letter_id: tempData?.id,
        email_id: recipientEmail,
        subject: subject,
        body_content: typeof body === "string" ? body : body.description,
      });

      if (res?.data?.status) {
        setSnackbarSuccessMessage(res?.data?.message);
        setSnackbarSuccessOpen(true);
        // Reset form fields
        setRecipientEmail("");
        setSubject("");
        setBody("");
        closeModal();
      } else {
        setSnackbarErrorMessage(res?.data?.message);
        setSnackbarErrorOpen(true);
      }
    } catch (error: any) {
      setSnackbarErrorMessage(error?.message);
      setSnackbarErrorOpen(true);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <CustomizedSnackbar
        open={snackbarSuccessOpen}
        autoCloseDuration={4000}
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success"
        backgroundColor="#344e41"
      />
      <CustomizedSnackbar
        open={snackbarErrorOpen}
        autoCloseDuration={4000}
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error"
        backgroundColor="#9d0208"
      />
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            style={{
              color: "#000",
              borderRadius: "89px",
              width: "50px",
              textAlign: "center",
              position: "absolute",
              right: "0px",
              cursor: "pointer",
            }}
            onClick={() => closeModal()}
          >
            X
          </div>
          <h2 id="modal-modal-title" className="mb-4">
            Share via Email
          </h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Recipient Email"
              type="email"
              value={recipientEmail}
              onChange={handleRecipientChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Subject"
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <CKEditorComponent
              setLetterData={setBody}
              letterData={body}
              label="Body"
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              style={{ background: "#1565c0" }}
            >
              Send
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ShareModal;
