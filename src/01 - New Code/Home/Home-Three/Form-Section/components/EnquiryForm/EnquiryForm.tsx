import React, { useState } from "react";
import { OrganizationName } from "../InputFields/Enquiry/OrganizationName";
import { EmailId } from "../InputFields/Enquiry/EmailID";
import { FirstName } from "../InputFields/Enquiry/FirstName";
import { LastName } from "../InputFields/Enquiry/LastName";
import { Industry } from "../InputFields/Enquiry/Industry";
import { postPhoneOtpRegistrationAxios } from "../../../../../../api/apiAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAuthRegister } from "../../../../../Employer/Redux/Authentication";
import { setLogin } from "../../../../../../redux/Login/loginSlice.jsx";
import { Password } from "../InputFields/Enquiry/Password";

const EnquiryForm = ({
  setSnackbarSuccessMessage,
  setSnackbarSuccessOpen,
  setSnackbarErrorMessage,
  setSnackbarErrorOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    organizationName: "",
    EmailId: "",
    firstName: "",
    lastName: "",
    industry: null,
    password: "",
  });

  const registerFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setLoaderState(true);
    try {
      const response = await postPhoneOtpRegistrationAxios({
        email_id: formData.EmailId,
        institute_name: formData.organizationName,
        person_first_name: formData.firstName,
        person_last_name: formData.lastName,
        nt_id: formData.industry,
        password: "test@123A",
        lead: 1,
      });
      if (response?.data?.status) {
        // const header = response?.data?.data[0];
        // await localStorage.setItem("header", JSON.stringify(header));
        // await dispatch(setLogin(true));

        const message = "Registration Successful!";

        // setLoaderState(false);
        const hash = response?.data?.data[0];
        dispatch(
          postAuthRegister({
            hash,
          })
        );
        // const data: WalletDataInterface = {
        //   dateTransaction: String(new Date()),
        //   typeTransaction: "Bonus Coins",
        //   Status: "Credit",
        //   amountCoins: "100",
        //   currentBalance: "100",
        //   purchasedCoins: "0",
        //   bonusCoins: "100",
        // };
        // localStorage.setItem("wallet", JSON.stringify(data));
        //  localStorage.setItem("walletData", JSON.stringify([data]));

        // dispatch(setWalletData(data));
        const onSuccessMessage = "Thank you, we will be in touch shortly!";
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);

        setFormData({
          ...formData,
          organizationName: "",
          EmailId: "",
          firstName: "",
          lastName: "",
          industry: null,
        });

        // setTimeout(() => {
        //   dispatch(openAdminModal("true"));
        //   setTimer(30);
        // }, 500);
        // navigate("/manage-profile");
      } else {
        console.log("response?.data");
        const errMessage = await response?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
        // setLoaderState(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // setLoaderState(false);
    }
  };

  return (
    <form
      onSubmit={(e) => registerFormSubmit(e)}
      className=" flex flex-col gap-4 w-full "
    >
      <OrganizationName formData={formData} setFormData={setFormData} />
      <EmailId formData={formData} setFormData={setFormData} />
      <FirstName formData={formData} setFormData={setFormData} />
      <LastName formData={formData} setFormData={setFormData} />
      <Industry formData={formData} setFormData={setFormData} />
      {/* <Password formData={formData} setFormData={setFormData} /> */}
      <div className=" w-full flex items-center justify-center">
        <button
          type="submit"
          className=" w-[80%] bg-[#D94452] h-[40px] text-white rounded-[30px] font-semibold text-[16px]"
        >
          Send Enquiry
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;
