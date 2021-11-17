import { useFormik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { forgetPasswordRequest, forgetPasswordReset } from "../modules/auth";
import { Input } from "./FormComponents/Input";
import Close from "../assets/images/close.svg";
import { alertOpen } from "../modules/common";

const ForgetPasswordSchema = Yup.object().shape({
  userName: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
});

const ForgotPassword = ({ open, setOpen, msg, ...props }) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    onSubmit: (values) => {
      props.forgetPasswordReset();
      props.forgetPasswordSubmit(values);
    },
    validationSchema: ForgetPasswordSchema,
  });

  const { forgetPassword } = props;

  useEffect(() => {
    if (forgetPassword?.errors?.message) {
      props.forgetPasswordReset();
    }
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    if (forgetPassword?.success) {
      props.forgetPasswordReset();
      props.alertOpen({
        msg:
          "A reset password link has been sent to your email. Click the link to reset your password.",
        title: "Forgot Password",
      });
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [forgetPassword]);

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
      <form
        className="flex-center flex-col card p2"
        onSubmit={formik.handleSubmit}
      >
        <div className="w100 relative">
          <div
            className="fp-close-icon"
            onClick={() => {
              setOpen(false);
              formik.resetForm();
            }}
          >
            <img src={Close} alt="close" />
          </div>
        </div>
        <h2>Forgot Password</h2>

        <span className="text-center m1">
          Please enter your email address to start password reset options.
        </span>

        <div className="input-wrap w100">
          <Input name="userName" label="Email" formik={formik} />
        </div>

        {forgetPassword?.errors?.message && (
          <div className="error">{forgetPassword?.errors?.message}</div>
        )}

        <button
          className={`primary-color mt1  ${
            forgetPassword?.loading ? "loadBtn" : ""
          }`}
        >
          {forgetPassword?.loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return {
    forgetPassword: state?.auth?.forgetPassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      forgetPasswordSubmit: (values) => {
        return forgetPasswordRequest(values);
      },
      forgetPasswordReset,
      alertOpen,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
