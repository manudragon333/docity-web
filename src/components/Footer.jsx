import React, { useEffect } from "react";
import FooterLogo from "../assets/images/white@3x.png";
// import FB from "../assets/images/facebook-white.svg";
// import Google from "../assets/images/google-white.svg";
// import LinkedIn from "../assets/images/linkedin-white.svg";
import facebook from "../assets/images/facebook.png";
import twitter from "../assets/images/twitter.png";
import linkedin from "../assets/images/linkedin.png";
import { useHistory } from "react-router";

const Footer = () => {
  const history = useHistory();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <footer className="d-flex flex-col align-center">
      <div className="overlay"></div>
      <div className="container mt4 pl5 pr5 d-flex zTop space-between w100">
        <div
          onClick={() => {
            history.push("/");
            scrollToTop();
          }}
        >
          <img className="footer-logo cursor" src={FooterLogo} alt="footer" />
        </div>
        <div className="d-flex mt4 space-between footer-links">
          <div>
            <h4
              className="cursor"
              onClick={() => {
                history.push("/aboutus");
                scrollToTop();
              }}
            >
              ABOUT US
            </h4>
          </div>
          <div>
            <h4
              className="cursor"
              onClick={() => {
                history.push("/faq");
                scrollToTop();
              }}
            >
              FAQ
            </h4>
          </div>
          <div>
            <h4
              className="cursor"
              onClick={() => {
                history.push("/ourProcess");
                scrollToTop();
              }}
            >
              OUR PROCESS
            </h4>
            {/* <ul>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
            </ul> */}
          </div>
          <div>
            <h4
              className="cursor"
              onClick={() => {
                history.push("/resources");
                scrollToTop();
              }}
            >
              RESOURCES
            </h4>
          </div>
          <div>
            <h4
              onClick={() => {
                history.push("/contactus");
                scrollToTop();
              }}
              className="cursor"
            >
              CONTACT US
            </h4>
            {/* <ul>
              <li>lorem ispum</li>
              <li>lorem ispum</li>
            </ul> */}
          </div>
        </div>
        <div className="mt3 mob-view-icon">
          <div className="icons">
            <div className="icon-style">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebook} alt="social-icons" />
              </a>
            </div>
            <div className="icon-style">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img src={twitter} alt="social-icons" />
              </a>
            </div>
            <div className="icon-style">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="social-icons" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="terms">
        <div>
          <span> &copy; Copyright 2021 by Docity</span>
        </div>
        <div>
          <span
            className="cursor"
            onClick={() => {
              history.push("/privacypolicy");
            }}
          >
            Privacy Policy
          </span>
          <span
            className="cursor"
            onClick={() => {
              history.push("/termsandconditions");
            }}
          >
            Terms and Conditions
          </span>
          {/*  <span
            className="cursor"
            onClick={() => {
              // history.push("/privacypolicy")
            }}
          >
            Contact Us
          </span>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
