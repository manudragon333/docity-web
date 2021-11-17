import { useFormik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { inviteCERequest, inviteCEReset } from "../modules/civil-engg";
import { alertOpen } from "../modules/common";
import { Input } from "./FormComponents/Input";
import Close from "../assets/images/close.svg";
const InviteSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  name: Yup.string()
    .matches("^[A-Za-z ]*$", "Name must be only alphabets")
    .required("Name is requried")
    .min(3, "Name must be more than 3 characters"),
});

const InviteCE = ({ open, setOpen, loading, ...props }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      emailId: "",
    },
    onSubmit: (values) => {
      props.inviteCERequest(values);
    },
    validationSchema: InviteSchema,
  });

  const { inviteCE } = props;

  useEffect(() => {
    if (inviteCE?.errors?.message) {
      props.inviteCEReset();
    }
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    if (inviteCE?.success) {
      props.inviteCEReset();
      props.alertOpen({
        msg: "Invitation Sent Successfully",
        title: "CE Invitation",
      });
      formik.resetForm()
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [inviteCE]);

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
        <h2>Invite Civil Engineer</h2>
        <span className="text-center m1"></span>

        <Input name="name" label="Name" formik={formik} className={"w100"} />
        <Input
          name="emailId"
          label="Email Id"
          formik={formik}
          className={"w100"}
        />
        {inviteCE?.errors?.message && (
          <div className="errorMsg">{inviteCE?.errors?.message}</div>
        )}
        <button
          type="submit"
          className={`primary-color mt1  ${loading ? "loadBtn" : ""}`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return {
    inviteCE: state?.civilEng?.inviteCE,
    loading: state?.civilEng?.inviteCE?.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inviteCERequest: (values) => {
        return inviteCERequest(values);
      },
      inviteCEReset: () => {
        return inviteCEReset();
      },
      alertOpen: (payload) => {
        return alertOpen(payload);
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteCE);
