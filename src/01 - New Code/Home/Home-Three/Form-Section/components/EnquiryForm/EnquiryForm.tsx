import React, { useState } from "react";
import { OrganizationName } from "../InputFields/Enquiry/OrganizationName";
import { EmailId } from "../InputFields/Enquiry/EmailID";
import { FirstName } from "../InputFields/Enquiry/FirstName";
import { LastName } from "../InputFields/Enquiry/LastName";
import { Industry } from "../InputFields/Enquiry/Industry";
import { postEnquiryForm, postPhoneOtpRegistrationAxios } from "../../../../../../api/apiAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAuthRegister } from "../../../../../Employer/Redux/Authentication";
import { MobileNumber } from "../InputFields/Enquiry/MobileNumber";
import { EnquiryDescription } from "../InputFields/Enquiry/EnquiryDescription";
import { SalesCity } from "../InputFields/Enquiry/SalesCity";
import { YourRole } from "../InputFields/Enquiry/YourRole";
import { CompanySize } from "../InputFields/Enquiry/CompanySize";

const EnquiryForm = ({
  setSnackbarSuccessMessage,
  setSnackbarSuccessOpen,
  setSnackbarErrorMessage,
  setSnackbarErrorOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sales_company_name: "",
    sales_email: "",
    person_first_name: "",
    sales_subject: "",
    sales_city: "",
    industry: null,
    password: "",
    sales_phone: null,
    sales_message: "",
    person_job_role: "",
    company_size: "",
  });

  const registerFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setLoaderState(true);
    try {
      const response = await postEnquiryForm({
        sales_email: formData.sales_email,
        sales_company_name: formData.sales_company_name,
        person_first_name: formData.person_first_name,
        sales_subject: formData.sales_subject,
        sales_phone: formData.sales_phone,
        sales_city: formData.sales_city,
        sales_message: formData.sales_message,
        person_job_role: formData.person_job_role,
        company_size: formData.company_size,
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
          sales_company_name: "",
          sales_email: "",
          person_first_name: "",
          sales_subject: "",
          sales_message: "",
          sales_city: "",
          person_job_role: "",
          company_size: "",
          industry: null,
          sales_phone: null,
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
      className=" grid grid-cols-2 gap-4 w-full "
    >
      <OrganizationName formData={formData} setFormData={setFormData} />
      <EmailId formData={formData} setFormData={setFormData} />
      <MobileNumber formData={formData} setFormData={setFormData} />
      <FirstName formData={formData} setFormData={setFormData} />
      <LastName formData={formData} setFormData={setFormData} />
      <SalesCity formData={formData} setFormData={setFormData} />
      <YourRole formData={formData} setFormData={setFormData} />
      <CompanySize formData={formData} setFormData={setFormData} />
      <EnquiryDescription formData={formData} setFormData={setFormData} />
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
