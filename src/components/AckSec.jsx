import Ack from "../assets/images/acknowledgment_success.png";
import Illustration from "../assets/images/illustration.svg";
import MapComponent from "./AddressFillingComponents/MapComponent";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchProperty,
  FetchPropertyActionTypes,
} from "../modules/property-contact";
import moment from "moment";
import "./styles/ackSec.css";
import { resetReqVerificationFormValues } from "../modules/auth";
import endpoint from "../endpoint";
import { apis } from "../utils/apis";
// import { STATUS_LIST } from "../constants";

const AckSec = (props) => {
  const history = useHistory();
  const params = useParams();
  const [cords, setCords] = useState({});
  const [payStatus, setPayStatus] = useState({});

  const statusCall = (retry) => {
    let timeout;
    endpoint.get(`${apis.orderId}/` + params.id).then((res) => {
      if (retry > 0) {
        timeout = setTimeout(() => {
          statusCall(retry - 1);
          setPayStatus(res?.data?.status);
          clearTimeout(timeout);
        }, 4000);
      }
    });
  };

  useEffect(() => {
    props.fetchProperty(params.id);
    props.setStep(4);
    statusCall(4);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props?.property?.success) {
      setCords({
        lat: props?.property?.latitude,
        lng: props?.property?.longitude,
      });
    }
    // eslint-disable-next-line
  }, [props.property]);
  return (
    <div className="p2 ackSec d-flex">
      <div className="flex-center flex-col w70 bRight-default mobile-width">
        <div className="m2 ackHead flex-center">
          <img src={Ack} alt="ack" />
          <span>Your Request has been successfully registered</span>
        </div>
        <div className="illustration">
          <img src={Illustration} alt="Illustration" />
        </div>
      </div>
      <div className="w30 mobile-width">
        <div className="summary">
          <div className="mAuto w70 mt2 mobile-width">
            <h4 className="text-dark-gray">Summary</h4>
            <div className="summaryDetails">
              <div>
                <span>Request Id</span>
                <span>{props.property?.referenceId}</span>
              </div>
              <div>
                <span>Request Date</span>
                <span>
                  {moment(props.property?.auditInfo?.createdTime).format(
                    "DD-MM-YYYY"
                  )}
                </span>
              </div>
              <div>
                <span>Payment Total</span>
                <span>Rs.2000/-</span>
              </div>
              <div>
                <span>Payment Status</span>
                {/* <span className="status"> */}
                {/* {STATUS_LIST[payStatus?.id]?.name} */}
                {/* </span> */}
                {payStatus?.name && payStatus?.name === "success" ? (
                  <span className="payment-status-success">
                    {payStatus?.name}
                  </span>
                ) : (
                  <span className="payment-status-pending">
                    {payStatus?.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mAuto w70 mobile-width">
            <h4 className="text-dark-gray">Property Address</h4>
            <div>
              <div className="propertyAddress text-dark-gray">
                {props.property?.address}
              </div>
              <div className="ackMapSec">
                <MapComponent
                  type={"_canvas_ack"}
                  disableClick={true}
                  cords={cords}
                />
              </div>
            </div>
          </div>
          <div className="button-wrap">
            <button
              className="primary-color"
              onClick={() => {
                props.resetProperty();
                props.resetReqVerificationFormValues();
                history.push("/requests");
              }}
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    property: state?.propertyContact?.property,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProperty,
      resetReqVerificationFormValues,
      resetProperty: () => {
        return { type: FetchPropertyActionTypes.RESET };
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AckSec);
