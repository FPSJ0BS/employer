import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarFooter = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/fpsjobdeed/" },
    { id: 2, icon: "fa-youtube", link: "https://www.youtube.com/channel/UCPEX-dhBL7BYaTuaDHlVr6w" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/fpsjobs/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://cd.linkedin.com/company/fpsjobs" },
  ];
  const { login } = useSelector(state => state.login);

  return (
    <div className="mm-add-listing mm-listitem pro-footer">

      {login && <Link to="/employers-dashboard/post-jobs">
        <button className="theme-btn btn-style-one mm-listitem__text">Post Job</button>

      </Link>}

      {!login && <Link to="/register">
        <button className="theme-btn btn-style-one mm-listitem__text">Post Job</button>

      </Link>}
      {/* job post btn */}

      <div className="mm-listitem__text">
        <div className="contact-info">
          <p className="phone-num">
            <span>Call us </span>
            <a href="mailto:Hr@Fpsjob.Com">9783143666</a><br />
            <a href="mailto:Hr@Fpsjob.Com">9728987999</a>

          </p>
          <p className="address">
            Roop Janki tower, Chitrakoot Marg, near Navyam hospital, Bhura Patel Nagar A, Vaishali Nagar, Jaipur, Rajasthan 302021
            <br /><a href="mailto:support@superio.com" className="email">
              Hr@Fpsjob.Com
            </a>
          </p>

        </div>
        {/* End .contact-info */}

        <div className="social-links">
          {socialContent.map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
