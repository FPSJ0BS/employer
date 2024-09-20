import FooterDefault from "../../components/footer/common-footer";
import Hero3 from "../../components/hero/hero-3";
import Partner from "../../components/common/partner/Partner";
import JobCategorie7 from "../../components/job-categories/JobCategorie7";
import JobFeatured3 from "../../components/job-featured/JobFeatured3";
import Testimonial2 from "../../components/testimonial/Testimonial2";
import TopCompany from "../../components/top-company/TopCompany";
import About2 from "../../components/about/About2";
import AppSection3 from "../../components/app-section/AppSection3";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import MobileMenu from "../Headers/MobileMenu";
import DefaulHeader2 from "../Headers/DefaulHeader2";
import RegBanner2 from "../../components/block/RegBanner2";
import { Link } from "react-router-dom";
import FirebaseNoti from "@/firebase/noti";

import "./home-3.scss";

const index = () => {
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero3 />
      {/* <!-- End Banner Section Three--> */}

      <FirebaseNoti />

      <section className="clients-section-two">
        <div className="sponsors-outer" data-aos="fade">
          {/* <!--Sponsors Carousel--> */}
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

      <section className="registeration-banners">
        <div className="auto-container">
          <div
            className="row flex justify-center items-center"
            data-aos="fade-up"
          >
            <RegBanner2 />
          </div>
        </div>
      </section>
      {/* <!-- End Registeration Banners --> */}

      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Job Categories</h2>
            <div className="text">2020 jobs live - 293 added today.</div>
          </div>

          <div className="row grid-flex pt-50" data-aos="fade-up">
            <JobCategorie7 />
          </div>
        </div>
      </section>
      {/* <!-- End Job Categories --> */}

      <section className="job-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Featured Jobs</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>
          {/* End .sec-title */}

          <div className="row" data-aos="fade-up">
            <JobFeatured3 />
          </div>

          <div className="btn-box">
            <Link to="/job-list-v3" className="theme-btn btn-style-one bg-blue">
              <span className="btn-title">Load More Listing</span>
            </Link>
          </div>
        </div>
      </section>
      {/* <!-- End Job Section --> */}

      <section className="testimonial-section-two">
        <div className="container-fluid">
          <div className="testimonial-left">
            <img
              src="/images/resource/testimonial-left.png"
              alt="testimonial"
            />
          </div>
          {/* End left img group */}

          <div className="testimonial-right">
            <img
              src="/images/resource/testimonial-right.png"
              alt="testimonial"
            />
          </div>
          {/* End right img group */}

          <div className="sec-title text-center">
            <h2>Testimonials From Our Customers</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>
          {/* <!-- Sec Title --> */}

          <div className="carousel-outer" data-aos="fade-up">
            <div className="testimonial-carousel">
              <Testimonial2 />
            </div>
            {/* <!-- Testimonial Carousel --> */}
          </div>
        </div>
      </section>
      {/* <!-- End Testimonial Section --> */}

      <section className="top-companies">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Top Company Registered</h2>
            <div className="text">
              Some of the companies we have helped recruit excellent applicants
              over the years.
            </div>
          </div>

          <div className="carousel-outer" data-aos="fade-up">
            <div className="companies-carousel">
              <TopCompany />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Top Companies --> */}

      <section className="about-section-two">
        <div className="auto-container">
          <div className="row">
            <About2 />
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}

      <div className="appSection3s">
        <AppSection3 />
      </div>
      {/* <!-- End App Section --> */}

      <FooterDefault footerStyle="alternate" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
