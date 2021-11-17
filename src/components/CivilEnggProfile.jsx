import WhiteNavBar from "./WhiteNavBar";
import Photo from "../assets/images/user.svg";
import Camera from "../assets/images/camera.svg";
import ProgressBar from "react-customizable-progressbar";
import Docs from "../assets/images/doc-default.svg";
import "./styles/civilEnggProfile.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassowd";
import { connect } from "react-redux";
import AlertComponent from "./AlertComponent";
import { changePasswordReset, uploadProfilePicRequest } from "../modules/auth";
import { bindActionCreators } from "redux";
import { getProfile } from "../modules/auth";
import { STATUS_LIST } from "../constants";
import { alertOpen } from "../modules/common";

const CivilEnggProfile = (props) => {
  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser);
  console.log("user Profile civil: ", user);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [errImgs, setErrImgs] = useState({});

  useEffect(() => {
    props.getProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.changePasswordRes?.success) {
      props.changePasswordReset();
      props.alertOpen({
        msg: "Your password has been successfully changed.",
        title: "Change Password",
      });
      setOpen(false);
    }
    //eslint-disable-next-line
  }, [props.changePasswordRes]);

  const govtFront = props.profile?.idProof?.find(
    (item) => item.type === "Govt id front"
  )?.path;

  const govtBack = props.profile?.idProof?.find(
    (item) => item.type === "Govt Id back"
  )?.path;

  const eduCert = props.profile?.idProof?.find(
    (item) => item.type === "education certificate"
  )?.path;

  return (
    <div>
      {user?.role[0].name === "civil engineer" ? (
        <>
          <WhiteNavBar boxShadowBottom={true} />
          <AlertComponent />

          <div className="w85 mAuto d-flex mt6 user-grid">
            <div className="pic-sec">
              <div className="elv-card profilepic">
                <div className="relative flex-center">
                  <input
                    type="file"
                    className="d-none"
                    id="profilePic"
                    accept="image/*"
                    onChange={(e) => {
                      if (
                        !["image/jpeg", "image/jpg", "image/png"].includes(
                          e.target.files[0].type
                        )
                      ) {
                        props.alertOpen({
                          msg: "PNG, JPEG, JPG format images only allowed",
                        });
                        return;
                      }
                      let formData = new FormData();
                      formData.append("profileImage", e.target.files[0]);
                      props.uploadProfilePicRequest(formData);
                    }}
                  />
                  <img
                    src={
                      errImgs["profileImage"] ||
                      props.profile.loading ||
                      !props?.profile?.profileImage
                        ? Photo
                        : props?.profile?.profileImage
                    }
                    alt="profilepic"
                    className="profile"
                    onError={() => {
                      setErrImgs({
                        ...errImgs,
                        profileImage: true,
                      });
                    }}
                  />
                  <div
                    className="elv-card camDiv"
                    onClick={() => {
                      document.getElementById("profilePic").click();
                    }}
                  >
                    <img src={Camera} alt="camera" />
                  </div>
                </div>
              </div>

              <div className="elv-card mt1 p1 civil-summary">
                <h4 className="text-dark-gray mb1">Summary</h4>
                <div>
                  <span>KYC:</span>
                  <span style={{ color: "#000" }}>
                    {STATUS_LIST[props?.profile?.kycVerified]?.name}
                  </span>
                </div>
                <div>
                  <span>Online Training:</span>
                  <span style={{ color: "#000" }}>
                    {STATUS_LIST[props?.profile?.trainingStatus]?.name}
                  </span>
                </div>
                <div>
                  <span>Assessment:</span>
                  <span
                    className={
                      props?.profile?.assessmentStatus !== 6 ? "link-blue" : ""
                    }
                    onClick={() => {
                      if (props?.profile?.assessmentStatus !== 6) {
                        history.push("/video", { openAssesment: false });
                      }
                    }}
                    style={{ color: "#000" }}
                  >
                    {STATUS_LIST[props?.profile?.assessmentStatus]?.name}
                  </span>
                </div>
                <div>
                  <span>Overall Status:</span>
                  <span className="approved-green">
                    {STATUS_LIST[props?.profile?.status]?.name}
                  </span>
                </div>
                <h4 className="text-dark-gray mt1">
                  Profile Verification Status
                </h4>
                <div className="mt1">
                  <ProgressBar
                    progress={props?.profile?.profilePercentage}
                    radius={100}
                    trackStrokeColor={"#F9FAF9"}
                    strokeColor={"#49C5B6"}
                    className="progressBar flex-center"
                  >
                    <div className="indicator">
                      <div>
                        {props?.profile?.profilePercentage
                          ? props?.profile?.profilePercentage
                          : 0}
                        %
                      </div>
                    </div>
                  </ProgressBar>
                </div>
              </div>
            </div>
            <div className="w100 details-sec">
              <div className="elv-card ml1 basicDetails pb1 elv-center-mobile widthDetails">
                <h4 className="text-dark-gray p1">Basic Details</h4>
                <div className="profileSummary mb2">
                  <div className="item1">
                    <span>First Name</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.firstName || "-"}
                    </span>
                  </div>
                  <div className="item2">
                    <span>Last Name</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.lastName || "-"}
                    </span>
                  </div>
                  <div className="item3">
                    <span>Email</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.emailId || "-"}
                    </span>
                  </div>
                </div>
                <div className="profileSummary mb2">
                  <div className="item1">
                    <span>Contact</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.mobileNumber || "-"}
                    </span>
                  </div>
                  <div className="item2">
                    <span>Age</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.age || "-"}
                    </span>
                  </div>
                  <div className="item3">
                    <span>DOB</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.dob || "-"}
                    </span>
                  </div>
                </div>
                <div className="profileSummary pb2">
                  <div className="item1 elv-center-mobile">
                    <span>Qualification</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.qualification || "-"}
                    </span>
                  </div>
                  <div className="item2 elv-center-mobile">
                    <span>Graduated From</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.graduateFrom || "-"}
                    </span>
                  </div>
                  <div className="item3 elv-center-mobile">
                    <span>Year of Pass</span>
                    <span style={{ color: "#000" }}>
                      {props?.profile?.graduationYear || "-"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex mt1 ml1 civil-sec3">
                <div className="elv-card item1 elv-center-mobile">
                  <h4 className="text-dark-gray p1">Education Certificate</h4>
                  <div className="eduBorder flex-center m1 proSec3">
                    <img
                      src={
                        errImgs["edu"] || props.profile.loading || !eduCert
                          ? Docs
                          : eduCert
                      }
                      alt="docs"
                      onError={() => {
                        setErrImgs({
                          ...errImgs,
                          edu: true,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="elv-card item2 elv-center-mobile">
                  <h4 className="text-dark-gray p1">Govt. ID</h4>
                  <div className="m-flex mr1 proSec3 prosec-space">
                    <div className="eduBorder flex-center flex-col w50">
                      <img
                        src={
                          errImgs["front"] ||
                          props.profile.loading ||
                          !govtFront
                            ? Docs
                            : govtFront
                        }
                        alt="docs"
                        onError={() => {
                          setErrImgs({
                            ...errImgs,
                            front: true,
                          });
                        }}
                      />
                      <h4 className="text-gray pHalf">Front</h4>
                    </div>
                    <div className="eduBorder flex-center flex-col w50">
                      <img
                        src={
                          errImgs["back"] || props.profile.loading || !govtBack
                            ? Docs
                            : govtBack
                        }
                        alt="docs"
                        onError={() => {
                          setErrImgs({
                            ...errImgs,
                            back: true,
                          });
                        }}
                      />
                      <h4 className="text-gray pHalf">Back</h4>
                    </div>
                  </div>
                </div>
                <div className="elv-card item3 pb1 elv-center-mobile">
                  <h4 className="text-dark-gray p1">Current Address</h4>
                  <div
                    className="ml1 "
                    /* text-dark-gray */ style={{ color: "#000" }}
                  >
                    {props.profile?.currentAddress?.split("\n").map((i) => {
                      return <p key={i}>{i}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="button-wrap flex-center">
            <button
              className="secondary-color"
              onClick={() => {
                setOpen(true);
              }}
            >
              Change Password
            </button>
            <button
              className="primary-color"
              onClick={() => {
                history.push("/civilEnggProfileEdit");
              }}
            >
              Edit Profile
            </button>
          </div>
          <ChangePassword open={open} setOpen={setOpen} />
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.auth.profile,
    changePasswordRes: state?.auth?.changePassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      uploadProfilePicRequest,
      getProfile,
      alertOpen,
      changePasswordReset,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CivilEnggProfile);
