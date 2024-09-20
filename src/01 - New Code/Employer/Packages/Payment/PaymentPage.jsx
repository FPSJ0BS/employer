
import LoginPopup from "@/components/common/form/login/LoginPopup"
import DashboardHeader from "@/01 - New Code/Headers/DashboardHeader"
import MobileMenu from "@/01 - New Code/Headers/MobileMenu"
import DashboardEmployerSidebar from "@/01 - New Code/Headers/DashboardEmployerSidebar"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

export const PaymentPage = () => {

    const navigate = useNavigate()
    const [orderId, setOrderId] = useState('')

    const [razorpay_payment_idValue, setRazorpay_payment_idValue] = useState('');
    const [razorpay_order_idValue, setRazorpay_order_idValue] = useState('');
    const [razorpay_signatureValue, setRazorpay_signatureValue] = useState('');
    const [amount, setAmount] = useState('');
    const [planId, setPlanId] = useState('');

    useEffect(() => {

        const finAmountValue = singlePlanData?.gst_include_amount;
        const finPlanId = singlePlanData?.plan_id;
        setAmount(finAmountValue);
        setPlanId(finPlanId);


    }, [singlePlanData])

    const razorPayOptions = {
      key: "rzp_live_zulSgy2c3oFT5u", // Enter the Key ID generated from the Dashboard
      amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
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
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#a83359",
      },
    };

    useEffect(() => {

        const gettingSuccessData = async () => {
            if (razorpay_payment_idValue && razorpay_order_idValue && razorpay_signatureValue) {

                completePaymentApi();
                console.log(razorpay_payment_idValue, razorpay_order_idValue, razorpay_signatureValue);

            } else {

                console.error('Missing required properties in the response');

            }
        };

        gettingSuccessData()

    }, [razorpay_payment_idValue, razorpay_order_idValue, razorpay_signatureValue])

    const completePaymentApi = async () => {

        try {

            const res = await postValidatePayment(razorpay_order_idValue, razorpay_signatureValue, razorpay_payment_idValue, planId)
            if (res?.data?.status) {
                console.log(res);
            } else{
                console.log('error');
            }

        } catch (error) {
            console.log(error);
        }


    }




    const handlePayment = async (planId) => {

        navigate(`/employers-dashboard/payment-page/${planId}`)

        try {
            const amoutString = parseInt(amount) * 100
            const res = await postPaymentOrder(amoutString);
            console.log(res);
            if (res?.data?.status) {
                const data = res?.data?.data[0];
                const { order_id } = data;
                const idToString = order_id
                setOrderId(idToString);
                console.log(orderId);
            } else {
                return
            }
        } catch (error) {
            console.log(error);
        }




    }

    useEffect(() => {
        if (orderId) {
            openRazorPay(); // Call openRazorPay only if orderId is truthy
        }
    }, [orderId]);

    const openRazorPay = () => {
        var rzp1 = new window.Razorpay(razorPayOptions);
        rzp1.on('payment.failed', function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
        });

        rzp1.open();

    }
    return (
        <div className="page-wrapper">

            <LoginPopup />
            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

            <DashboardEmployerSidebar />





        </div>
    )
}