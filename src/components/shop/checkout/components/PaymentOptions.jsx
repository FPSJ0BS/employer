


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openCheckoutModal } from "../../../../01 - New Code/Employer/Redux/EmployerPackages";

const PaymentOptions = ({ handlePayment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [dbtCheckbox, setDBTCheckbox] = useState(true);
  const [razorpayCheckbox, setRazorpayCheckbox] = useState(false);

  const dbtFunc = (e) => {
    setDBTCheckbox(e.target.checked)
    setRazorpayCheckbox(false)
  }

  const razorpayFunc = (e) => {
    setRazorpayCheckbox(e.target.checked)
    setDBTCheckbox(false)
  }

  return (
    <div className="payment-options">
      <ul>
        <li>
          <div className="radio-option radio-box">
            <input
              onChange={(e) => dbtFunc(e)}
              type="radio"
              name="payment-group"
              id="payment-2"
              defaultChecked
            />
            <label htmlFor="payment-2">
              QR Code / Direct Bank Transfer
              <span className="small-text">
                Make your payment directly into our bank account. Please enter
                your Transaction ID after the Payment as the payment reference. Once yourPayment is verified, your account will be activated.
              </span>
            </label>
          </div>
        </li>
        {/* End li */}



        {/* End li */}
        <li>
        <div className="radio-option radio-box">
  <input
    onChange={(e) => razorpayFunc(e)}
    className="radio-razorpay"
    type="radio"
    name="payment-group"
    id="payment-4"
  />
  <label htmlFor="payment-4">
    <h2>Pay with razorpay (with EMI options)</h2>
    <img
      className="mt-2"
      src="/images/icons/paypal.png"
      alt="payment"
    />
  </label>
</div>

        </li>
      </ul>
      {/* End ul */}

      <div className="btn-box flex justify-center items-center">
        {dbtCheckbox && <button
          onClick={() => dispatch(openCheckoutModal())}
          className="relative flex gap-2 py-2 px-8 text-white hover:text-black text-base font-bold  overflow-hidden bg-[#dda15e] rounded-[20px] border-1 border-solid transition-all duration-400 ease-in-out shadow-md hover:scale-105  hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          <ShoppingCart />
          QR / Direct Bank Transfer
        </button>}

        {razorpayCheckbox && <button
          onClick={() => handlePayment()}
          className="relative flex gap-2 py-2 px-8 text-white hover:text-black text-base font-bold  overflow-hidden bg-[#dda15e] rounded-[20px] border-1 border-solid transition-all duration-400 ease-in-out shadow-md hover:scale-105  hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          <ShoppingCart />
          Razorpay
        </button>}
      </div>
    </div>
  );
};

export default PaymentOptions;
