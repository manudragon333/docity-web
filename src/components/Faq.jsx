import React, { useEffect } from "react";
import { useRef } from "react";
import NavBar from "./NavBar";
import ReqVerification from "./RequestVerification";
import "./styles/resources.css";
import "./styles/faq.css";
import Footer from "./Footer";
import { ROLE_CE, ROLE_SUPER_ADMIN } from "../constants";
import { connect } from "react-redux";
import FAQImage from "../assets/images/faq.png";

const FAQ = (props) => {
  const ques = useRef(null);

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

          <div id="ques" className="title_faq">
            <h1>FAQ.</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className={`mt2 d-flex space-between ${
            !(props?.role !== ROLE_CE && props?.role !== ROLE_SUPER_ADMIN)
              ? "mb4"
              : ""
          }`}
        >
          <ul
            className="faq-questions"
            onClick={(e) => {
              if (e.target.className === "link") {
                if (ques.current) {
                  ques.current.className = "link";
                }
                ques.current = e.target;
                e.target.className = e.target.className + " active";
              } else {
                ques.current.className = "link";
              }
            }}
          >
            <li>
              <a href={"#quesOne"} className="link" style={{ color: "#000" }}>
                What kind of information will I receive about the land from a
                DoCity civil engineers?
              </a>
            </li>
            <li>
              <a href="#quesTwo" className="link" style={{ color: "#000" }}>
                How will I get a bank loan with a DoCity seal?
              </a>
            </li>
            <li>
              <a href="#quesThree" className="link" style={{ color: "#000" }}>
                Can I request for land verification from outside India?
              </a>
            </li>
            <li>
              <a href="#quesFour" className="link" style={{ color: "#000" }}>
                Is my property information safe on this platform?
              </a>
            </li>
            <div className="faq-image-section">
              <img
                src={FAQImage}
                alt=""
                style={{ width: "90%", margin: "100px auto" }}
              />
            </div>
          </ul>
          <div className="mb2">
            {props?.role !== ROLE_CE && props?.role !== ROLE_SUPER_ADMIN && (
              <ReqVerification elevation={true} />
            )}
          </div>
        </div>
        <ul className="faq-answers">
          <li>
            <span id="quesOne" className="ans-link active">
              What kind of information will I receive about the land from a
              DoCity civil engineers?
            </span>
            <div className="fw-500 mb1 text-justify">
              {/*className= text-dark-gray */}
              The documents will include a property description, land use
              certificate, a fair market value assessment document.
              Additionally, based on prevailing conditions, the civil engineer
              will caution you about any proposed activity concerning the
              property they intend to buy such as road widening, changing
              municipal laws, etc - as these may adversely impact your property
              value in the future.
              <br />
              <a href="#ques" className="text-blue fw-500 backTop">
                Back To Top
              </a>
            </div>
          </li>
          <li>
            <span id="quesTwo" className="ans-link active">
              How will I get a bank loan with a DoCity seal?
            </span>
            <div className="fw-500 mb1 text-justify">
              {/*className= text-dark-gray */}
              Using the fair market value assessment report from the DoCity
              civil engineer, buyers can avail loans from nationalized bank
              easily due to higher property value assessed compared to
              prevailing sale deed based property value.
              <br />
              <a href="#ques" className="text-blue fw-500 backTop">
                Back To Top
              </a>{" "}
            </div>
          </li>
          <li>
            <span id="quesThree" className="ans-link active">
              Can I request for land verification from outside India?
            </span>
            <div className=" fw-500 mb1 text-justify">
              {/*className= text-dark-gray */}
              Yes, with our web-based system, one can place a verification
              request from anywhere in the world before you proceed any further.
              Upload property details and we will take care of the rest. Once
              all the details are gathered, he uploads the same on to the
              portal, so you can view them from anywhere.
              <br />{" "}
              <a href="#ques" className="text-blue fw-500 backTop">
                Back To Top
              </a>
            </div>
          </li>
          <li>
            <span id="quesFour" className="ans-link active">
              Is my property information safe on this platform?
            </span>
            <div className=" fw-500 mb2 text-justify">
              {/*className= text-dark-gray */}
              All property information will be securely stored in BlockChain.
              <br />{" "}
              <a href="#ques" className="text-blue fw-500 backTop">
                Back To Top
              </a>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state?.auth?.userDetails?.user?.role?.[0]?.name,
  };
};

export default connect(mapStateToProps)(FAQ);
