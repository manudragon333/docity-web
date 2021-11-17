import WhiteNavBar from "./WhiteNavBar";
import StepsSection from "./AddressFillingComponents/StepsSection";
import MapComponent from "./AddressFillingComponents/MapComponent";
import LocateMe from "../assets/images/crosshair.svg";
import AddressForm from "./AddressFillingComponents/AddressForm";
import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  useHistory,
} from "react-router-dom";
import UploadDocs from "./UploadFilesSec";
import AckSec from "./AckSec";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Payments from "./Payments";
import "../index.css";
const AddressFilling = (props) => {
  const formikRef = useRef(null);
  const [cords, setCords] = useState({});
  const [locateMebool, setLocateMe] = useState(false);
  const autocompleteInput = useRef("");

  const showPosition = (position) => {
    setCords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const locateMe = () => {
    window.navigator.geolocation.getCurrentPosition(showPosition);
    setLocateMe(true);
  };

  useEffect(() => {
    if (props?.property?.success) {
      setCords({
        lat: props?.property?.latitude,
        lng: props?.property?.longitude,
      });
    }
  }, [props.property]);

  return (
    <div className="d-flex relative container mobile-map-addressform">
      <div className="mAuto w100 mt2 address-form-mobile">
        <AddressForm
          setFormik={(formik) => {
            formikRef.current = formik;
          }}
          {...props}
        />
      </div>

      <div className="map-sec w100">
        <div className="map-header d-flex space-between">
          <div className="d-flex flex-col flex-center">
            <span className="main-head">Select Location On Map</span>
            <span className="sub-head">Drag map to select address</span>
          </div>
          <div className="flex-center locateMe cursor">
            <img src={LocateMe} alt="locateMe" />
            <span className="main-head" onClick={locateMe}>
              Locate Me
            </span>
          </div>
        </div>
        <div className="map-search-section">
          <input
            ref={autocompleteInput}
            className="map-search pac-target-input"
            placeholder="Search..."
            id="autocomplete"
          />
        </div>
        <MapComponent
          passAutoCompleteInput={autocompleteInput}
          showNote={true}
          searchBox={true}
          locateMe={locateMebool}
          setLocateMe={setLocateMe}
          formikRef={() => {
            return (key, value) => {
              formikRef.current.setFieldValue(key, value);
            };
          }}
          type={"_canvas_address"}
          cords={cords}
        />
      </div>
    </div>
  );
};

const Steps = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const getUser = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  let { path } = useRouteMatch();
  const [step, setStep] = useState(1);

  return (
    <div>
      {getUser &&
      getUser?.role?.[0]?.name &&
      getUser?.role?.[0]?.name === "user" &&
      accessToken &&
      refreshToken ? (
        <>
          <WhiteNavBar />

          <StepsSection
            step={step}
            setStep={setStep}
            params={props.match.params}
            property={props.property}
          />
          <Switch>
            <Route
              path={`${path}/addressFilling/:id`}
              render={(Rprops) => (
                <AddressFilling
                  {...Rprops}
                  setStep={setStep}
                  property={props.property}
                />
              )}
            />
            <Route
              path={`${path}/addressFilling`}
              render={(Rprops) => (
                <AddressFilling
                  {...Rprops}
                  setStep={setStep}
                  property={props.property}
                />
              )}
            />
            <Route
              path={`${path}/uploadDocs/:id`}
              render={(Rprops) => <UploadDocs {...Rprops} setStep={setStep} />}
            />
            <Route
              path={`${path}/payments/:id`}
              render={(Rprops) => <Payments {...Rprops} setStep={setStep} />}
            />
            <Route
              path={`${path}/ackSec/:id`}
              render={(Rprops) => <AckSec {...Rprops} setStep={setStep} />}
            />
          </Switch>
        </>
      ) : (
        // <Redirect exact path="/" />
        history.push("/")
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    property: state?.propertyContact?.property,
  };
};

export default connect(mapStateToProps)(withRouter(Steps));
