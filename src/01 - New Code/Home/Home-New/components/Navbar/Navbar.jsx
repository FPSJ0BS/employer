
import { Link } from "react-router-dom";
import talentoLogo from '../../../../../../public/assets/icons/Tallento LOGO.png'
import { useSelector } from "react-redux";
import LogoutButton from "../../../../Reusable Components/Logout Button/LogoutButton";


function NavbarNew() {

  const { login } = useSelector((state) => state.login);

  return (
    <nav className=" bg-black z-40 fixed w-[100%] flex flex-col items-center justify-between 
    

    ">
      <div className="w-[100%] flex items-center justify-between text-white px-[5vw] py-[1.5vw]">
        <div className="flex items-center gap-4">
          <img className="w-[150px]" src={talentoLogo} alt="Tallento" />
          <Link
            target="_blank"
            to={`https://tallento.ai/`}

          >
            <button className="cubertoButton w-[150px]">


              <span data-text="Looking for a job?">Looking for a job?</span>
            </button>
          </Link>
        </div>
        <div className=" flex gap-[3vw] text-[1vw] font-normal">

          {/* {!login && <h4>
            <Link
              to="/"

            >
              <span className="text-white">Home</span>
            </Link>
          </h4>}

          {!login && <h4>
            <Link
              to="/register"

            >
              <span className="text-white">Employer</span>
            </Link>
          </h4>} */}
          {/* <h4>About Us</h4>
          <h4>Contact Us</h4> */}

        </div>
        {/* <button className=" bg-[#4aa157] w-[6vw] h-[2vw] rounded-2xl">Post Job</button> */}

        <div className=" flex gap-4 justify-center items-center">


          <Link
            to={`${login ? "/employers-dashboard/post-jobs" : "/login-otp"}`}

          >
            <button className="cubertoButton w-[170px]">


              <span data-text="Hiring / Post a Job">Hiring / Post a Job</span>
            </button>
          </Link>





          <Link
            to={`${login ? "/employers-dashboard/dashboard" : "/login-otp"}`}

          >
            <button className="cubertoButton w-[150px]">
              <span data-text={login ? 'Dashboard' : 'Login / Register'}>{login ? 'Dashboard' : 'Login / Register'}</span>

            </button>
          </Link>


          {login && <div className="mt-[-10px]"><LogoutButton /></div>}




        </div>




      </div>


      {/* <div className="menu-overlay-new ">

        <div className="menu-nav-new">

          <div className="menu-logo-new">FPS JOBS</div>
          <div className="menu-close-btn">Close</div>

        </div>

        <div className="menu-cols-new flex ">
          <div className="cols-new ">
            <div className="video-new">
              <div className="video-preview-new bg-black h-[200px] w-[300px]"></div>
              <div className="video-details-new">
                <p>Play</p>
              </div>
            </div>
          </div>
          <div className="cols-new flex-1 text-black ">
            <div className="menu-link-new ">
              <a className="text-black  text-[3vw]" href="#">Home</a>
            </div>

            <div className="menu-link-new pt-4">
              <a className="text-black  text-[3vw]" href="#">Employer</a>
            </div>

            <div className="menu-link-new pt-4">
              <a className="text-black text-[3vw]" href="#">Candidate</a>
            </div>

            <div className="menu-link-new pt-4">
              <a className="text-black text-[3vw]" href="#">About Us</a>
            </div>

            <div className="menu-link-new pt-4">
              <a className="text-black text-[3vw]" href="#">Contact US</a>
            </div>
            <div className="btn-new pt-4">
              Take a Seat
            </div>


          </div>
        </div>

        <div className="menu-footer-new">
          <div className="menu-divider-new"></div>
          <div className="menu-footer-copy-new">
            <div className="slogan-new"><p>Tallento.Ai</p></div>
            <div className="socials-new">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

        </div>

      </div> */}

      {/* <div id="nav-bottom" className=" text-[0.8vw] h-[0%] w-[80%] absolute bottom-[0%] flex items-start justify-center py-[2vw] pr-[7vw] font-medium">

        <div className="mt-[2vw]">
          <h5 className=" overflow-hidden"><span className=" block opacity-0">Employer Login</span></h5>
          <h5 className=" overflow-hidden"><span className=" block opacity-0">Employer Login</span></h5>
          <h5 className=" overflow-hidden"><span className=" block opacity-0">Employer Login</span></h5>
        </div>


      </div> */}
    </nav>
  )
}

export default NavbarNew