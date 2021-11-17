// import { useFormik } from "formik";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as Yup from "yup";
import {
  contactUsRequest,
  contactUsReset,
  getQueryTypes,
} from "../modules/common";
import { alertOpen } from "../modules/common/Actions";
// import Select from "react-select";
// import { Input } from "./FormComponents/Input";
// import { TextArea } from "./FormComponents/TextArea";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./styles/aboutus.css";
import "./styles/resources.css";

export const phoneRegExp =
  "^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$";

// const ContactUsSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .required("First name is required")
//     .min(3, "First name must be more than 3 characters"),
//   lastName: Yup.string()
//     .required("Last name is required")
//     .min(3, "Last name must be more than 3 characters"),
//   queryTypes: Yup.object().shape({
//     label: Yup.string().required("Query Type is required."),
//     value: Yup.string().required(" "),
//   }),
//   email: Yup.string().email("Enter valid email").required("Email is required"),
//   mobileNumber: Yup.string()
//     // .matches(phoneRegExp, "Please enter a valid mobile number")
//     .min(10, "Please enter a valid 10 digit number")
//     .max(10, "Please enter a valid 10 digit number")
//     .required("Contact number is required"),
//   address: Yup.string().required("Address is required"),
//   message: Yup.string()
//     .required("Message is required")
//     .min(20, "Message should be atleast 20 characters")
//     .max(200, "Message should not more than 200 characters"),
// });

const baseURL = process.env.REACT_APP_BASE_URL;

const ContactUs = (props) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    queryTypes: "",
    emailId: "",
    mobileNumber: "",
    address: "",
    message: "",
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     queryTypes: "",
  //     email: "",
  //     mobileNumber: "",
  //     address: "",
  //     message: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log("contactUs values: ", values);
  //     let value = {
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       queryTypes: values.queryTypes,
  //       email: values.email,
  //       mobileNumber: values.mobileNumber,
  //       address: values.address,
  //       message: values.message,
  //     };
  //     console.log("contactUs values: ", value);
  //     // props.contactUsReset();
  //     // props.contactUsRequest(values);
  //   },
  //   validationSchema: ContactUsSchema,
  // });

  // useEffect(() => {
  //   // props.setFormik({formik);
  //   // props.getQueryTypes();
  //   // formik.resetForm();

  //   // return () => {
  //   //   formik.resetForm();
  //   // };
  //   //eslint-disable-next-line
  // }, []);

  // const { contactUs } = props;

  // useEffect(() => {
  // if (contactUs?.errors?.message) {
  //   props.contactUsReset();
  // }

  // props.contactUsRequest(values);

  //eslint-disable-next-line
  // }, []);

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  // const saveFormData = async () => {
  //   const response = await fetch("/api/registration", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //   });
  //   if (response.status !== 200) {
  //     throw new Error(`Request failed: ${response.status}`);
  //   }
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("values: ", values);
      // props.contactUsRequest(values);
      const res = await axios.post(
        baseURL + "/api/v1/contact/contactUs",
        values
      );
      console.log("response from contact us: ", res);
      setValues({
        firstName: "",
        lastName: "",
        queryTypes: "",
        emailId: "",
        mobileNumber: "",
        address: "",
        message: "",
      });
      formReset();
      alert("Request sent successfully");
      // props.alertOpen({
      //   msg: "Request saved successfully",
      //   title: "Contact Us",
      // });
    } catch (e) {
      alert("Request not sent successfully");
      //  props.alertOpen({
      //   msg: "Request not saved successfully. Try Again later",
      //   title: "Contact Us",
      // });
    }
  };

  const formReset = () => {
    document.getElementById("contactForm").reset();
  };
  return (
    <>
      <div className="resources">
        <div className="container">
          <NavBar />

          <div className="title_faq">
            <h1>Contact Us.</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="aboutus mt3 mb2">
          <div>
            <h3 className="primary-text-color">Ask Us Anything</h3>
            <h3 className="secondary-text-color mt1">
              Let us know how we can help you.
            </h3>
            <form
              id="contactForm"
              className="contactGrid mt2 mb2"
              // onSubmit={formik.handleSubmit}
              onSubmit={onSubmit}
            >
              <div className="grid-wrap-item one">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  className="grid-item-one"
                  // value={formik.values.firstName}
                  // formik={formik}
                  onChange={set("firstName")}
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  className="grid-item-two"
                  // value={formik.values.lastName}
                  // formik={formik}
                  onChange={set("lastName")}
                  required
                />
              </div>
              <div className="grid-wrap-item two ">
                <select
                  name={"queryTypes"}
                  label={"queryTypes"}
                  className="grid-item-one select-sec"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #aaaaaf",
                    color: "#aaaaaf",
                    fontSize: "1rem",
                  }}
                  // options={
                  //   props?.queryTypes
                  //     ? props?.queryTypes?.map((item) => ({
                  //         label: item.name,
                  //         value: item.name,
                  //       }))
                  //     : []
                  // }
                  // formik={formik}
                  // defaultValue={formik?.values?.queryTypes}
                  // placeholder="Select Query Type"
                  onChange={set("queryTypes")}
                  required
                >
                  <option value="">Select Query Type</option>
                  <option value="General">General</option>
                  <option value="Property">Property</option>
                  <option value="Document">Document</option>
                  <option value="Civil Engineer">Civil Engineer</option>
                  <option value="Location">Location</option>
                  {/* {props?.queryTypes
                    ? props?.queryTypes?.map((item, i) => (
                        <option key={i}>{item}</option>
                      ))
                    : []} */}
                </select>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="grid-item-two"
                  // value={formik.values.email}
                  // formik={formik}
                  onChange={set("emailId")}
                />
              </div>
              <div className="grid-wrap-item three">
                <input
                  type="number"
                  minLength="10"
                  maxLength="10"
                  name="mobileNumber"
                  placeholder="Contact"
                  className="grid-item-one"
                  // value={formik.values.mobileNumber}
                  // formik={formik}
                  onChange={set("mobileNumber")}
                />
                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="grid-item-two"
                  // value={formik.values.address}
                  // formik={formik}
                  onChange={set("address")}
                />
              </div>
              <div className="grid-wrap-textarea">
                <textarea
                  name="message"
                  type="text"
                  placeholder="Your Message"
                  // rows="10"
                  className="grid-item-one"
                  // value={formik.values.message}
                  // formik={formik}
                  onChange={set("message")}
                />
              </div>
              <div className="flex-center mt1 mb2 w75">
                {/* <button
                  type="submit"
                  className={`primary-color mt1  ${loading ? "loadBtn" : ""}`}
                >
                  {loading ? "Processing..." : "Submit"}
                </button> */}
                <button type="submit" className={`primary-color mt1  `}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    queryTypes: state?.common?.queryTypes?.array,
    contactUs: state?.common?.contactUs,
    loading: state?.common?.contactUs?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getQueryTypes,
      contactUsRequest: (values) => {
        return contactUsRequest(values);
      },
      contactUsReset: () => {
        return contactUsReset();
      },
      alertOpen: (payload) => {
        return alertOpen(payload);
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
