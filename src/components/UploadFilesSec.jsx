import "./UploadComponents/uploadDocs.css";
import UploadDetails from "./UploadComponents/UploadDetailsCard";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getUploadTypes,
  deleteDoc,
  uploadDoc,
  docWriter,
  addNoteToDoc,
  fetchProperty,
  resetDocWriter,
} from "../modules/property-contact";
import { alertOpen } from "../modules/common";
import { useFormik } from "formik";
import { Input } from "./FormComponents/Input";
import * as Yup from "yup";
import { phoneRegExp } from "./RequestVerification";
import AlertComponent from "./AlertComponent";

const docWriterSchema = Yup.object().shape({
  name: Yup.string()
    .matches("^[A-Za-z ]*$", "Name must be only alphabets")
    .required("Name is required")
    .min(3, "Name must be more than 3 characters"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, "Contact number must be valid")
    .min(10, "Please enter a valid 10 digit number")
    .max(10, "Please enter a valid 10 digit number")
    .required("Contact number is required"),
});
const UploadDocs = (props) => {
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      name: props?.property?.documentWriter?.name ?? "",
      contactNumber: props?.property?.documentWriter?.contact_number ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        props?.property?.documents["Saledeed"] === undefined ||
        props?.property?.documents["Saledeed"]?.length === 0
      ) {
        props.alertOpen({ msg: "Saledeed document is required" });
        return;
      }
      props.docWriterSubmit({ ...values, request_id: params.id });
      // endpoint.put(apis.documentWriter(params.id), values).then((res) => {
      //   history.push("/steps/ackSec/" + params.id);
      // });
      props.setStep(3);
    },
    validationSchema: docWriterSchema,
  });
  const history = useHistory();

  useEffect(() => {
    props.getUploadTypes();
    props.setStep(2);

    window.onpopstate = () => {
      props.setStep(1);
      history.push("/steps/addressFilling/" + params?.id);
    };
    return () => {
      window.onpopstate = null;
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (params.id) {
      props.fetchProperty(params.id);
    }
    //eslint-disable-next-line
  }, [params.id]);

  // useEffect(() => {
  //   if (props.deleteDoc.success || props.uploadDoc.success) {
  //     props.fetchProperty(params.id);
  //   }
  // }, [props.deleteDoc, props.uploadDoc]);

  // useEffect(() => {
  //   if (props.addNoteToDoc.success) {
  //     props.fetchProperty(params.id);
  //   }
  // }, [props.addNoteToDoc]);

  useEffect(() => {
    if (props?.docWriter?.success) {
      props.resetDocWriter();
      history.push("/steps/payments/" + params.id);
      // history.push("/steps/ackSec/" + params.id);
    }
    //eslint-disable-next-line
  }, [props.docWriter]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container uploadDocs d-flex">
        <AlertComponent />
        <div className="w100 mr1 mb1">
          <h4 className="text-dark-gray">Upload Documents</h4>
          {props?.uploadTypes?.map((uploadType, i) => {
            return (
              <UploadDetails
                {...props}
                title={uploadType?.name}
                id={uploadType?.id}
                key={uploadType?.id + i}
                documents={props.property?.documents}
                propertyLoading={props.property?.loading}
                uploadDocLoading={props.uploadDoc?.loading}
              />
            );
          })}
        </div>
        <div className="w100">
          <h4 className="text-dark-gray">Instructions/Information</h4>
          <div className="elv-card mt1 p1 instructions">
            <div className="text-dark-gray mb1 text-justify">
              Sale Deed is mandatory for this service. Upload as many link
              documents as possible for best quality report.
            </div>
            <h4 className="text-dark-gray">Sales deed</h4>
            <div className="text-dark-gray mb1 text-justify">
              Please upload a zoomed in readable copy of the vendor/seller’s
              existing Sale Deed that will serve as a parent doc through this
              process. This is mandatory.
            </div>
            <h4 className="text-dark-gray">Link documents</h4>
            <div className="text-dark-gray mb1 text-justify">
              Upload readable copies of pre-existing registered documents
              related to the property including a copy of revenue papers, and
              other records available.
            </div>
          </div>
          <div className="elv-card p1 mt1">
            <h4 className="text-dark-gray">
              Document Writer/ Advocate / Builder
            </h4>
            <Input
              name="name"
              label="Name"
              formik={formik}
              required={true}
              placeholder="Enter name"
            />
            <Input
              name="contactNumber"
              label="Contact Number"
              formik={formik}
              required={true}
              placeholder="Enter phone"
            />
          </div>
        </div>
      </div>
      <div className="button-wrap flex-center">
        <button
          className="secondary-dark"
          type="button"
          onClick={() => {
            props.setStep(1);
            history.push("/steps/addressFilling/" + params?.id);
          }}
        >
          BACK
        </button>
        <button
          type="submit"
          className={`primary-color ${
            props.docWriter?.loading ? "loadBtn" : ""
          }`}
        >
          {props.docWriter?.loading ? "Processing..." : "NEXT"}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    uploadTypes: state?.propertyContact?.uploadTypes?.data,
    uploadDoc: state?.propertyContact?.uploadDoc,
    property: state?.propertyContact?.property,
    deleteDoc: state?.propertyContact?.deleteDoc,
    docWriter: state?.propertyContact?.docWriter,
    addNoteToDoc: state?.propertyContact?.addNoteToDoc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUploadTypes,
      deleteDocAction: (payload) => {
        return deleteDoc(payload);
      },
      uploadDocAction: (values) => {
        return uploadDoc(values);
      },
      docWriterSubmit: docWriter,
      resetDocWriter,
      fetchProperty,
      addNoteToDocAction: addNoteToDoc,
      alertOpen,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocs);
