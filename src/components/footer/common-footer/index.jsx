
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import TallentoLogo from '../../../../public/assets/Home-new/fpslogodark.png'
import PhoneL from '../../../../public/assets/icons/download_app-0YgyFanW.png'

const index = ({ footerStyle = "" }) => {
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img
                      className="w-[200px]"

                      src={TallentoLogo}
                      alt="brand"
                    />
                  </a>

                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="mailto:Hr@Fpsjob.Com">9783143666</a><br />
                  <a href="mailto:Hr@Fpsjob.Com">9728987999</a>

                </p>
                <p className="address">
                  Roop Janki tower, Chitrakoot Marg, near Navyam hospital, <br />Bhura Patel Nagar A, Vaishali Nagar, <br />Jaipur, Rajasthan 302021
                  <br /><a href="mailto:support@superio.com" className="email">
                    Hr@Fpsjob.Com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row flex justify-between">
                <img className="w-[300px] mt-[-50px]" src={PhoneL} />
                <div className=" h-[300px] w-[300px] flex flex-col justify-start items-center gap-4 mt-[50px]">

                  <h2 className=" text-[25px]">Download Our App</h2>
                  <button className="h-[40px] w-[100px] bg-[#cc5475] text-white rounded-lg">Download</button>

                </div>
                <FooterContent />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
