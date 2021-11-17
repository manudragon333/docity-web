import React, { useEffect } from "react";
import Footer from "./Footer";
import LandingAboutUs from "./LandingPageAboutUs";
import NavBar from "./NavBar";
import OurPartners from "./OurPartners";
import OurProcess from "./OurProcess";
import ReqVerification from "./RequestVerification";
import SignupTerms from "./SignupTerms";
import Testimonial from "./Testimonial";
import Alert from "./AlertComponent";
import { connect } from "react-redux";
import { ROLE_CE, ROLE_SUPER_ADMIN } from "../constants";

const SectionOne = (props) => {

 const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className="main">
        <div className="container">
          <>
            <NavBar />
            <SignupTerms />
            {/* <WhiteNavBar /> */}
            <div className="d-flex space-between">
              <div className="section-one">
                <h1>Welcome to DoCity Property Verification</h1>
                <p>
                  An intelligent personal assistant to help you make informed
                  and effortless property purchases.
                </p>
                <button
                  className="primary-color"
                >
                  <a href="#our-process">Know More</a>
                </button>
              </div>
              {props?.role !== ROLE_CE && props?.role !== ROLE_SUPER_ADMIN && (
                <ReqVerification />
              )}
            </div>
          </>
        </div>
      </div>

      <OurProcess />
      <OurPartners />
      <Testimonial />
      <LandingAboutUs />
      <Footer />
      <Alert />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state?.auth?.userDetails?.user?.role?.[0]?.name,
  };
};

export default connect(mapStateToProps)(SectionOne);
