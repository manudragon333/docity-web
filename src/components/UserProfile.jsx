import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import Camera from "../assets/images/camera.svg";
import Docs from "../assets/images/doc-default.svg";
import Photo from "../assets/images/user.svg";
import {
  changePasswordReset,
  getProfile,
  updateProfileRequest,
  updateProfileReset,
  uploadProfilePicRequest,
  uploadProfilePicReset,
} from "../modules/auth";
import { alertOpen } from "../modules/common";
import { getUser } from "../utils/utils";
import Alert from "./AlertComponent";
import ChangePassword from "./ChangePassowd";
import "./styles/civilEnggProfile.css";
import "./styles/mobile/civilEnggProfile.css";
import WhiteNavBar from "./WhiteNavBar";

const UserProfile = (props) => {
  const getUserFromLocal = localStorage.getItem("user");
  const userRole = JSON.parse(getUserFromLocal);
  const [user, setUser] = useState(getUser());
  const [open, setOpen] = useState(false);
  const [errImgs, setErrImgs] = useState({});

  const history = useHistory();

  useEffect(() => {
    props.getProfile();

    return () => {
      setErrImgs({});
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.profile && props.profile.emailId) {
      setUser(props.profile);
    }
    //eslint-disable-next-line
  }, [props.profile]);

  useEffect(() => {
    if (props.profilePic && props.profilePic.emailId) {
      setUser(props.profilePic);
    }
    //eslint-disable-next-line
  }, [props.profilePic]);

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

  const govtFront = user?.idProof?.find((item) => item.type === "Govt id front")
    ?.path;
  const govtBack = user?.idProof?.find((item) => item.type === "Govt Id back")
    ?.path;

  return (
    <div>
      {userRole.role[0].name === "user" ||
      userRole.role[0].name === "super admin" ? (
        <>
          <WhiteNavBar boxShadowBottom={true} />

          <div className="w85 mAuto mt6 user-grid">
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
                      errImgs?.["profileImage"] ||
                      props?.profile?.loading ||
                      !user?.profileImage
                        ? Photo
                        : user.profileImage
                    }
                    alt="profilepic"
                    className={`profile ${
                      props.profilePic?.loading ? "loadBtn" : ""
                    }`}
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
            </div>
            <div className="w100 details-sec">
              <div className="elv-card ml1 basicDetails pb1 widthDetails">
                <h4 className="text-dark-gray p1">Basic Details</h4>
                <div className="profileSummary mb2">
                  <div className="item1">
                    <span>First Name</span>
                    <span style={{ color: "#000" }}>{user?.firstName}</span>
                  </div>
                  <div className="item2">
                    <span>Last Name</span>
                    <span style={{ color: "#000" }}>{user?.lastName}</span>
                  </div>
                  <div className="item3">
                    <span>Email</span>
                    <span style={{ color: "#000" }}>{user?.emailId}</span>
                  </div>
                </div>
                <div className="profileSummary">
                  <div className="item1">
                    <span>Contact</span>
                    <span style={{ color: "#000" }}>{user?.mobileNumber}</span>
                  </div>
                  <div className="item2">
                    <span>Age</span>
                    <span style={{ color: "#000" }}>{user?.age}</span>
                  </div>
                  <div className="item3">
                    <span>DOB</span>
                    <span style={{ color: "#000" }}>{user?.dob}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt1 ml1 sec3">
              <div className="elv-card item1">
                <h4 className="text-dark-gray p1">Govt. ID</h4>
                <div className="m-flex proSec3 user-prosec-space">
                  <div className="eduBorder flex-center flex-col w50">
                    <img
                      src={
                        errImgs["front"] || props.profile.loading || !govtFront
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
                  <div className={`eduBorder flex-center flex-col w50`}>
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
              <div className="elv-card item2">
                <h4 className="text-dark-gray p1">Current Address</h4>
                <div
                  className="mr1 ml1 "
                  /* text-dark-gray */ style={{ color: "#000" }}
                >
                  {user?.currentAddress?.split("\n").map((i) => {
                    return <p key={i}>{i}</p>;
                  })}
                </div>
              </div>
              <div className="elv-card item3">
                <h4 className="text-dark-gray p1">Permanent Address</h4>
                <div
                  className="mr1 ml1 " /* text-dark-gray */
                  style={{ color: "#000" }}
                >
                  {user?.permanentAddress?.split("\n").map((i) => {
                    return <p key={i}>{i}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="button-wrap flex-center mt3">
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
                history.push("/userProfileEdit");
              }}
            >
              Edit Profile
            </button>
          </div>
          <Alert />
          <ChangePassword open={open} setOpen={setOpen} />
        </>
      ) : (
        history.push("/")
      )}
      ;
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profilePic: state?.auth?.profilePic,
    profile: state?.auth?.profile,
    updateProfile: state?.auth?.updateProfile,
    alert: state?.common?.alert,
    changePasswordRes: state?.auth?.changePassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      uploadProfilePicRequest,
      uploadProfilePicReset,
      getProfile,
      updateProfileRequest,
      updateProfileReset,
      alertOpen,
      changePasswordReset,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
