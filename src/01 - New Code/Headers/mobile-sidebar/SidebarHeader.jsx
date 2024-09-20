
import { Link } from "react-router-dom";
import LogoImage from '../../../../public/assets/icons/Tallento LOGO.png'

const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link to="/">
        <img className="w-[200px]" src={LogoImage} alt="brand" />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
