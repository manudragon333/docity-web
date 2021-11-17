import { useState } from "react";
import OurProcessCard from "./LandingPageComponents/OurProcessCard";
import OurProcessNext from "./LandingPageComponents/OurProcessNext";
import Slide1 from "../assets/images/slide1.png";
import Slide2 from "../assets/images/slide2.png";
import Slide3 from "../assets/images/slide3.png";
import Slide4 from "../assets/images/slide4.png";
import Slide5 from "../assets/images/Processing.png";
import Slide6 from "../assets/images/Report.png";
import Slide7 from "../assets/images/Review.png";
import "./styles/ourprocess.css";
import "./styles/mobile/ourprocess.css";

const OurProcess = () => {
  const [current, setCurrentNo] = useState(1);

  return (
    <div id="our-process" className="our-process">
      <div className="titleSec container">
        <h1>Our Process</h1>
        <p>
          A carefully crafted process designed to make property verification a
          breeze.
        </p>
      </div>

      <div className="cardSec">
        <OurProcessNext currentNo={current} setCurrentNo={setCurrentNo} />
        {current <= 1 && (
          <OurProcessCard
            imgSrc={Slide1}
            active={current === 1}
            title={"Login/Register"}
            content={
              "Create an account on DoCity with our simple registration process and then register your property of interest through the verification form."
            }
          />
        )}
        {current <= 2 && (
          <OurProcessCard
            active={current === 2}
            imgSrc={Slide2}
            title={"Upload Documents"}
            content={
              "Upload documents relating to the property of interest including the seller and draft sale deeds, land use certificate and link documents."
            }
          />
        )}
        {current <= 3 && (
          <OurProcessCard
            imgSrc={Slide3}
            active={current === 3}
            title={"Acknowledgement"}
            content={
              "Pay a nominal processing fee to receive an acknowledgement and have a civil engineer assigned to process your property request."
            }
          />
        )}
        {current <= 4 && (
          <OurProcessCard
            active={current === 4}
            imgSrc={Slide4}
            title={"Communication"}
            content={
              "Correspond with the engineer through chat on our portal or have him contact you directly to address any of your queries."
            }
          />
        )}
        {current <= 5 && (
          <OurProcessCard
            active={current === 5}
            imgSrc={Slide5}
            title={"Processing"}
            content={
              "The DoCity civil engineer will now begin processing the documents provided and do a thorough assessment of the land in question. "
            }
          />
        )}
        <OurProcessCard
          imgSrc={Slide7}
          title={"Review"}
          content={
            "Our expert will also review any legal issues, discrepancies in transactions and proposed future activities that could interfere with the property."
          }
        />
        <OurProcessCard
          imgSrc={Slide6}
          title={"Report"}
          content={
            "The final report including property description, land use details and a fair market value assessment will be uploaded on our portal. "
          }
        />
      </div>

      <div className="cardMobileSection mt3">
        <div className="cardSecMobile">
          {current <= 1 && (
            <OurProcessCard
              imgSrc={Slide1}
              active={current === 1}
              title={"Login/Register"}
              content={
                "Create an account on DoCity with our simple registration process and then register your property of interest through the verification form."
              }
            />
          )}
          {current <= 2 && (
            <OurProcessCard
              active={current === 2}
              imgSrc={Slide2}
              title={"Upload Documents"}
              content={
                "Upload documents relating to the property of interest including the seller and draft sale deeds, land use certificate and link documents."
              }
            />
          )}
          {current <= 3 && (
            <OurProcessCard
              imgSrc={Slide3}
              active={current === 3}
              title={"Acknowledgement"}
              content={
                "Pay a nominal processing fee to receive an acknowledgement and have a civil engineer assigned to process your property request."
              }
            />
          )}
          {current <= 4 && (
            <OurProcessCard
              active={current === 4}
              imgSrc={Slide4}
              title={"Communication"}
              content={
                "Correspond with the engineer through chat on our portal or have him contact you directly to address any of your queries."
              }
            />
          )}
          {current <= 5 && (
            <OurProcessCard
              active={current === 5}
              imgSrc={Slide5}
              title={"Processing"}
              content={
                "The DoCity civil engineer will now begin processing the documents provided and do a thorough assessment of the land in question. "
              }
            />
          )}
          <OurProcessCard
            imgSrc={Slide7}
            title={"Review"}
            content={
              "Our expert will also review any legal issues, discrepancies in transactions and proposed future activities that could interfere with the property."
            }
          />
          <OurProcessCard
            imgSrc={Slide6}
            title={"Report"}
            content={
              "The final report including property description, land use details and a fair market value assessment will be uploaded on our portal. "
            }
          />
        </div>
        <div>
          <OurProcessNext currentNo={current} setCurrentNo={setCurrentNo} />
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
