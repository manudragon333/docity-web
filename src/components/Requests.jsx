import MapComponent from "./AddressFillingComponents/MapComponent";
import WhiteNavBar from "./WhiteNavBar";
import "./styles/request.css";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchProperties,
  resetProperty,
  resetProperties,
} from "../modules/property-contact";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../utils/utils";
import { ROLE_CE, ROLE_SUPER_ADMIN, STATUS_LIST } from "../constants";
import { fetchCE } from "../modules/civil-engg/Actions";
import InviteCE from "./InviteCE";
import Alert from "./AlertComponent";
import { Spinner } from "./FinalReportGeneration";
import UserIcon from "../assets/images/user.svg";
import SuccessAndCompleted from "../assets/images/success&completed.png";
import Submit from "../assets/images/submit.png";
// import Pending from "../assets/images/pending.png";
import Inprogress from "../assets/images/inprogress.png";
import Draft from "../assets/images/draft.png";
import Assigned from "../assets/images/assigned.png";
import moment from "moment";

const Requests = (props) => {
  console.log("Requests props: ", props);
  const history = useHistory();
  const location = useLocation();
  const [showCE, setShowCE] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [errImg, setErrImg] = useState({});
  const [filters, setFilters] = useState({
    page: 0,
    limit: 12,
  });
  const loaderRef = useRef();
  useEffect(() => {
    props.resetProperties();
    props.fetchProperties(filters);
    if (getUser()?.role?.[0]?.name === ROLE_SUPER_ADMIN) {
      props.fetchCE();
    }

    const observer = new IntersectionObserver(
      (entities) => {
        let target = entities[0];
        if (target.isIntersecting) {
          setFilters((filters) => {
            return {
              ...filters,
              page: filters.page + 12,
            };
          });
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      props.resetProperties();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.hasMoreResults) {
      props.fetchProperties(filters);
    }
    //eslint-disable-next-line
  }, [filters.page]);

  useEffect(() => {
    if (location?.state?.showCE) {
      setShowCE(true);
    } else {
      setShowCE(false);
    }
    //eslint-disable-next-line
  }, [location.state]);
  return (
    <div className="requests">
      <WhiteNavBar showCE={showCE} />
      <div className="container mt7">
        <div className="flex-center space-between">
          <div className="d-flex">
            {/* <img
              src={Arrow}
              alt=""
              className="cursor icon-back"
              onClick={() => {
                history.goBack();
              }}
            /> */}
            {!showCE && (
              <h4
                className="text-dark-gray"
                onClick={() => {
                  setShowCE(false);
                }}
              >
                Requests
              </h4>
            )}
            {getUser()?.role?.[0]?.name === ROLE_SUPER_ADMIN && showCE && (
              <h4
                className="text-dark-gray cursor"
                onClick={() => {
                  setShowCE(true);
                }}
              >
                Civil Engineer Profiles
              </h4>
            )}
          </div>
          {getUser()?.role?.[0]?.name !== ROLE_SUPER_ADMIN &&
            getUser()?.role?.[0]?.name !== ROLE_CE && (
              <button
                className="primary-color"
                onClick={() => {
                  props.resetProperty();
                  history.push("/steps/addressFilling");
                }}
              >
                Verify new property
              </button>
            )}
        </div>
        <Alert />

        {showCE ? (
          <>
            <div className="mt3 request-grid">
              <InviteCE open={showInvite} setOpen={setShowInvite} />
              {getUser()?.role?.[0]?.name === ROLE_SUPER_ADMIN && (
                <button
                  className="inviteCE primary-color m1"
                  onClick={() => {
                    setShowInvite(true);
                  }}
                >
                  Invite Civil Engineer
                </button>
              )}
              {props?.civilEnggs && props?.civilEnggs?.length > 0 ? (
                props?.civilEnggs?.map((item, i) => (
                  <div className="elv-card req-item" key={i}>
                    <div className="flex-center ce-bg">
                      <div className="ce-img">
                        <img
                          src={
                            errImg[item.profileImage] || !item.profileImage
                              ? UserIcon
                              : item.profileImage
                          }
                          alt="user"
                          onError={() => {
                            setErrImg((errImgs) => ({
                              ...errImgs,
                              [item.profileImage]: true,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="m1">
                      <div>
                        <span className="ce-left">Name:</span>
                        <span className="ce-right">{item.firstName}</span>
                      </div>
                      <div>
                        <span className="ce-left">KYC:</span>
                        <span className="ce-right">
                          {STATUS_LIST?.[item?.kycVerified]?.name}
                        </span>
                      </div>
                      <div>
                        <span className="ce-left">Online training:</span>
                        <span className="ce-right">
                          {STATUS_LIST?.[item?.trainingStatus]?.name}
                        </span>
                      </div>
                      <div>
                        <span className="ce-left">Assessment:</span>
                        <span className="ce-right">
                          {STATUS_LIST?.[item?.assessmentStatus]?.name}
                        </span>
                      </div>
                      <div>
                        <span className="ce-right">
                          <button className="primary-color m1" onClick={()=>{
                            props.resetProperty();
                            history.push("/civilEnggProfileEdit/"+item?.id);
                          }}>Edit</button>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  {props?.properties?.length === 0 && (
                    <div className="no-request">
                      <h2>No Requests Found</h2>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div ref={loaderRef} className="mt-1 mb-1">
              {props.Ploading && (
                <div className="flex-center relative">
                  <div className="">
                    <Spinner />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              {props?.properties?.length === 0 ? (
                <div className="no-request">
                  <h2>No Requests Found</h2>
                </div>
              ) : (
                <div className="mt3 request-grid">
                  {props?.properties?.map(
                    (property, i) =>
                      property?.address && (
                        <div
                          className="elv-card-request cursor req-item"
                          onClick={() => {
                            history.push(`/viewRequest/${property?.id}`);
                          }}
                          key={property?.id}
                        >
                          <div className="maps">
                            <MapComponent
                              type={"_canvas_" + i}
                              center={{
                                lat: property.latitude,
                                lng: property.longitude,
                              }}
                            />
                          </div>
                          <div className="address p1">
                            <div className="fields">
                              <div>
                                <span>Username</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;{property?.name}
                                </span>
                              </div>
                              <div>
                                <span>Region</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;
                                  {property?.region?.name}
                                </span>
                              </div>
                              <div style={{ display: "flex" }}>
                                <span>Property</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                {property?.propertyType?.name ===
                                  "Commercial Property" ||
                                "Residential Property" ? (
                                  <span
                                    style={{
                                      color: "#000",
                                      fontWeight: 500,
                                      textAlign:"initial",
                                    }}
                                  >
                                    {property?.propertyType?.name}
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "#000",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {property?.propertyType?.name}
                                  </span>
                                )}
                              </div>
                              <div>
                                <span>Location</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;{property?.city}
                                </span>
                              </div>
                              <div>
                                <span>Created time</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;
                                  {moment(
                                    property?.auditInfo?.creationTime
                                  ).format("DD/MM/YY HH:mm")}
                                </span>
                              </div>
                              <div>
                                <span>Request Id</span>
                                <span
                                  style={{ color: "#000", fontWeight: 500 }}
                                >
                                  : &nbsp;&nbsp;&nbsp;&nbsp;
                                  {property?.referenceId}
                                </span>
                              </div>
                              {property?.status && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "-.1rem",
                                  }}
                                >
                                  <span className="">Status</span>
                                  <span
                                    style={{ color: "#000", fontWeight: 500 }}
                                  >
                                    :&nbsp;&nbsp;&nbsp;&nbsp;
                                  </span>
                                  <span>
                                    {STATUS_LIST[property?.status?.id]?.name &&
                                    STATUS_LIST[property?.status?.id]?.name ===
                                      "Submitted" ? (
                                      property?.paymentStatus.name ===
                                      "success" ? (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            className="status-submitted-icon"
                                            src={Submit}
                                            alt="submit"
                                          />
                                          <span className="status-submitted">
                                            {
                                              STATUS_LIST[property?.status?.id]
                                                ?.name
                                            }
                                          </span>
                                        </div>
                                      ) : (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            className="status-draft-icon"
                                            src={Draft}
                                            alt="draft"
                                          />
                                          <span className="status-draft">
                                            Draft
                                          </span>
                                        </div>
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {STATUS_LIST[property?.status?.id]?.name &&
                                    STATUS_LIST[property?.status?.id]?.name ===
                                      "Assigned" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          className="status-assigned-icon"
                                          src={Assigned}
                                          alt="assigned"
                                        />
                                        <span className="status-assigned">
                                          {
                                            STATUS_LIST[property?.status?.id]
                                              ?.name
                                          }
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {STATUS_LIST[property?.status?.id]?.name &&
                                    STATUS_LIST[property?.status?.id]?.name ===
                                      "In Progress" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          className="status-inprogress-icon"
                                          src={Inprogress}
                                          alt="inprogress"
                                        />
                                        <span className="status-inprogress">
                                          {
                                            STATUS_LIST[property?.status?.id]
                                              ?.name
                                          }
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {STATUS_LIST[property?.status?.id]?.name &&
                                    STATUS_LIST[property?.status?.id]?.name ===
                                      "Completed" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          className="status-completed-icon"
                                          src={SuccessAndCompleted}
                                          alt="completed"
                                        />
                                        <span className="status-completed">
                                          {
                                            STATUS_LIST[property?.status?.id]
                                              ?.name
                                          }
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* <div>{property?.address}</div> */}
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            <div ref={loaderRef} className="mt-1 mb-1">
              {props.Ploading && (
                <div className="flex-center relative">
                  <div className="pSticky">
                    <Spinner />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    properties: state?.propertyContact?.properties?.data?.list,
    Ploading: state.propertyContact?.properties.loading,
    civilEnggs: state?.civilEng?.CEData?.list,
    hasMoreResults: state?.propertyContact?.properties?.data?.hasMoreResults,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProperties,
      fetchCE,
      resetProperty,
      resetProperties,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
