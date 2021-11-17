import WhiteNavBar from "./WhiteNavBar";
import Photo from "../assets/images/oval-copy-2.png";
import Camera from "../assets/images/camera.svg";
import ProgressBar from "react-customizable-progressbar";
import Docs from "../assets/images/doc-default.svg";
import "./styles/civilEnggProfile.css";
import { useHistory } from "react-router-dom";
import { Input } from "./FormComponents/Input";
import { TextArea } from "./FormComponents/TextArea";
import { useFormik } from "formik";
import { apis } from "../utils/apis";
import endpoint from "../endpoint";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateProfileRequest,
  updateProfileReset,
  getProfile,
  uploadProfilePicRequest,
} from "../modules/auth";
import { bindActionCreators } from "redux";
import { alertOpen } from "../modules/common";
import moment from "moment";
import * as Yup from "yup";
import { phoneRegExp } from "./RequestVerification";
import AlertComponent from "./AlertComponent";
import {STATUS_LIST} from "../constants";

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
    .required("Age is required."),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Please enter a valid mobile number")
    .min(10, "Please enter a valid 10 digit number")
    .max(10, "Please enter a valid 10 digit number")
    .required("Contact number is required"),
  dob: Yup.string().required("DOB is required"),
  graduateFrom: Yup.string().required("Graduate From is required"),
  graduationYear: Yup.string().required("Year of Pass  is required"),
  qualification: Yup.string().required("Qualification is required"),
});

