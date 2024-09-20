import PropTypes from 'prop-types';
import CrossIcon from '../../../../../public/assets/icons/remove.png';
import checkPng from '../../../../../public/assets/icons/check.png'
import './ModalPAckage.scss'
import { postPaymentOrder } from '@/api/apiAxios';
import { useEffect, useState } from 'react';
import { postValidatePayment } from '@/api/apiAxios';
import { useNavigate } from 'react-router';
import ReactHtmlParser from 'react-html-parser';


export const ModalPackage = ({ setShowMoreData, singlePlanData }) => {
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState('')

    const [razorpay_payment_idValue, setRazorpay_payment_idValue] = useState('');
    const [razorpay_order_idValue, setRazorpay_order_idValue] = useState('');
    const [razorpay_signatureValue, setRazorpay_signatureValue] = useState('');
    const [amount, setAmount] = useState('');
    const [planId, setPlanId] = useState('');

    useEffect(() => {

        const finAmountValue = singlePlanData?.national_price;
        const finPlanId = singlePlanData?.id;
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
                console.log('payment ID', razorpay_payment_idValue);
                console.log('order ID value', razorpay_order_idValue);
                console.log('signature', razorpay_signatureValue);

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
                navigate(`/employers-dashboard/post-jobs`)
                console.log(res);
            } else {
                console.log('error');
            }

        } catch (error) {
            console.log(error);
        }


    }


    const handlePayment = async (planId) => {

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
        < >
            <div className="scrollHere ml-[-50px] overflow-y-auto flex flex-col gap-[20px] justify-start items-center shadow-md  py-[50px]  bg-white border-2 border-gray-400 border-solid fixed top-[100px] rounded-[20px] z-10
            
                h-[400px]
                xl:h-[500px]
                md:w-[750px]
                w-[300px]
                xl:w-[900px] xl:ml-[0px]
            ">

                <div onClick={() => setShowMoreData(false)} className="absolute right-2 top-2">
                    <img className="cursor-pointer h-[50px] w-[50px]" src={CrossIcon} alt="Close Modal" />
                </div>

                <button onClick={() => handlePayment(singlePlanData?.plan_id)} className="absolute left-2 top-2 bg-mainBgColor px-[40px] py-[10px] text-white rounded-lg mt-[30px]">Buy Plan</button>

                <div>
                    <h2 className=' text-[25px] font-semibold underline'>{singlePlanData?.plan_title}</h2>
                </div>

                <div className=" grid 
                    grid-cols-1
                    sm:grid-cols-3 sm:gap-x-[20px] 
                    mt-[30px] 
                    gap-y-4
                ">

                    <div className=" flex justify-start items-center gap-2 w-auto">
                        <img height='25px' width='25px' src={checkPng} />
                        <p>Package Type:</p><span className=" font-semibold">{singlePlanData?.emp_type.charAt(0).toUpperCase() + singlePlanData?.emp_type.slice(1)}</span>
                    </div>

                    <div className=" flex justify-start items-center gap-2 w-auto">
                        <img height='25px' width='25px' src={checkPng} />
                        <p>Plan Price:</p><span className=" font-semibold">₹{singlePlanData?.national_price}</span>
                    </div>


                </div>

                <div>
                    {singlePlanData?.national_package?.map((item, index) => {
                        return (
                            <div key={index} className=" flex justify-start items-center gap-2 w-auto">
                                <img height='25px' width='25px' src={checkPng} />
                                <p>price:</p><span className=" font-semibold">{item.price} g</span>
                            </div>
                        )
                    })}
                </div>

                

                <div className="text-center pt-4  text-[16px] 
                    px-[20px]
                    xl:px-[100px]
                ">
                    <h1 className=" text-left leading-[1.4em]">{ReactHtmlParser(singlePlanData?.description)}</h1>
                </div>

            </div>
        </>
    );
};

ModalPackage.propTypes = {
    setShowMoreData: PropTypes.func.isRequired,
    singlePlanData: PropTypes.object,
};
