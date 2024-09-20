import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import MobileMenu from "../../../01 - New Code/Headers/MobileMenu";
import Breadcrumb from "../../../components/shop/Breadcrumb";
import BillingAll from "./components";
import ShopHeader from "../../../01 - New Code/Headers/ShopHeader";
import { useState, useEffect } from "react";
import { postValidatePayment, postPaymentOrder, getProfile } from "../../../api/apiAxios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { CheckoutModal } from './components/Modal.tsx'
import DashboardHeader from "../../../01 - New Code/Headers/DashboardHeader";
import { openCheckoutModal } from "../../../01 - New Code/Employer/Redux/EmployerPackages.tsx";
import { useDispatch } from "react-redux";


const Index = () => {

  const [empName, setEmpName] = useState('')
  const [empNumber, setEmpNumber] = useState('')
  const [empEmail, setEmpEmail] = useState('')


  const { employerPackageFields } = useSelector(
    (state) => state.employerPackages
  );


  const [paymentSuccesful, setPaymentSuccessful] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res?.data?.status) {

          const { name, mobile, email } = res.data.data.userData || {};

          setEmpName(name)
          setEmpEmail(email)
          setEmpNumber(mobile)
          


        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProfile()


  }, [])

  const { modalCheckout } = useSelector(
    (state) => state.employerPackages
  );
  

  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  const [razorpay_payment_idValue, setRazorpay_payment_idValue] = useState("");
  const [razorpay_order_idValue, setRazorpay_order_idValue] = useState("");
  const [razorpay_signatureValue, setRazorpay_signatureValue] = useState("");
  const [amount, setAmount] = useState("");
  const [planId, setPlanId] = useState("");

  const { singlePlanData } = useSelector((state) => state.employerPackages);

  const razorPayOptions = {
    key: "rzp_live_zulSgy2c3oFT5u",
    // key: "rzp_live_eoNE0pukX4o3zA", 
    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "FPS JOBS",
    description: "Live Transaction",
    image: "https://rzp-mobile.s3.amazonaws.com/images/rzp.png",
    order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response) {
      // console.log(response.razorpay_payment_id);
      // console.log(response.razorpay_order_id);
      // console.log(response.razorpay_signature);
      await setRazorpay_payment_idValue(response.razorpay_payment_id);
      await setRazorpay_order_idValue(response.razorpay_order_id);
      await setRazorpay_signatureValue(response.razorpay_signature);
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: empName, //your customer's name
      email: empEmail,
      contact: empNumber, //Provide the customer's phone number for better conversion rates
    },
    theme: {
      color: "#a83359",
    },
  };

  useEffect(() => {
    const gettingSuccessData = async () => {
      if (
        razorpay_payment_idValue &&
        razorpay_order_idValue &&
        razorpay_signatureValue
      ) {
        completePaymentApi();
        // console.log("payment ID", razorpay_payment_idValue);
        // console.log("order ID value", razorpay_order_idValue);
        // console.log("signature", razorpay_signatureValue);
      } else {
        console.error("Missing required properties in the response");
      }
    };

    gettingSuccessData();
  }, [
    razorpay_payment_idValue,
    razorpay_order_idValue,
    razorpay_signatureValue,
  ]);

  const completePaymentApi = async () => {
    try {
      const res = await postValidatePayment(
        razorpay_order_idValue,
        razorpay_signatureValue,
        razorpay_payment_idValue,
        singlePlanData?.singlePlanData?.id.toString(),
        employerPackageFields,
      );
      if (res?.data?.status) {
        
        await dispatch(openCheckoutModal());
        await setPaymentSuccessful(true);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {

    try {
      const amountString = parseInt(employerPackageFields.price) * 100;
      const res = await postPaymentOrder(amountString);
      if (res?.data?.status) {
        const data = await res?.data?.data[0];
        const { order_id } = data;
        const idToString = await order_id;
        await setOrderId(idToString);
        const price = await employerPackageFields.price.toString()
        await setAmount(price)
      } else {
        return;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      openRazorPay(); // Call openRazorPay only if orderId is truthy
    }
  }, [orderId]);

  const openRazorPay = () => {
    var rzp1 = new window.Razorpay(razorPayOptions);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  

  return (
    <>
      {modalCheckout && <CheckoutModal paymentSuccesful={paymentSuccesful} setPaymentSuccessful={setPaymentSuccessful} />}
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      {!modalCheckout && <DashboardHeader />}
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!--End Page Title--> */}

      {/* <!--CheckOut Page--> */}
      <section className="checkout-page ">
        <div className="auto-container">
          <BillingAll handlePayment={handlePayment} />
        </div>
      </section>
      {/* <!--End CheckOut Page--> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
