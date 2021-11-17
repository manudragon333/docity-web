import WhiteNavBar from "./WhiteNavBar";
import Photo from "../assets/images/user.svg";
import Camera from "../assets/images/camera.svg";
import Docs from "../assets/images/doc-default.svg";
import "./styles/civilEnggProfile.css";
import "./styles/mobile/civilEnggProfile.css";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "./FormComponents/Input";
import { alertOpen } from "../modules/common/Actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useFormik } from "formik";
import { TextArea } from "./FormComponents/TextArea";
import {
  getProfile,
  updateProfileRequest,
  updateProfileReset,
  uploadProfilePicRequest,
  uploadProfilePicReset,
} from "../modules/auth";
import endpoint from "../endpoint";
import { useEffect, useState } from "react";
import { apis } from "../utils/apis";
import moment from "moment";
import { phoneRegExp } from "./RequestVerification";
import AlertComponent from "./AlertComponent";

const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be more than 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be more than 3 characters"),
  emailId: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),
  age: Yup.string()
    .matches("^[0-9]{1,3}$", "Enter valid age.")
    .required("Age is required"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Please enter a valid mobile number")
    .min(10, "Please enter a valid 10 digit number")
    .max(10, "Please enter a valid 10 digit number")
    .required("Contact number is required"),
  dob: Yup.string().required("DOB is required"),
});

const UserProfile = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [errImgs, setErrImgs] = useState({});

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      firstName: props?.userDetails?.firstName
        ? props?.userDetails?.firstName
        : "",
      lastName: props?.userDetails?.lastName
        ? props?.userDetails?.lastName
        : "",
      emailId: props?.userDetails?.emailId ? props?.userDetails?.emailId : "",
      dob: props?.userDetails?.dob ? props?.userDetails?.dob : "",
      age: props?.userDetails?.age ? props?.userDetails?.age : "",
      mobileNumber: props?.userDetails?.mobileNumber
        ? props?.userDetails?.mobileNumber
        : "",
      currentAddress: props?.userDetails?.currentAddress
        ? props?.userDetails?.currentAddress
        : "",
      permanentAddress: props?.userDetails?.permanentAddress
        ? props?.userDetails?.permanentAddress
        : "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      console.log(values, 'userprofile');
      props.updateProfileRequest(values);
    },
  });

  const [imgErr, setImgErr] = useState({});

  useEffect(() => {
    return () => {
      props.updateProfileReset();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.updateProfile && props.updateProfile.emailId) {
      history.push("/userProfile");
      if (location.pathname.includes("userProfile"))
        props.alertOpen({
          msg: "User details updated successfully.",
          title: "User Profile Update",
        });
    }
    //eslint-disable-next-line
  }, [props.updateProfile]);

  const govtFront = props?.profile?.idProof?.find(
    (item) => item.type === "Govt id front"
  )?.path;
  const govtBack = props?.profile?.idProof?.find(
    (item) => item.type === "Govt Id back"
  )?.path;

  return (
    <div>
      <WhiteNavBar boxShadowBottom={true} />
      <AlertComponent />
      <div className="w90 mAuto jc-center mt6 user-grid">
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
        </div>
        <form className="w100" onSubmit={formik.handleSubmit}>
          <div className="elv-card ml1 basicDetails pb1">
            <h4 className="text-dark-gray p1">Basic Details</h4>
            <div className="profileSummary psEdit">
              <div className="item1">
                <Input
                  name="firstName"
                  label="First Name"
                  formik={formik}
                  required={true}
                />
              </div>
              <div className="item2">
                <Input
                  name="lastName"
                  label="Last Name"
                  formik={formik}
                  required={true}
                />
              </div>
              <div className="item3">
                <Input
                  name="emailId"
                  label="Email Id"
                  disabled={true}
                  formik={formik}
                  required={true}
                />
              </div>
            </div>
            <div className="profileSummary pb1 psEdit">
              <div className="item1">
                <Input
                  name="mobileNumber"
                  label="Contact"
                  formik={formik}
                  required={true}
                />
              </div>
              <div className="item2">
                <Input name="age" label="Age" formik={formik} required={true} />
              </div>
              <div className="item3">
                <Input
                  name="dob"
                  label="DOB"
                  formik={formik}
                  type="date"
                  required={true}
                  max={moment(new Date()).format("YYYY-MM-DD")}
                />
              </div>
            </div>
          </div>
          <div className=" mt1 ml1 sec3">
            <div className="elv-card item1">
              <h4 className="text-dark-gray p1">Govt. ID</h4>
              <div className="m-flex ml1 mr1 proSec3">
                <div className="eduBorder flex-center flex-col w50">
                  <div className="relative">
                    <input
                      type="file"
                      className="d-none"
                      id="govIdFront"
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
                        formData.append("attachment", e.target.files[0]);
                        setImgErr({
                          ...imgErr,
                          front: true,
                        });
                        formData.append("type", "GOVT_ID_FRONT");
                        endpoint
                          .post(apis.userAttachments, formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          })
                          .then((res) => {
                            props.getProfile();
                            setImgErr({
                              ...imgErr,
                              front: false,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            setImgErr({
                              ...imgErr,
                              front: false,
                            });
                          });
                      }}
                    />
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
                    <div className="changeId flex-center">
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("govIdFront").click();
                        }}
                      >
                        {imgErr.front ? "Uploading..." : "Change ID"}
                      </button>
                    </div>
                  </div>
                  <h4 className="text-gray pHalf">Front</h4>
                </div>
                <div className="eduBorder flex-center flex-col ml1 w50">
                  <div className="relative">
                    <input
                      type="file"
                      className="d-none"
                      id="govIdBack"
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
                        formData.append("attachment", e.target.files[0]);
                        setImgErr({
                          ...imgErr,
                          back: true,
                        });
                        formData.append("type", "GOVT_ID_BACK");
                        endpoint
                          .post(apis.userAttachments, formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          })
                          .then((res) => {
                            props.getProfile();
                            setImgErr({
                              ...imgErr,
                              back: false,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            setImgErr({
                              ...imgErr,
                              back: false,
                            });
                          });
                      }}
                    />
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
                    <div className="changeId flex-center">
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("govIdBack").click();
                        }}
                      >
                        {imgErr.back ? "Uploading..." : "Change ID"}
                      </button>
                    </div>
                  </div>
                  <h4 className="text-gray pHalf">Back</h4>
                </div>
              </div>
            </div>
            <div className="elv-card item2">
              <TextArea
                name="currentAddress"
                label="Current Address"
                formik={formik}
              />
            </div>
            <div className="elv-card item3">
              <TextArea
                name="permanentAddress"
                label="Permanent Address"
                formik={formik}
              />
            </div>
          </div>
          <div className="button-wrap flex-center mt3">
            <button
              disabled={imgErr.back || imgErr.front}
              className="secondary-dark"
              onClick={() => {
                history.push("/userProfile");
              }}
            >
              Cancel
            </button>
            <button
              disabled={imgErr.back || imgErr.front}
              className={
                props.updateProfile?.loading
                  ? "loadBtn primary-color"
                  : "primary-color"
              }
            >
              {props.updateProfile?.loading ? "Processing..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profilePic: state?.auth?.profilePic,
    userDetails: state?.auth?.userDetails?.user,
    profile: state?.auth?.profile,
    updateProfile: state?.auth?.updateProfile,
    alert: state?.common?.alert,
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
