import { useFormik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import {
  shareReportRequest,
  shareReportReset,
} from "../modules/property-contact";
import { alertOpen } from "../modules/common";
import { Input } from "./FormComponents/Input";
import Close from "../assets/images/close.svg";
const ShareSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
});

const ShareFinalReport = ({ open, setOpen, loading, ...props }) => {
  // console.log("ShareFinalReport props: ", props.share);
  const formik = useFormik({
    initialValues: {
      emailId: "",
      link: props.share,
    },
    onSubmit: (values) => {
      props.shareReportRequest(values);
      // console.log("shareReportRequest values: ", values)
    },
    validationSchema: ShareSchema,
  });

  const { shareReport } = props;

  useEffect(() => {
    if (shareReport?.errors?.message) {
      props.shareReportReset();
    }
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    if (shareReport?.success) {
      props.shareReportReset();
      props.alertOpen({
        msg: "Report Sent Successfully",
        title: "Share Report",
      });
      formik.resetForm();
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [shareReport]);

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
        <h2>Share Documents</h2>
        <span className="text-center m1"></span>
        <Input
          name="emailId"
          label="Email Id"
          formik={formik}
          className={"w100"}
        />
        {shareReport?.errors?.message && (
          <div className="errorMsg">{shareReport?.errors?.message}</div>
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
    shareReport: state?.propertyContact?.shareReport,
    loading: state?.propertyContact?.shareReport?.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      shareReportRequest: (values) => {
        return shareReportRequest(values);
      },
      shareReportReset: () => {
        return shareReportReset();
      },
      alertOpen: (payload) => {
        return alertOpen(payload);
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareFinalReport);
