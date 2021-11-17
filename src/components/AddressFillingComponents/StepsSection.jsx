import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepConnector from "@material-ui/core/StepConnector";
import Location from "../../assets/images/location.png";
import Ack from "../../assets/images/acknowledge.png";
import Doc from "../../assets/images/doc.png";
import Payment from "../../assets/images/payment.png";
import "./steps.css";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
const StepsSection = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [paramId, setParamId] = useState("");
  useEffect(() => {
    if (location.pathname && location?.pathname?.split("/")?.length === 4) {
      setParamId(location?.pathname?.split("/")?.[3]);
    }
  }, [location.pathname]);

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 23,
    },
    active: {
      "& $line": {
        backgroundColor: "#aacbcf",
      },
    },
    completed: {
      "& $line": {
        backgroundColor: "#fff",
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: "#aacbcf",
      borderRadius: 1,
    },
  })(StepConnector);

  return (
    <Stepper
      alternativeLabel
      activeStep={props.step}
      connector={<ColorlibConnector />}
      className="flex-center steps"
    >
      <Step
        className={`step ${props.step > 1 ? "active" : ""}`}
        onClick={() => {
          if (props.step > 1 || paramId) {
            props.setStep(1);
            history.push(
              `/steps/addressFilling${paramId ? "/" + paramId : ""}`
            );
          }
        }}
      >
        {props.step === 1 && <div className="step-border"></div>}
        <div className="relative" style={{ zIndex: "1" }}>
          <img src={Location} alt="location" />
          <div className="step-line"></div>
        </div>
        <label className={props.step === 1 ? "active" : ""}>Location</label>
      </Step>
      <Step
        className={`step ${props.step > 2 ? "active" : ""}`}
        onClick={() => {
          if (props.step > 2 || paramId) {
            props.setStep(2);
            history.push(`/steps/uploadDocs${paramId ? "/" + paramId : ""}`);
          }
        }}
      >
        {props.step === 2 && <div className="step-border"></div>}
        <div className="relative" style={{ zIndex: "1" }}>
          <img src={Doc} alt="Doc" />
          <div className="step-line"></div>
        </div>
        <label className={props.step === 2 ? "active" : ""}>
          Upload Documents
        </label>
      </Step>
      <Step
        className={`step ${props.step > 3 ? "active" : ""}`}
        onClick={() => {
          if (props.step > 3 || paramId) {
            props.setStep(3);
            history.push(`/steps/payments${paramId ? "/" + paramId : ""}`);
          }
        }}
      >
        {props.step === 3 && <div className="step-border"></div>}
        <div className="relative" style={{ zIndex: "1" }}>
          <img src={Payment} alt="payment" />
          <div className="step-line"></div>
        </div>
        <label className={props.step === 3 ? "active" : ""}>Payment</label>
      </Step>
      <Step
        className={`step ${props.step === 4 ? "active" : ""}`}
        onClick={() => {
          if (paramId && props?.property?.paymentStatus?.name !== "pending") {
            props.setStep(4);
            history.push(`/steps/ackSec${paramId ? "/" + paramId : ""}`);
          }
        }}
      >
        {props.step === 4 && <div className="step-border"></div>}
        <div style={{ zIndex: "1" }}>
          <img src={Ack} alt="ack" />
        </div>
        <label className={props.step === 4 ? "active" : ""}>
          Acknowledgement
        </label>
      </Step>
    </Stepper>
  );
};
export default StepsSection;
