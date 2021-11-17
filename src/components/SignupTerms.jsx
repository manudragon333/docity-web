import { useState } from "react";
import Popup from "reactjs-popup";

const SignupTerms = ({ open, setOpen, ...props }) => {
  const [read, setRead] = useState(false);
  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      contentStyle={{ width: 700 }}
      overlayStyle={{
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex-center flex-col card p1">
        {/* <h3>Term &amp; Conditions</h3> */}
        <h3 className="primary-text-color">Terms and Conditions</h3>
        <div className="container">
          <div className="aboutus mt3 mb2">
            <div className="d-flex space-between mb1"></div>
            <div className="abtUsAns">Welcome to docity.co!</div>
            <br />
            <div className="abtUsAns">
              These terms and conditions outline the rules and regulations for
              the use of DOCITY CIVIL ENGINEERS PVT. LTD.'s Website, located at
              qa.docity.co.
            </div>
            <br />
            <div className="abtUsAns">
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use docity.co if you do not agree
              to take all of the terms and conditions stated on this page.
            </div>
            <br />
            <div className="abtUsAns">
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company’s terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. {/* All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client’s needs in respect of
              provision of the Company’s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same. */}
            </div>
          </div>
        </div>

        <div className="flex-center ">
          <input
            id="signup"
            type="checkbox"
            disabled={props.signup?.loading}
            className="cursor"
            onChange={(e) => {
              setRead(e.target.checked);
            }}
          />{" "}
          <label
            htmlFor="signup"
            className="signup-terms gray-black ml1 fw-500"
          >
            I have read and accept the terms of use and privacy policy
          </label>
        </div>

        <div className="flex-center">
          <button
            type={"button"}
            className="secondary-dark mr1 mt1"
            onClick={() => {
              setOpen(false);
            }}
          >
            Go Back
          </button>

          <button
            disabled={!read}
            className={
              props?.signup?.loading
                ? "loadBtn primary-color mt1"
                : "primary-color mt1"
            }
            onClick={() => {
              let vals = { ...props.values };
              delete vals.confirmPassword;
              if (props.verifyTokenRes?.token) {
                vals.token = props.verifyTokenRes?.token;
                vals.termsAndConditions = true;
              }
              if (props.verifyTokenRes?.token) {
                props.authUser(vals);
              } else {
                props.signupSubmit(vals);
              }
            }}
          >
            {props?.signup?.loading ? "Processing..." : "Sign Up"}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default SignupTerms;
