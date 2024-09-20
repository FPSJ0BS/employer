import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CKEditorComponent } from "./CKEditor";
import CustomizedButtons from "../../../../Reusable Components/Button/Button";
import AppInput from "../../../../Reusable Components/AppInput/AppInput";
import useCustomLoader from "@/hooks/useLoader";

import Loader from "../../../../../../public/assets/Loader";
import CustomizedSnackbar from "../../../../Reusable Components/Snackbar/snackbar";
import {
  doAddTemplate,
  doGetTemplate,
  doGetTemplateById,
  doUpdateTemplate,
} from "../../../../../api/apiAxios";
import { useDispatch } from "react-redux";
import { setTemplateData } from "../../../Redux/Latter";
import { SnackbarProvider } from "notistack";
import AvailableVariables from "../../../../Reusable Components/AvailableVariables/AvailableVariables";
const Curd = ({ onClose, data }: any) => {
  const [tempData, setTempData] = useState({
    title: "",
    description: "",
  });

  const [isLoading, setLoader] = useCustomLoader(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");
  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");

  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };
  const dispatch = useDispatch();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (data?.pageName === "Edit" && data?.id) {
      try {
        const res: any = await doUpdateTemplate(tempData, data?.id);
        console.log(res);
        if (res?.data?.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          onClose();
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
          onClose();
        }
      } catch (error) {
        console.log(error);
        const onErrorMessage: any = error;
        console.log(onErrorMessage, ".....");
        setSnackbarErrorMessage(onErrorMessage?.message);
        setSnackbarErrorOpen(true);
        onClose();
      }
    } else {
      try {
        const res: any = await doAddTemplate(tempData);
        if (res.data.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          onClose();
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
          onClose();
        }
      } catch (error) {
        console.log(error);
        const onErrorMessage: any = error;
        console.log(onErrorMessage, ".....");
        setSnackbarErrorMessage(onErrorMessage?.message);
        setSnackbarErrorOpen(true);
        onClose();
      }
    }
  };
  useEffect(() => {
    if (data?.id) {
      setLoader(true);
      const getData = async () => {
        const res: any = await doGetTemplateById(data?.id);
        if (res.status) {
          setTempData({
            title: res?.data?.data?.[0]?.title,
            description: res?.data?.data?.[0]?.description,
          });
          setLoader(false);
        }
      };
      getData();
    }
  }, [data?.id]);
  function createMarkup() {
    return { __html: tempData?.description };
  }

  return (
    <>
      {!isLoading ? (
        <>
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
          <Typography id="modal-title" variant="h6" component="h2">
            {data?.id
              ? data?.pageName === "View"
                ? "Show Template "
                : "Edit Template "
              : "Add Template "}
          </Typography>
          <div className="bg-white h-full mt-3 p-3">
            {/* <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="mb-3"
            >
              {data?.id
                ? data?.pageName === "View"
                  ? "Show Template "
                  : "Edit Template "
                : "Add Template "}
            </Typography> */}
            {data?.pageName === "View" ? (
              <>
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h5"
                  className="mb-3 text-center"
                >
                  {tempData?.title}
                </Typography>
                <div dangerouslySetInnerHTML={createMarkup()} />
              </>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <form onSubmit={(e) => onSubmit(e)} style={{ width: "55%" }}>
                  <AppInput
                    value={tempData?.title}
                    labelName={"Title"}
                    type="text"
                    required
                    onChange={(e) => {
                      setTempData({
                        ...tempData,
                        title: e.target.value,
                      });
                    }}
                  />
                  <CKEditorComponent
                    setTemplateData={setTempData}
                    templateData={tempData}
                  />
                  <Box mt={2} display="flex" gap={2}>
                    <CustomizedButtons
                      children={"Cancel"}
                      variant="outlined"
                      color="error"
                      onClick={onClose}
                    />
                    <CustomizedButtons
                      children={data?.pageName === "Edit" ? "Update" : "Save"}
                      variant="outlined"
                      style={{ borderColor: "#000", color: "#000" }}
                      type="submit"
                    />
                  </Box>
                </form>
                <div style={{ width: "35%" }}>
                  <SnackbarProvider maxSnack={3}>
                    <AvailableVariables />
                  </SnackbarProvider>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Curd;
