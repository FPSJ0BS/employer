import { Link } from "react-router-dom";
import { usePostLoginMutation, usePostLoginVerifyMutation } from "@/api/api";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/Login/loginSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "@/firebase/firebaseinit";

import { useState } from "react";
import './FormContent2'

const FormContentEmail = () => {

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [otpCheck, setOtpCheck] = useState(false);
  const [hash, sethash] = useState('')
  const [otp, setOtp] = useState('');
  const [postLogin] = usePostLoginMutation();
  const [postLoginVerify] = usePostLoginVerifyMutation();
  const [isTokenFound, setTokenFound] = useState(false);
  // const [header, setHeader] = useState('');

  // login form
  const Fcm = () => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      // if (data) {
      //     console.log("Token is", data);
      // }
      return data;
    }
    tokenFunc();
  };

  const FcmData = localStorage.getItem("Fcm");
  const parsingData = JSON.parse(FcmData);

  useEffect(() => {
    Fcm();
  }, []);



  // send otp functions starts ..................................................................

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger the login mutation with the entered phone number
      const response = await postLogin(phoneNumber).unwrap();
      if (response) {
        const hash = response?.data[0];
        sethash(hash);
        setOtpCheck(true)

      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, you can update state or display an error message
    }
  }

  // verify otp functions starts ..................................................................

  const otpVerify = async (e) => {

    e.preventDefault();
    try {
      // const response = await postLoginVerify(phoneNumber, hash, otp).unwrap();
      // console.log('phoneNumber' , phoneNumber, 'hash', hash, 'otp',otp );
      // console.log('Verification successful:', response);

      const response = await axios.post('http://89.116.34.153:3000/institute/login/mobile-verify-otp', {
        mobile_number: phoneNumber,
        hash: hash,
        otp: otp,
        fcm_token: 'fps',
      });
      
      if (response.status === 200) {
        const header = response?.data?.data[0];
        localStorage.setItem('header', header);
        navigate('employers-dashboard/dashboard');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }


  return (
    <div className="form-inner">
      <h3>Login with Email</h3>

      {/* <!--Login Form send otp--> */}

      {!otpCheck &&

        <form onSubmit={(e) => formSubmit(e)}>

          <div className="form-group">
            <label>Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type="number" name="phoneNumber" placeholder="Enter Phone Number" required />
          </div>



          {/* name */}

  
          {/* forgot password */}

          <div className="form-group">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              name="log-in"
            >
              Send Otp
            </button>
          </div>
          {/* login */}

        </form>}

      {/* End form */}


      {/* Login form verify Otp */}

      {otpCheck && <form onSubmit={(e) => otpVerify(e)}>

        <div className="form-group">
          <label>Enter Otp</label>
          <input onChange={(e) => setOtp(e.target.value)} type="number" name="enter otp" placeholder="Enter Otp" required />
        </div>

        {/* otp */}

        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Verify Otp
          </button>
        </div>
        {/* login */}
      </form>}
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContentEmail;
