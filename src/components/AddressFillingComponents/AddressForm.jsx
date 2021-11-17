import { useFormik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { alertOpen, getPropertyTypes, getRegions } from "../../modules/common";
import { Input } from "../FormComponents/Input";
import Select from "../FormComponents/Select";
import {
  fetchProperty,
  FetchPropertyActionTypes,
  updateVerifyProperty,
  verifyProperty,
  verifyPropertyReset,
} from "../../modules/property-contact";
import * as Yup from "yup";
import AlertComponent from "../AlertComponent";

const addressSchema = Yup.object().shape({
  propertyType: Yup.object().shape({
    label: Yup.string().required("Property type is required"),
    value: Yup.string().required("Property type is required"),
  }),
  region: Yup.object().shape({
    label: Yup.string().required("Region is required"),
    value: Yup.string().required(),
  }),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  pincode: Yup.string()
    .matches("^[0-9]{2,8}$", "Enter valid pincode.")
    .required("Pincode is required"),
  state: Yup.string().required("State is required"),
});

const AddressForm = (props) => {
  console.log("AddressForm props: ", props.property)
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: props?.property?.address || "",
      city: props?.property?.city || "",
      state: props?.property?.state || "",
      pincode: props?.property?.pincode || "",
      propertyType: props?.property?.propertyType
        ? {
            label: props?.property?.propertyType?.name,
            value: props?.property?.propertyType?.id,
          }
        : "" || "",
      region: props?.property?.region
        ? {
            label: props?.property?.region?.name,
            value: props?.property?.region?.id,
          }
        : "" || "",
      latitude: props?.property?.latitude || "",
      longitude: props?.property?.longitude || "",
    },
    onSubmit: (values) => {
      let vals = { ...values };
      // let vals = { ...values, ...{ latitude: 17.38714, longitude: 78.491684 } };
      if (!vals.latitude || !vals.longitude) {
        props.alertOpen({
          msg:
            "Please select the address from map. Latitude/Longitude are missing",
        });
        return;
      }
      vals.propertyType = {
        id: values.propertyType.value,
      };
      vals.region = {
        id: values.region.value,
      };
      if (params.id) {
        vals.propertyRequestId = params.id;
        props.updateVerifyProperty(vals);
      } else {
        props.verifyPropertySubmit(vals);
      }
      props.setStep(2);
    },
    validationSchema: addressSchema,
  });

  useEffect(() => {
    props.setFormik(formik);
    props.getPropertyTypes();
    props.getRegions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (params.id) {
      props.fetchProperty(params.id);
    } else {
      props.resetProperty();
    }
    // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    if (location?.state?.propertyType && location?.state?.region) {
      formik.setFieldValue("propertyType", location?.state?.propertyType);
      formik.setFieldValue("region", location?.state?.region);
    }
    // eslint-disable-next-line
  }, [location.state]);

  useEffect(() => {
    if (
      props?.property?.success &&
      props?.propertyTypes?.length &&
      props?.regions?.length
    ) {
      formik.resetForm({
        address: props?.property?.address || "",
        city: props?.property?.city || "",
        state: props?.property?.state || "",
        pincode: props?.property?.pincode || "",
        latitude: props?.property?.latitude || "",
        longitude: props?.property?.longitude || "",
      });
    }
    // eslint-disable-next-line
  }, [props.property, props.propertyTypes, props.regions]);

  useEffect(() => {
    if (props?.verifyProperty?.success) {
      history.push("/steps/uploadDocs/" + props?.property?.id);
      props.verifyPropertyReset();
    }
    // eslint-disable-next-line
  }, [props?.verifyProperty]);

  return (
    <div className="address-filling-form">
      <AlertComponent />
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="address"
          label={"Address"}
          value={formik.values.address}
          formik={formik}
          placeholder="Enter address"
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
          formik={formik}
          defaultValue={formik?.values?.propertyType}
          className="w100"
        />
        <Select
          label={"Region"}
          name={"region"}
          options={
            props.regions
              ? props?.regions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
          formik={formik}
          defaultValue={formik?.values?.region}
          className="w100"
        />
        <Input
          name="city"
          label={"City"}
          value={formik.values.city}
          formik={formik}
          placeholder="Enter city"
        />
        <Input
          name="state"
          label={"State"}
          value={formik.values.state}
          formik={formik}
          placeholder="Enter state"
        />
        <Input
          name="pincode"
          label={"Pincode"}
          value={formik.values.pincode}
          formik={formik}
          placeholder="Enter pincode"
        />
        <div className="button-wrap flex-center">
          <button
            type="button"
            className="secondary-dark"
            onClick={() => {
              history.push("/", {
                fromBack: true,
                id: params.id,
              });
            }}
          >
            BACK
          </button>
          <button
            className={`primary-color ${
              props?.verifyProperty?.loading ? "loadBtn" : ""
            }`}
            type="submit"
          >
            {props?.verifyProperty?.loading ? "Processing..." : "NEXT"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    propertyTypes: state?.common?.propertyTypes?.array,
    regions: state?.common?.regions?.array,
    verifyProperty: state?.propertyContact?.verifyProperty,
    property: state?.propertyContact?.property,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPropertyTypes,
      fetchProperty,
      getRegions,
      alertOpen,
      updateVerifyProperty,
      verifyPropertySubmit: (req) => verifyProperty(req),
      verifyPropertyReset,
      resetProperty: () => {
        return {
          type: FetchPropertyActionTypes.RESET,
        };
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
