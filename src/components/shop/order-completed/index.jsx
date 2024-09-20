import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../../01 - New Code/Headers/DefaulHeader";
import MobileMenu from "../../../01 - New Code/Headers/MobileMenu";
import Breadcrumb from "../Breadcrumb";
import CompleteOrder from "./components";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Order Completed" meta="Order Completed" />
      {/* <!--End Page Title--> */}

      {/* <!-- Order Confirmation --> */}
      <section className="order-confirmation">
        <div className="auto-container">
          <CompleteOrder />
        </div>
      </section>
      {/* <!-- End Order Confirmation --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
