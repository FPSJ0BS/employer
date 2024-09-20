import DefaulHeader2 from "../Headers/DefaulHeader2"
import MobileMenu from "../Headers/MobileMenu"
import FooterDefault from "../../components/footer/common-footer/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import { LoginLottieAnimation } from "../../../public/assets/Lottie/LoginLottieAnimation"
import { postForgotPasswordAxios } from "@/api/apiAxios"
import Loader from "../../../public/assets/Loader"
import useCustomLoader from "@/hooks/useLoader"





export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setLoader] = useCustomLoader(false);60

    // const [postLoginEmail] = usePostLoginEmailMutation();

    const notifySuccess = () => toast.success("Email Link Sent!");
    const notifyFailed = () => toast.error("Wrong Email");

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {

            const res = await postForgotPasswordAxios(email)
            console.log(res, email);
            if(res.data.status){
                notifySuccess();
                setEmail('');
                setLoader(false);
                navigate('/login-email')
            } else{
                notifyFailed();
                setEmail('');
                setLoader(false);
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="">


            <DefaulHeader2 />
            <MobileMenu />
            {/* End MobileMenu */}

            <div className="flex justify-center  items-center gap-[100px] h-auto">

                <div className=" hidden lg:block">

                    <LoginLottieAnimation />
                </div>



                <div className=" w-[500px] mt-[8rem] flex flex-col items-center">

                    <h2 className=" text-[2rem] font-medium mb-4">Forgot Password</h2>

                    {isLoading ? (<Loader />) : (<form className=" flex flex-col gap-6" onSubmit={(e) => formSubmit(e)}>
                        <div className=" flex flex-col gap-2 justify-center items-center sm:justify-start sm:items-start">
                            <label htmlFor="Email">Email</label>
                            <input required onChange={(e) => setEmail(e.target.value)} id="Email" className="h-[70px] w-[300px] sm:w-[400px] bg-[#f0f5f7] rounded-lg p-3" type="email" placeholder="" />
                        </div>
                       

                        <button className={`bg-mainBgColor h-[60px] w-[300px] sm:w-[400px] rounded-lg text-white `}>Send Link to Email</button>
                    </form>)}

                    <div className="flex justify-center items-center pt-4 gap-4">

                        

                        <h3 className="font-semibold text-black">

                            <Link to="/login-otp">Login With Otp</Link>
                        </h3>
                    </div>

                    <div className="flex justify-center items-center pt-2 pb-4">
                        <h3 className="font-semibold">
                            <span className="font-light">Don&rsquo;t have an account? </span>
                            <Link to="/register">Signup</Link>
                        </h3>
                    </div>


                </div>
            </div>

            <FooterDefault footerStyle="alternate" />
            {/* <!-- End Main Footer --> */}
        </div>
    )
}