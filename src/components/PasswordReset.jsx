import { useFormik } from "formik";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { resetPasswordRequest, resetPasswordReset } from "../modules/auth";
import { alertOpen } from "../modules/common";
import { Input } from "./FormComponents/Input";
import * as Yup from "yup";
import { bindActionCreators } from "redux";
import Close from "../assets/images/close.svg";
import { useEffect } from "react";

const ResetSchema = Yup.object().shape({
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordReset = ({ open, setOpen, msg, ...props }) => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      let vals = { ...values };
      delete vals.confirmPassword;
      props.resetPasswordRequest({
        password: values.newPassword,
        token: props.token,
      });
    },
    validationSchema: ResetSchema,
  });

  useEffect(() => {
    if (props.resetPasswordRes?.success) {
      props.resetPasswordReset();
      props.alertOpen({
        msg: "Reset password successful.",
        // title: ""
      });
      setOpen(false);
    }
    //eslint-disable-next-line
  }, [props.resetPasswordRes]);

  useEffect(() => {
    if (props?.resetPasswordRes?.errors?.message) {
      props.resetPasswordReset();
    }
    //eslint-disable-next-line
  }, [formik.values]);

  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      contentStyle={{ width: 400 }}
      overlayStyle={{
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex-center flex-col card p2">
        <div className="w100 relative">
          <div
            className="fp-close-icon"
            onClick={() => {
              setOpen(false);
              props.resetPasswordReset();
              formik.resetForm();
            }}
          >
            <img src={Close} alt="close" />
          </div>
        </div>
        <h2>Password Reset</h2>

        <span className="text-center m1">
          Enter new password below. We're just being extra careful.
        </span>
        <form className="w100" onSubmit={formik.handleSubmit}>
          <Input
            name="newPassword"
            label={"New Password"}
            type="password"
            formik={formik}
          />

          <Input
            name="confirmPassword"
            label={"Confirm Password"}
            type="password"
            formik={formik}
          />
          {props?.resetPasswordRes?.errors?.message && (
            <div className="error">
              {props?.resetPasswordRes?.errors?.message}
            </div>
          )}
          <div className="flex-center">
            <button
              className={
                props?.resetPasswordRes?.loading
                  ? "loadBtn primary-color mt1"
                  : "primary-color mt1"
              }
              type="submit"
            >
              {props?.resetPasswordRes?.loading
                ? "Processing..."
                : "RESET PASSWORD"}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return {
    resetPasswordRes: state?.auth?.resetPassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      alertOpen,
      resetPasswordRequest,
      resetPasswordReset,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
