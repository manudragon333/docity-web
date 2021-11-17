import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./styles/aboutus.css";
import "./styles/resources.css";
import { ROLE_CE, ROLE_SUPER_ADMIN } from "../constants";

const AboutUs = (props) => {
  const history = useHistory();

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
            <h1>About DoCity.</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="aboutus mt2 mb1">
          <div className="d-flex space-between mbHalf mobile-dflex">
            <h3 className="primary-text-color">Why DoCity/How it started</h3>
            {props.isLoggedIn &&
              props?.role !== ROLE_SUPER_ADMIN &&
              props?.role !== ROLE_CE && (
                <button
                  className="verifyProperty"
                  onClick={() => {
                    history.push("/steps/addressFilling");
                  }}
                >
                  Verify Property Now
                </button>
              )}
          </div>
          <div className="abtUsAns">
            Rediscover the best way to purchase a property. Whether
            agricultural, structural or a plot, DoCity is your trusted
            consultant bringing together property buying best practices and
            advanced technology to provide an expert land verification platform.
            Land verification and purchase in India has long been a tedious
            process in the hands of unreliable government officials and
            unethical middlemen. Buyers do not have the means to interpret
            property information and take critical future-proof decisions. The
            need for DoCity has risen from the lack of a well-defined process
            where governments reach out to the people with the intent of keeping
            the markets buoyant and progressive.
          </div><br/>
          <div className="abtUsAns">
            Digitizing land verification provides a fast and secure instrument
            to property buyers to make informed choices while making purchases
            with ease. Using Artificial intelligence, Deep Learning and
            BlockChain technologies, DoCity is an expert property assistant that
            has learnt through step-by-step experienced authoring of thousands
            of physical property transactions over a span of 20 Years. Through
            DoCity, we aim to automate the exchange between property buyers and
            registration offices keeping in mind the best interests of both
            property buyers and the government.
          </div>
        </div>
        <div className="aboutus mt1 ">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Our Vision and Mission</h3>
            {/* <button className="verifyProperty">Verify Property Now</button> */}
          </div>
          <div className="abtUsAns">
            To become thought leaders in the real estate industry by achieving
            the highest standards of integral service while contributing to
            urban development, enhancing people’s lives and digitizing the
            Indian property market.
            <br />
            <br />
            Revolutionizing property purchase through the most emergent
            technologies, professional expertise and masterplan study, to
            facilitate progress and enhance the overall value of the Indian real
            estate industry.
          </div>
        </div>
        <div className="aboutus mt1 mb1">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Who we are</h3>
          </div>
          <div className="abtUsAns">
            To become thought leaders in the real estate industry by achieving
            the highest standards of integral service while contributing to
            urban development, enhancing people’s lives and digitizing the
            Indian property market.
            <br />
            <br />
            Revolutionizing property purchase through the most emergent
            technologies, professional expertise and masterplan study, to
            facilitate progress and enhance the overall value of the Indian real
            estate industry.
          </div>
        </div>
        <div className="aboutus mt1 mb1">
          <div className="d-flex space-between mbHalf mobile-dflex">
            <h3 className="primary-text-color">Our Service Benefits</h3>
            {props.isLoggedIn &&
              props?.role !== ROLE_SUPER_ADMIN &&
              props?.role !== ROLE_CE && (
                <button
                  className="verifyProperty"
                  onClick={() => {
                    history.push("/steps/addressFilling");
                  }}
                >
                  Verify Property Now
                </button>
              )}
          </div>
          <div className="abtUsAns">
            DoCity is the brainchild of Mr Sridhar Maroju, a civil engineer by
            training, and a structural consultant by passion who has been part
            of the realty horizons of Hyderabad for over two decades now. His
            prowess in structures and pooled land over the years has built a
            reputation of understanding the zoning system, rules and regulations
            that govern the acquisition and sale of land, building rules and
            more importantly the efficacy and hygiene of land and property
            documents. The team at DoCity strives to give you an unrivalled
            advantage stemmed with earnestness and integrity in our actions,
            we’re here to provide complete opacity regarding your properties,
            mitigate your risks and find ways of capitalizing on the investments
            you can make with patience and diligence. Individuals, cooperatives,
            corporates alike can harness the ‘DoCity’ advantage by virtue of
            intelligent advice from our industry experts and verified civil
            engineers in a professional setting.
          </div>
        </div>
        <div className="aboutus mt1 mb4">
          <div className="d-flex space-between mbHalf">
            <h3 className="primary-text-color">Recognition</h3>
            {/* <button className="verifyProperty">Verify Property Now</button> */}
          </div>
          <div className="abtUsAns">
            With years of service in a plethora of real estate businesses and
            initiatives, DoCity and it’s founder Mr Sridhar have been repeatedly
            recognised for their contributions to the industry.
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

export default connect(mapStateToProps)(AboutUs);