const CivilEnggProfileEdit = (props) => {
  const history = useHistory();

  const [showDate, setShowDate] = useState(false);
  const [errImgs, setErrImgs] = useState({});

  const formik = useFormik({
    initialValues: {
      firstName: props?.userDetails?.firstName
        ? props?.userDetails?.firstName
        : "",
      lastName: props?.userDetails?.lastName
        ? props?.userDetails?.lastName
        : "",
      emailId: props?.userDetails?.emailId ? props?.userDetails?.emailId : "",
      dob: props?.userDetails?.dob
        ? props?.userDetails?.dob
        : ""
        ? moment(
            props?.userDetails?.dob ? props?.userDetails?.dob : "",
            "DD/MM/yyyy"
          )
            .format("yyyy-MM-DD")
            .toString()
        : "",
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
      graduateFrom: props?.userDetails?.graduateFrom
        ? props?.userDetails?.graduateFrom
        : "",
      graduationYear: props?.userDetails?.graduationYear
        ? props?.userDetails?.graduationYear
        : "",
      qualification: props?.userDetails?.qualification
        ? props?.userDetails?.qualification
        : "",
    },
    enableReinitialize: true,
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      delete values.submitButton;
      values.dob = moment(values.dob).format("DD/MM/YYYY");
      props.updateProfileRequest(values);
    },
  });

  const [imgLoading, setImgLoading] = useState({});

  useEffect(() => {
    return () => {
      props.updateProfileReset();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.updateProfile && props.updateProfile.id) {
      props.updateProfileReset();
      history.push("/civilEnggProfile");
      props.alertOpen({
        msg: "User details updated successfully.",
        title: "User Profile Update",
      });
    }
    // eslint-disable-next-line
  }, [props.updateProfile]);

  useEffect(() => {
    if (props?.userDetails?.id) {
      formik.resetForm({
        firstName: props?.userDetails?.firstName,
        lastName: props?.userDetails?.lastName,
        emailId: props?.userDetails?.emailId,
        dob: props?.userDetails?.dob
          ? moment(props?.userDetails?.dob).format("yyyy-MM-DD")
          : "",
        age: props?.userDetails?.age,
        mobileNumber: props?.userDetails?.mobileNumber,
        currentAddress: props?.userDetails?.currentAddress,
        permanentAddress: props?.userDetails?.permanentAddress,
        graduateFrom: props?.userDetails?.graduateFrom,
        graduationYear: props?.userDetails?.graduationYear,
      });
    }
    // eslint-disable-next-line
  }, [props.userDetails]);

  useEffect(() => {
    if (props.updateProfile && props.updateProfile.emailId) {
      history.push("/civilEnggProfile");
      props.alertOpen({
        msg: "Civil engineer details updated successfully.",
        title: "Civil engineer Profile Update",
      });
    }
    // eslint-disable-next-line
  }, [props.updateProfile]);

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
    <form onSubmit={formik.handleSubmit}>
      <WhiteNavBar boxShadowBottom={true} />
      <AlertComponent />

      <div className="w90 mAuto d-flex mt6 user-grid">
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
              <span>{STATUS_LIST[props?.userDetails?.kycVerified]?.name}</span>
            </div>
            <div>
              <span>Online Training:</span>
              <span
                className="cursor"
                onClick={() => {
                  history.push("/video");
                }}
              >
                {STATUS_LIST[props?.userDetails?.trainingStatus]?.name}
              </span>
            </div>
            <div>
              <span>Assessment:</span>
              <span> {STATUS_LIST[props?.userDetails?.assessmentStatus]?.name}</span>
            </div>
            <div>
              <span>Overall Status:</span>
              <span className="approved-green"> {STATUS_LIST[props?.userDetails?.status]?.name}</span>
            </div>
            <h4 className="text-dark-gray mt1">Profile Verification Status</h4>
            <div className="mt1">
              <ProgressBar
                progress={props?.userDetails?.profilePercentage}
                radius={100}
                trackStrokeColor={"#F9FAF9"}
                strokeColor={"#49C5B6"}
                className="progressBar flex-center"
              >
                <div className="indicator">
                  <div>{props?.userDetails?.profilePercentage}%</div>
                </div>
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="w100 details-sec">
          <div className="elv-card ml1 basicDetails">
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
            <div className="profileSummary psEdit">
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
              <div className="item3" onClick={() => setShowDate(!showDate)}>
                <Input
                  name="dob"
                  label="DOB"
                  formik={formik}
                  type="date"
                  required={true}
                />
              </div>
            </div>
            <div className="profileSummary psEdit pb2">
              <div className="item1">
                <Input
                  name="qualification"
                  label="Qualification"
                  formik={formik}
                  required={true}
                />
              </div>
              <div className="item2">
                <Input
                  name="graduateFrom"
                  label="Graduated From"
                  formik={formik}
                  required={true}
                />
              </div>
              <div className="item3">
                <Input
                  name="graduationYear"
                  label="Year of Pass"
                  formik={formik}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="d-flex mt1 ml1 civil-sec3">
            <div className="elv-card item1">
              <h4 className="text-dark-gray ml1 mt1">Education Certificate</h4>
              <div className="eduBorder flex-center m1 proSec3">
                <div className="relative">
                  <input
                    type="file"
                    className="d-none"
                    id="eduCerts"
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
                      formData.append("type", "EDUCATION_CERTIFICATE");
                      setImgLoading({
                        ...imgLoading,
                        edu: true,
                      });
                      endpoint
                        .post(apis.userAttachments, formData, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          props.getProfile();
                          setImgLoading({
                            ...imgLoading,
                            edu: false,
                          });
                        })
                        .catch((err) => {
                          setImgLoading({
                            ...imgLoading,
                            edu: false,
                          });
                        });
                    }}
                  />
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
                  <div className="changeId flex-center w100 h100">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("eduCerts").click();
                      }}
                    >
                      {imgLoading.edu ? "Uploading..." : "Change ID"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="elv-card item2">
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
                        formData.append("type", "GOVT_ID_FRONT");
                        setImgLoading({
                          ...imgLoading,
                          front: true,
                        });
                        endpoint
                          .post(apis.userAttachments, formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          })
                          .then((res) => {
                            props.getProfile();
                            setImgLoading({
                              ...imgLoading,
                              front: false,
                            });
                          })
                          .catch((err) => {
                            setImgLoading({
                              ...imgLoading,
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
                    <div className="changeId flex-center w100 h100">
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("govIdFront").click();
                        }}
                      >
                        {imgLoading.front ? "Uploading..." : "Change ID"}
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
                        formData.append("type", "GOVT_ID_BACK");
                        setImgLoading({
                          ...imgLoading,
                          back: true,
                        });
                        endpoint
                          .post(apis.userAttachments, formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          })
                          .then((res) => {
                            setImgLoading({
                              ...imgLoading,
                              back: false,
                            });
                            props.getProfile();
                          })
                          .catch((err) => {
                            setImgLoading({
                              ...imgLoading,
                              back: false,
                            });
                            console.log(err);
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
                    <div className="changeId flex-center w100 h100">
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("govIdBack").click();
                        }}
                      >
                        {imgLoading.back ? "Uploading..." : "Change ID"}
                      </button>
                    </div>
                  </div>
                  <h4 className="text-gray pHalf">Back</h4>
                </div>
              </div>
            </div>

            <div className="elv-card item3">
              <TextArea
                name="currentAddress"
                label="Current Address"
                formik={formik}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="button-wrap flex-center">
        <button
          disabled={imgLoading.front || imgLoading.back || imgLoading.edu}
          type="button"
          className="secondary-dark"
          onClick={() => {
            history.push("/civilEnggProfile");
          }}
        >
          Cancel
        </button>
        <button
          disabled={imgLoading.front || imgLoading.back || imgLoading.edu}
          className={`${
            props?.updateProfile?.loading ? "loadBtn " : ""
          }primary-color`}
          type="submit"
          onClick={() => {
            formik.setFieldValue("submitButton", "editPorfile");
          }}
        >
          {props.updateProfile?.loading ? "Processing..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state?.auth?.userDetails?.user,
    profile: state?.auth?.profile,
    updateProfile: state?.auth?.updateProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProfile,
      updateProfileRequest,
      updateProfileReset,
      uploadProfilePicRequest,
      alertOpen,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CivilEnggProfileEdit);
