import { useFormik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { changePassword, changePasswordReset } from "../modules/auth";
import { Input } from "./FormComponents/Input";
import Close from "../assets/images/close.svg";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = ({ open, setOpen, msg, ...props }) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => {
      props.changePasswordReset();
      let vals = { ...values };
      delete vals.confirmNewPassword;
      props.changePassword(vals);
      formik.resetForm();
    },
    validationSchema: ChangePasswordSchema,
  });

  const { changePasswordRes } = props;

  useEffect(() => {
    if (changePasswordRes?.errors?.message) {
      props.changePasswordReset();
    }
    // eslint-disable-next-line
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
        <h2>Change Password</h2>
        <span className="text-center m1">You can change password here.</span>

        <Input
          name="oldPassword"
          label="Current password"
          formik={formik}
          className={"w100"}
          type="password"
        />
        <Input
          name="newPassword"
          label="New password"
          formik={formik}
          type="password"
          className={"w100"}
        />
        <Input
          name="confirmNewPassword"
          label="Confirm New password"
          formik={formik}
          className={"w100"}
          type="password"
        />
        {changePasswordRes?.errors?.message && (
          <div className="errorMsg">{changePasswordRes?.errors?.message}</div>
        )}
        <button
          type="submit"
          className={`primary-color mt1  ${
            changePasswordRes?.loading ? "loadBtn" : ""
          }`}
        >
          {changePasswordRes?.loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return {
    changePasswordRes: state?.auth?.changePassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changePassword,
      changePasswordReset,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
