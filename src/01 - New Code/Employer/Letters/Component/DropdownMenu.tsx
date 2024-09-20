// DropdownMenu.tsx
import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedSnackbar from "../../../Reusable Components/Snackbar/snackbar";
import ConfirmationModal from "./ConfirmationModal";
import {
  doDeleteLetter,
  doDeleteTemplate,
  doGetLetter,
  doGetTemplate,
} from "../../../../api/apiAxios";
import { setLetterData, setTemplateData } from "../../Redux/Latter";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import ShareIcon from "@mui/icons-material/Share";
import useCustomLoader from "@/hooks/useLoader";
import ShareModal from "../Generate/Component/ShareModal";
interface IDropdownMenu {
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  template: boolean;
  openModal: (value: any) => void;
  data: any;
}
const DropdownMenu = ({
  anchorEl,
  setAnchorEl,
  template = true,
  openModal,
  data,
}: IDropdownMenu) => {
  const { letterHtml } = useSelector((state: any) => state.letter);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");
  const [isLoading, setLoader] = useCustomLoader(false);
  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleConfirm = async () => {
    // Handle the delete action here
    if (template) {
      try {
        const res: any = await doDeleteTemplate(data?.id);
        if (res.data.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          setOpenConfirmationModal(false);
          const getData = async () => {
            setLoader(true);
            const res: any = await doGetTemplate();
            if (res.status) {
              const _data = res?.data?.data?.filter?.((item: any) => {
                return item?.status !== 0;
              });
              dispatch(setTemplateData(_data));

              setLoader(false);
            }
          };
          getData();
        } else {
          const onErrorMessage = res?.data?.message;
          setSnackbarErrorMessage(onErrorMessage);
          setSnackbarErrorOpen(true);
          setOpenConfirmationModal(false);
        }
      } catch (error) {
        console.log(error);
        const onErrorMessage: any = error;
        console.log(onErrorMessage, ".....");
        setSnackbarErrorMessage(onErrorMessage?.message);
        setSnackbarErrorOpen(true);
        setOpenConfirmationModal(false);
      }
    } else {
      try {
        const res: any = await doDeleteLetter(data?.id);
        if (res.data.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          setOpenConfirmationModal(false);
          const getData = async () => {
            setLoader(true);
            const res: any = await doGetLetter();
            if (res.status) {
              const _data = res?.data?.data?.filter?.((item: any) => {
                return item?.status !== 0;
              });
              dispatch(setLetterData(_data));

              setLoader(false);
            }
          };
          getData();
        } else {
          const onErrorMessage = res?.data?.message;
          setSnackbarErrorMessage(onErrorMessage);
          setSnackbarErrorOpen(true);
          setOpenConfirmationModal(false);
        }
      } catch (error) {
        console.log(error);
        const onErrorMessage: any = error;
        setSnackbarErrorMessage(onErrorMessage?.message);
        setSnackbarErrorOpen(true);
        setOpenConfirmationModal(false);
      }
    }
  };
  const opt = {
    margin: 0, // Accepts numbers (measured in cm)
    filename: "letter.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  const exportPdf = () => {
    const element = document.createElement("div");
    element.innerHTML = letterHtml;
    element.style.width = "100%";
    element.style.boxSizing = "border-box";
    element.style.padding = "1cm";
    html2pdf().from(element).set(opt).save("letter.pdf");
  };

  return (
    <div>
      <CustomizedSnackbar
        open={snackbarSuccessOpen}
        w
        autoCloseDuration={4000} // milliseconds
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success" // or 'success', 'warning', 'info'
        backgroundColor="#344e41" // Custom background color
      />

      <CustomizedSnackbar
        open={snackbarErrorOpen}
        autoCloseDuration={4000} // milliseconds
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error" // or 'success', 'warning', 'info'
        backgroundColor="#9d0208" // Custom background color
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            openModal("View");
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
        {!template && (
          <>
            <MenuItem
              onClick={() => {
                handleClose();
                exportPdf();
              }}
            >
              <ListItemIcon>
                <GetAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Download" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleOpenModal();
              }}
            >
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </MenuItem>
          </>
        )}

        <MenuItem
          onClick={() => {
            handleClose();
            openModal("Edit");
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmationModal(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
      <ConfirmationModal
        open={openConfirmationModal}
        handleClose={() => setOpenConfirmationModal(false)}
        handleConfirm={handleConfirm}
      />
      <ShareModal
        isOpen={modalOpen}
        closeModal={handleCloseModal}
        data={data}
      />
    </div>
  );
};

export default DropdownMenu;
