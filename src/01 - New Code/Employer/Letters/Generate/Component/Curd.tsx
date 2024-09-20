import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { CKEditorComponent } from "./CKEditor";

import CustomizedButtons from "../../../../Reusable Components/Button/Button";
import AppInput from "../../../../Reusable Components/AppInput/AppInput";
import {
  doUpdateLetter,
  doAddLetter,
  doGetLetterById,
  doGetTemplate,
  doGetLetter,
} from "../../../../../api/apiAxios";
import CustomizedSnackbar from "../../../../Reusable Components/Snackbar/snackbar";
import Loader from "../../../../../../public/assets/Loader";
import useCustomLoader from "@/hooks/useLoader";
import ReusableSelect from "../../../../Reusable Components/ReusableSelect/ReusableSelect";
import { useDispatch } from "react-redux";
import { setLetterData } from "../../../Redux/Latter";
import { SnackbarProvider } from "notistack";
import html2pdf from "html2pdf.js";

import AvailableVariables from "../../../../Reusable Components/AvailableVariables/AvailableVariables";
import ShareModal from "./ShareModal";

const Curd = ({ onClose, data, handleOpenModal }: any) => {
  const [letData, setLetData] = useState<any>({
    templateID: "",
    faculity_name: "",
    description: "",
  });

  const [templateData, setTemplateData] = useState<any>([]);
  const [liveLetterChange, setLiveLetterChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");
  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };
  const [letterTitle, setTitle] = useState("");
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const [isLoading, setLoader] = useCustomLoader(false);
  const dispatch = useDispatch();
  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  const _options =
    templateData &&
    templateData.length > 0 &&
    templateData?.map((item: any) => {
      return { value: item.id, label: item.title };
    });
  const variables: any = {
    CURRENT_DATE: "",
    EMPLOYEE_ID: "",
    EMPLOYEE_NAME: "faculity_name",
    EMPLOYEE_ADDRESS: "",
    EMPLOYEE_JOINING_DATE: "",
    EMPLOYEE_EXIT_DATE: "",
    EMPLOYEE_PROBATION_END_DATE: "",
    EMPLOYEE_NOTICE_PERIOD_START_DATE: "",
    EMPLOYEE_NOTICE_PERIOD_END_DATE: "",
    EMPLOYEE_DOB: "",
    EMPLOYEE_DEPARTMENT: "",
    EMPLOYEE_DESIGNATION: "",
    SIGNATORY: "",
    SIGNATORY_DESIGNATION: "",
    SIGNATORY_DEPARTMENT: "",
    COMPANY_NAME: "",
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (data?.pageName === "Edit" && data?.id) {
      try {
        const res: any = await doUpdateLetter(
          { ...letData, send_mail: false },
          data?.id
        );

        if (res?.data?.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          onClose();
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
        const res: any = await doAddLetter(letData);
        if (res.data.status) {
          const onSuccessMessage = res?.data?.message;
          setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          onClose();
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
    const getData = async () => {
      const res: any = await doGetTemplate();
      if (res.status) {
        const _data = res?.data?.data?.filter?.((item: any) => {
          return item?.status !== 0;
        });
        setTemplateData(_data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (data?.id) {
      const getData = async () => {
        const res: any = await doGetLetterById(data?.id);
        if (res?.data?.status) {
          const _dataxcx =
            templateData &&
            templateData.length > 0 &&
            templateData.filter((item: any) => {
              return item?.id === res?.data?.data?.templateID;
            });
          setTitle(_dataxcx?.[0]?.title);

          setLetData({
            ...letData,
            faculity_name: res?.data?.data?.faculity_name,
            templateID: res?.data?.data?.templateID,
            description: res?.data?.data?.description,
          });
        }
      };
      getData();
    }
  }, [data?.id, templateData]);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const _dataxcx =
      templateData &&
      templateData.length > 0 &&
      templateData.filter((item: any) => {
        return item?.id === event.target.value;
      });
    console.log(_dataxcx?.[0]?.id);

    setLetData({
      ...letData,
      templateID: _dataxcx?.[0]?.id as unknown,
      description: _dataxcx?.[0]?.description,
    });
  };

  useEffect(() => {
    const findPlaceholders = (text: any) => {
      const regex = /##(.*?)##/g;
      let matches = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
      }
      return matches;
    };
    const placeholders: any = findPlaceholders(letData?.description);

    let letter = letData?.description;
    placeholders.forEach((placeholder: string) => {
      if (letData?.[variables[placeholder]]) {
        const placeholderRegex = new RegExp(`##${placeholder}##`, "g");
        letter = letter.replace(
          placeholderRegex,
          letData?.[variables[placeholder]]
        );
      }
    });
    console.log({ letter, desc: letData?.description });
    setLiveLetterChange(letter);
  }, [letData]);

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
    element.innerHTML = liveLetterChange;
    element.style.width = "100%";
    element.style.boxSizing = "border-box";
    element.style.padding = "1cm";
    html2pdf().from(element).set(opt).save("letter.pdf");
  };

  const handlePrint = () => {
    var ifrm = document.createElement("iframe");
    document.body.appendChild(ifrm);
    ifrm.style.height = "0px";
    ifrm.style.width = "0px";
    ifrm.style.position = "absolute";
    var pri: any = ifrm.contentWindow;
    pri.document.open();
    pri.document.write(liveLetterChange);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <>
      {!loading ? (
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
          <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h5" sx={{ marginBottom: 3 }}>
              {data?.id
                ? data?.pageName === "View"
                  ? "Show Letter "
                  : "Edit Letter "
                : "Add Letter "}
            </Typography>
            <Grid container spacing={3}>
              {data?.pageName === "View" ? (
                <>
                  <Grid item xs={12}>
                    <Box
                      sx={{ padding: 2, backgroundColor: "#fff", boxShadow: 1 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">Letter Details</Typography>
                        <Box sx={{ display: "flex" }} gap={2}>
                          <CustomizedButtons
                            children={"Download"}
                            variant="contained"
                            color="error"
                            style={{ background: "#dd4975" }}
                            onClick={exportPdf}
                          />
                          <CustomizedButtons
                            children={"Print"}
                            variant="contained"
                            color="success"
                            style={{ background: "#000" }}
                            onClick={handlePrint}
                          />
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        {letterTitle}
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: liveLetterChange,
                        }}
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <Box
                      sx={{ padding: 2, backgroundColor: "#fff", boxShadow: 1 }}
                    >
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Letter Details
                      </Typography>
                      <form onSubmit={(e) => onSubmit(e)}>
                        <ReusableSelect
                          label="Select an Option"
                          value={letData?.templateID}
                          onChange={handleSelectChange}
                          options={_options || []}
                          disabled={data?.id}
                        />
                        {/* <Select label={"Employees"} /> */}
                        <AppInput
                          labelName={"Employee Name"}
                          type="text"
                          name="faculity_name"
                          value={letData?.faculity_name}
                          onChange={(e) => {
                            setLetData({
                              ...letData,
                              faculity_name: e.target.value as unknown,
                            });
                          }}
                          disabled={data?.id}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "green", marginBottom: 2 }}
                        >
                          Adjust space setting (in pixel)
                        </Typography>
                        <Grid
                          container
                          spacing={2}
                          flex={"flex"}
                          flexWrap={"wrap"}
                          justifyContent={"space-between"}
                        >
                          <Grid item xs={3}>
                            <AppInput
                              labelName={"Left"}
                              defaultValue="20"
                              id="bootstrap-input"
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <AppInput
                              labelName={"Right"}
                              defaultValue="20"
                              id="bootstrap-input"
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <AppInput
                              labelName={"Top"}
                              defaultValue="20"
                              id="bootstrap-input"
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <AppInput
                              labelName={"Bottom"}
                              defaultValue="20"
                              id="bootstrap-input"
                              type="number"
                            />
                          </Grid>
                        </Grid>
                        <CKEditorComponent
                          setLetterData={setLetData}
                          letterData={letData}
                        />
                        <SnackbarProvider maxSnack={3}>
                          <AvailableVariables />
                        </SnackbarProvider>
                        <Box mt={2} display="flex" gap={2}>
                          <CustomizedButtons
                            children={"Cancel"}
                            variant="outlined"
                            color="error"
                            onClick={onClose}
                          />
                          <CustomizedButtons
                            children={
                              data?.pageName === "Edit" ? "Update" : "Save"
                            }
                            variant="outlined"
                            style={{ borderColor: "#000", color: "#000" }}
                            type="submit"
                            loading={loading}
                          />
                          {data?.pageName === "Edit" && (
                            <CustomizedButtons
                              children={"Share"}
                              variant="outlined"
                              style={{ borderColor: "#000", color: "#000" }}
                              type="submit"
                              loading={loading}
                              onClick={() => {
                                handleOpenModal();
                              }}
                            />
                          )}
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        padding: 3,
                        backgroundColor: "#fff",
                        boxShadow: 1,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                          Preview Letter
                        </Typography>
                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                          gap={2}
                        >
                          <CustomizedButtons
                            children={"Download"}
                            variant="contained"
                            color="error"
                            style={{ background: "#dd4975" }}
                            onClick={exportPdf}
                            // disabled={!_data?.[0]?.description}
                          />
                          <CustomizedButtons
                            children={"Print"}
                            variant="contained"
                            color="success"
                            style={{ background: "#000" }}
                            // disabled={!_data?.[0]?.description}
                            onClick={handlePrint}
                          />
                        </Box>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          mt: "12px",
                          fontSize: "16px",
                        }}
                      >
                        {letterTitle}
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: liveLetterChange,
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Curd;
