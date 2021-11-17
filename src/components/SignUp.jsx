import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Close from "../assets/images/close.svg";
import WhiteClose from "../assets/images/white_close.svg";
import Logo from "../assets/images/white_docity.svg";
import { Input } from "./FormComponents/Input";
import * as Yup from "yup";
import {
  signUpRequest,
  signupReset,
  authUser,
  validateEmail,
  resetValidateEmail,
} from "../modules/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { alertOpen } from "../modules/common/Actions";
import { phoneRegExp } from "./RequestVerification";
import SignupTerms from "./SignupTerms";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be more than 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be more than 3 characters"),
  emailId: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is less than 6 characters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords are not matching")
    .required("Confirm password is required"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Please enter a valid mobile number")
    .min(10, "Please enter a valid 10 digit number")
    .max(10, "Please enter a valid 10 digit number")
    .required("Contact number is required"),
});

const SignUp = ({ setOpenSignUp, setOpenLogin, ...props }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
    },
    onSubmit: (values) => {
      props.signupReset();
      if (props.token && props.type === "CE") {
        setOpenTerms(true);
      } else {
        let vals = { ...values };
        delete vals.confirmPassword;
        props.signupSubmit(vals);
      }
    },
    validationSchema: SignUpSchema,
  });

  const [openTerms, setOpenTerms] = useState(false);

  useEffect(() => {
    if (props.signup?.errors?.message) {
      props.signupReset();
    }

    //eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    if (props.validateEmailRes?.errors?.message) {
      props.alertOpen({
        msg: props.validateEmailRes?.errors?.message,
        title: "Signup",
        action: () => {
          props.resetValidateEmail();
        },
      });
    }
    //eslint-disable-next-line
  }, [props.validateEmailRes]);
  useEffect(() => {
    if (props.signup?.success) {
      props.signupReset();
      setOpenSignUp(false);
      props.alertOpen({
        msg:
          "A verification link has been sent to your email. Click the link to finish sign up process.",
        title: "Signup",
      });
    }
    //eslint-disable-next-line
  }, [props.signup]);

  useEffect(() => {
    if (props.verifyTokenRes && props.verifyTokenRes.emailId) {
      formik.setFieldValue("emailId", props?.verifyTokenRes?.emailId);
      formik.setFieldValue("firstName", props?.verifyTokenRes?.name);
    }
    //eslint-disable-next-line
  }, [props.verifyTokenRes]);

  return (
    <div className="card d-flex">
      <div className="d-flex flex-col login-side-bg">
        <div
          className="m-close-icon"
          onClick={() => {
            setOpenSignUp(false);
          }}
        >
          <img src={WhiteClose} alt="close" />
        </div>
        <div className="login-side-wrap">
          <div className="logo">
            <img src={Logo} alt="DoCity" />
          </div>
          <p>
            Hello please fill up your information and start your journey with us
          </p>
        </div>
      </div>
      <div className="w50 m100 mb2">
        <form className="login-form signup-form" onSubmit={formik.handleSubmit}>
          <h3>Sign Up</h3>
          <div
            className="close-icon"
            onClick={() => {
              setOpenSignUp(false);
            }}
          >
            <img src={Close} alt="close" />
          </div>
          <div className="scroll-y h32">
            <Input
              name="firstName"
              required={true}
              label="First Name"
              formik={formik}
              placeholder="Enter first name"
            />
            <Input
              name="lastName"
              required={true}
              label="Last Name"
              formik={formik}
              placeholder="Enter last name"
            />
            <Input
              name="emailId"
              label="Email ID"
              required={true}
              formik={formik}
              onFocusOut={() => {
                if (formik.values.emailId) {
                  props.validateEmail(formik.values.emailId);
                }
              }}
              disabled={props.verifyTokenRes?.emailId}
              placeholder="Enter email"
            />
            <Input
              name="password"
              required={true}
              label="Password"
              formik={formik}
              type={"password"}
              placeholder="Enter password"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              formik={formik}
              type={"password"}
              required={true}
              placeholder="Enter confirm password"
            />
            <Input
              name="mobileNumber"
              required={true}
              label="Contact No."
              formik={formik}
              placeholder="Enter phone"
            />
          </div>
          <div className="button-wrap mt1">
            <button
              className={`primary-color w100 ${
                props?.signup?.loading && !props.token && props.type !== "CE"
                  ? "loadBtn"
                  : ""
              }`}
            >
              {props.token && props.type === "CE"
                ? "Next"
                : props?.signup?.loading
                ? "Processing..."
                : "Sign Up"}
            </button>
          </div>
          <SignupTerms
            {...props}
            open={openTerms}
            setOpen={setOpenTerms}
            values={formik.values}
          />
        </form>

        <p className="align-center mt1 text-gray light-bold cursor">
          Already have account? Please{" "}
          <span
            className="text-blue"
            onClick={() => {
              setOpenLogin(true);
              setOpenSignUp(false);
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signup: state?.auth?.signup,
    verifyTokenRes: state?.auth?.verifyToken,
    validateEmailRes: state?.auth?.validateEmail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signupSubmit: (values) => {
        return signUpRequest(values);
      },
      signupReset,
      alertOpen,
      authUser,
      validateEmail,
      resetValidateEmail,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
