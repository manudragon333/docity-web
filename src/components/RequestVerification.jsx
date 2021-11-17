import { useEffect } from "react";
import Select from "./FormComponents/Select";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  isLoggedInAction,
  resetReqVerificationFormValues,
  reqVerificationFormValues,
} from "../modules/auth";
import { getPropertyTypes, getRegions, alertOpen } from "../modules/common";
import { Input } from "./FormComponents/Input";
import { verifyProperty, contactMe } from "../modules/property-contact/Actions";
import { FetchPropertyActionTypes } from "../modules/property-contact";

export const phoneRegExp =
  "^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$";

const requestSchema = Yup.object().shape({
  propertyType: Yup.object().shape({
    label: Yup.string().required("Property type is required."),
    value: Yup.string().required(""),
  }),
  region: Yup.object().shape({
    label: Yup.string().required("Region is required."),
    value: Yup.string().required(""),
  }),
  email: Yup.string()
    .email("Email must be valid.")
    .required("Email is required"),
  name: Yup.string()
    .matches("^[A-Za-z ]*$", "Name must be only alphabets")
    .required("Name is required.")
    .min(3, "Name must be more than 3 characters"),
  contact: Yup.string()
    .matches(phoneRegExp, "Mobile number must be valid")
    .min(10, "Please enter a valid 10 digit number")
    .max(10, "Please enter a valid 10 digit number")
    .required("Contact number is required"),
});

const ReqVerification = (props) => {
  // console.log("props request verification: ", props?.propertyTypes[0] )
  const history = useHistory();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: props?.userDetails?.user?.emailId ?? "",
      propertyType: props?.reqForm?.propertyType
        ? {
            label: props?.property?.propertyType?.name,
            value: props?.property?.propertyType?.id,
          }
        : "" || "" /* ? {
        label: "",
        value: "",
      }, */,
      region: props?.reqForm?.region
        ? {
            label: props?.property?.region?.name,
            value: props?.property?.region?.id,
          }
        : "" || "" /* ? {
        label: "",
        value: "",
      }, */,
      contact: props?.userDetails?.user?.mobileNumber ?? "",
      name: props?.reqForm?.name ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let data = {
        propertyType: {
          id: values?.propertyType?.value,
        },
        region: {
          id: values?.region?.value,
        },
        name: props?.userDetails?.user?.fullName,
        emailId: props?.userDetails?.user?.emailId,
        contactNumber: values?.contact,
        address: props?.userDetails?.address,
        city: props?.userDetails?.user?.city,
        state: props?.userDetails?.user?.state,
        pincode: props?.userDetails?.user?.pincode,
      };
      props.reqVerificationFormValues(formik.values);

      console.log("values.submitButton", values.submitButton);
      if (values.submitButton === "propertyType") {
        if (props.userDetails?.accessToken) {
          // props.verifyPropertySubmit(data);
          if (location.state?.fromBack && location?.state?.id) {
            history.push("/steps/addressFilling/" + location.state?.id);
            return;
          }
          history.push("/steps/addressFilling", {
            propertyType: values?.propertyType,
            region: values?.region,
          });
        } else {
          props.isLoggedInAction({ isLoggedIn: false, from: "reqForm" });
        }
      } else {
        if (props.userDetails?.accessToken) {
          props.contactMeSubmit(data);
        } else {
          props.isLoggedInAction({ isLoggedIn: false, from: "reqForm" });
        }
      }
    },
    validationSchema: requestSchema,
  });

  useEffect(() => {
    props.getPropertyTypes();
    props.getRegions();
    props.resetProperty();
    // formik.resetForm();

    return () => {
      formik.resetForm();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props?.contactMe?.success) {
      props.alertOpen({
        msg: "Details sent",
        title: "Contact me",
      });
      formik.resetForm();
    }
    //eslint-disable-next-line
  }, [props?.contactMe]);

  useEffect(() => {
    if (location?.state?.propertyType && location?.state?.region) {
      formik.setFieldValue("propertyType", location?.state?.propertyType);
      formik.setFieldValue("region", location?.state?.region);
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <div className={`${props.elevation ? "elv-card" : "card"} w30 form-wrap`}>
      <form
        className="request-property-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <p>Request a property verification</p>
        <Input
          name="name"
          label={"Name"}
          value={formik.values.name}
          formik={formik}
          required={true}
          placeholder="Enter name"
        />
        <Select
          label={"Property Type"}
          name={"propertyType"}
          options={
            props.propertyTypes
              ? props?.propertyTypes?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
          defaultValue={formik?.values?.propertyType}
          formik={formik}
          required={true}
          placeholder="Select..."
        />
        <Select
          label={"Region"}
          name={"region"}
          options={
            props?.regions
              ? props?.regions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
          // defaultValue={formik?.values?.region}
          formik={formik}
          required={true}
          placeholder="Select..."
        />
        <Input
          name="email"
          label={"Email ID"}
          value={formik.values.email}
          formik={formik}
          required={true}
          placeholder="Enter email"
        />
        <Input
          name="contact"
          label={"Contact No"}
          value={formik.values.contact}
          formik={formik}
          required={true}
          placeholder="Enter phone"
        />
        <div className="button-wrap">
          <button
            className={`primary-color ${
              props?.verifyProperty?.loading ? "loadBtn" : ""
            }`}
            type="submit"
            onClick={() => {
              formik.setFieldValue("submitButton", "propertyType");
            }}
          >
            {props?.verifyProperty?.loading
              ? "Processing..."
              : "VERIFY PROPERTY"}
          </button>
          {/* <button
            type="submit"
            onClick={() => {
              formik.setFieldValue("submitButton", "contactMe");
            }}
            className={`secondary-color ${
              props?.contactMe?.loading ? "loadBtn" : ""
            }`}
          >
            {props?.contactMe?.loading ? "Processing..." : "CONTACT ME"}
          </button> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state?.auth?.login,
    isLoggedIn: state?.auth?.isLoggedIn,
    propertyTypes: state?.common?.propertyTypes?.array,
    regions: state?.common?.regions?.array,
    userDetails: state?.auth?.userDetails,
    verifyProperty: state?.propertyContact?.verifyProperty,
    reqForm: state?.propertyContact?.reqFormVals,
    property: state?.propertyContact?.property,
    contactMe: state?.propertyContact?.contactMe,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      isLoggedInAction,
      getPropertyTypes,
      getRegions,
      verifyPropertySubmit: (req) => verifyProperty(req),
      contactMeSubmit: (req) => contactMe(req),
      alertOpen,
      reqVerificationFormValues,
      resetReqVerificationFormValues,
      resetProperty: () => {
        return {
          type: FetchPropertyActionTypes.RESET,
        };
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReqVerification);
