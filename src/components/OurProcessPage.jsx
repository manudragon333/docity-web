import React, { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./styles/aboutus.css";
import "./styles/resources.css";

const OurProcessPage = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className="resources">
        <div className="container">
          <NavBar />

          <div className="title_faq">
            <h1>Our Process.</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Login/Register</h3>
          </div>
          <div className="abtUsAns">
            Create an account on DoCity with our simple registration process and
            then register your property of interest through the verification
            form.
          </div>
        </div>
        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Upload Documents</h3>
          </div>
          <div className="abtUsAns">
            Upload documents relating to the property of interest including the
            seller and draft sale deeds, land use certificate and link
            documents.
          </div>
        </div>
        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Acknowledgement</h3>
          </div>
          <div className="abtUsAns">
            Pay a nominal processing fee to receive an acknowledgement and have
            a civil engineer assigned to process your property request.
          </div>
        </div>
        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Communication</h3>
          </div>
          <div className="abtUsAns">
            Correspond with the engineer through chat on our portal or have him
            contact you directly to address any of your queries.
          </div>
        </div>
        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Processing</h3>
          </div>
          <div className="abtUsAns">
            The DoCity civil engineer will now begin processing the documents
            provided and do a thorough assessment of the land in question.
          </div>
        </div>

        <div className="aboutus mt3 mb2">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Review</h3>
          </div>
          <div className="abtUsAns">
            Our expert will also review any legal issues, discrepancies in
            transactions and proposed future activities that could interfere
            with the property.
          </div>
        </div>
        <div className="aboutus mt3 mb4">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Report</h3>
            {/* <button className="verifyProperty">Verify Property Now</button> */}
          </div>
          <div className="abtUsAns">
            The final report including property description, land use details
            and a fair market value assessment will be uploaded on our portal.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state?.auth?.isLoggedIn?.isLoggedIn,
    role: state?.auth?.userDetails?.user?.role?.[0]?.name,
  };
};

export default connect(mapStateToProps)(OurProcessPage);
