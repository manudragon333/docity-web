import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators } from "redux";
import { fetchProperty } from "../modules/property-contact";
import "./styles/payment.css";
import { Input } from "./FormComponents/Input";
import Select from "./FormComponents/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import endpoint from "../endpoint";
import { apis } from "../utils/apis";
import InputMask from "react-input-mask";
import { alertOpen } from "../modules/common";
import AlertComponent from "./AlertComponent";

export const RAZOR_PAY_KEY = "rzp_test_lKF18lyqfUNm1V";

const CreditCardSchema = Yup.object().shape({
  name: Yup.string()
    .matches("^[A-Za-z ]*$", "Enter valid name")
    .required("Name is required"),
  number: Yup.string()
    .required("Card number is required")
    .min(19, "Must be valid 16 digit number")
    .max(19, "Must be valid 16 digit number"),
  cvv: Yup.string()
    .matches("^[0-9]*$", "Enter valid CVV")
    .required("CVV is required")
    .max(3, "Must be 3 digits")
    .min(3, "Must be 3 digits"),
  expiry_month: Yup.string().required("Month is required"),
  expiry_year: Yup.string().required("Year is required"),
});
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Netbanking = ({ order_id, currency, amount, ...props }) => {
  const [bank, setBank] = useState("");
  const params = useParams();
  const history = useHistory();
  // const [retry, setRetry] = useState(4);
  return (
    <div className="netbanking">
      <Select
        name="bank"
        label="Select Bank"
        options={
          props.banks
            ? Object.keys(props.banks).map((x) => ({
                label: props.banks[x],
                value: x,
              }))
            : []
        }
        onChange={(e) => {
          setBank(e.value);
        }}
      />
      <button
        disabled={!bank}
        className="paynow w100"
        onClick={() => {
          let options = {
            order_id,
            email: props?.userDetails?.emailId,
            contact: props?.userDetails?.mobileNumber,
            // notes: {
            //   address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
            // },
            method: "netbanking",

            // method specific fields
            bank: bank,
            amount,
            currency,
          };
          let rzPay = new window.Razorpay({
            key: RAZOR_PAY_KEY,
          });
          // rzPay.open();
          rzPay.createPayment(options);

          rzPay.on("payment.error", function (resp) {
            props.alertOpen({ msg: resp.error.description });
          });
          rzPay.on("payment.success", function (resp) {
            endpoint
              .post(`${apis.payCapture}`, {
                rpOrderId: resp?.razorpay_order_id,
                rpPaymentId: resp?.razorpay_payment_id,
              })
              .then((res) => {
                history.push("/steps/ackSec/" + params.id);
              });
          });
        }}
      >
        Pay now
      </button>
    </div>
  );
};

const UPI = ({ order_id, currency, amount, ...props }) => {
  const [validateUPI, setvalidateUPI] = useState(false);
  const [validateAddr, setvalidateAddr] = useState(false);
  const params = useParams();
  const history = useHistory();
  return (
    <div className="netbanking">
      <Input
        name="upi"
        label="Enter UPI address"
        placeholder="Enter UPI"
        onChange={(e) => {
          setvalidateAddr(e.target.value);
        }}
      />
      <div className="d-flex">
        <button
          disabled={!validateAddr}
          className="validate-upi mt1 w50"
          onClick={() => {
            var razorpay = new window.Razorpay({
              key: RAZOR_PAY_KEY,
            });
            razorpay
              .verifyVpa(validateAddr)
              .then(() => {
                setvalidateUPI(true);
              })
              .catch(({ error }) => {
                props.alertOpen({
                  msg: error.description,
                });
                // VPA is invalid, show an error to the user
                setvalidateUPI(false);
              });
          }}
        >
          Validate UPI
        </button>

        <button
          disabled={!validateUPI}
          className="paynow mt1 ml1 w50"
          onClick={() => {
            let options = {
              order_id,
              email: props?.userDetails?.emailId,
              contact: props?.userDetails?.mobileNumber,
              method: "upi",
              upi: {
                vpa: validateAddr,
                flow: "collect",
              },
              amount,
              currency,
            };
            let rzPay = new window.Razorpay({
              key: RAZOR_PAY_KEY,
            });
            // rzPay.open();
            rzPay.createPayment(options);

            rzPay.on("payment.error", function (resp) {
              props.alertOpen({ msg: resp.error.description });
            });
            rzPay.on("payment.success", function (resp) {
              endpoint
                .post(`${apis.payCapture}`, {
                  rpOrderId: resp?.razorpay_order_id,
                  rpPaymentId: resp?.razorpay_payment_id,
                })
                .then((res) => {
                  history.push("/steps/ackSec/" + params.id);
                });
            });
          }}
        >
          Pay now
        </button>
      </div>
    </div>
  );
};
const CreditCard = ({ order_id, currency, amount, ...props }) => {
  const [check, setCheck] = useState(false);
  const params = useParams();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      cvv: "",
      expiry_month: "",
      expiry_year: "",
    },
    onSubmit: (values) => {
      let options = {
        order_id,
        amount,
        currency,
        email: props?.userDetails?.emailId,
        contact: props?.userDetails?.mobileNumber,
        method: "card",
        card: {
          name: values.name,
          number: values.number.replace(/-/g, ""),
          cvv: values.cvv,
          expiry_month: values?.expiry_month,
          expiry_year: values?.expiry_year,
        },
      };
      let rzPay = new window.Razorpay({
        key: RAZOR_PAY_KEY,
      });
      // rzPay.open();
      rzPay.createPayment(options);

      rzPay.on("payment.error", function (resp) {
        props.alertOpen({ msg: resp.error.description });
      });
      rzPay.on("payment.success", function (resp) {
        endpoint
          .post(`${apis.payCapture}`, {
            rpOrderId: resp?.razorpay_order_id,
            rpPaymentId: resp?.razorpay_payment_id,
          })
          .then((res) => {
            history.push("/steps/ackSec/" + params.id);
          });
      });
    },
    validationSchema: CreditCardSchema,
  });

  return (
    <div className="credit-card">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="input-wrap">
            <InputMask
              mask="9999-9999-9999-9999"
              maskChar={""}
              autoComplete="off"
              name={"number"}
              placeholder={"XXXX-XXXX-XXXX-XXXX"}
              value={formik?.values?.["number"]}
              onChange={(e) => {
                formik.setFieldValue("number", e.target.value);
              }}
            >
              {(inputProps) => <input {...inputProps} />}
            </InputMask>
            <label>{"Card number"}</label>
          </div>
          {formik?.errors?.["number"] && formik?.touched?.["number"] && (
            <div className="error">{formik?.errors?.["number"]}</div>
          )}
        </div>

        <Input
          name="name"
          label="Name on card"
          formik={formik}
          placeholder="Enter name"
          // required={true}
        />
        <div className="expiry-cvv d-flex space-between">
          <Select
            name="expiry_month"
            label="Expiry Date"
            placeholder={"mm"}
            options={months.map((x) => ({
              label: x,
              value: x >= 10 ? x : "0" + x,
            }))}
            formik={formik}
            isSetVal={true}
          />
          <Select
            name="expiry_year"
            placeholder={"yyyy"}
            label="Expiry Year"
            hideLabel={true}
            formik={formik}
            options={Array.from({ length: 50 }, (x, i) => ({
              label: i + new Date().getFullYear(),
              value: (i + new Date().getFullYear()).toString().substr(2),
            }))}
            isSetVal={true}
          />
          <Input
            name="cvv"
            label="CVV"
            placeholder={"3 digit number"}
            formik={formik}
            maxLength={3}
          />
        </div>
        <div className="check-terms p1 flex-center">
          <input
            type="checkbox"
            checked={check}
            onChange={(e) => {
              setCheck(e.target.checked);
            }}
          />
          <span className="ml1 text-dark-gray">
            I have read and accept the terms of use and privacy policy
          </span>
        </div>
        <button disabled={!check} className="paynow m1 w90">
          Pay now
        </button>
      </form>
    </div>
  );
};

const Payments = (props) => {
  const params = useParams();
  const history = useHistory();
  const [rzPayMethods, setRzPayMethods] = useState(null);
  const [type, setType] = useState("card");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    props.setStep(3);
    endpoint
      .post(apis.orderId, {
        propertyRequestId: params.id,
      })
      .then((res) => {
        setOrder(res?.data);
      });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (params.id) {
      props.fetchProperty(params.id);
    }
    //eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    if (window.Razorpay) {
      let rzPay = new window.Razorpay({
        key: RAZOR_PAY_KEY,
      });
      rzPay.once("ready", function (response) {
        setRzPayMethods(response.methods);
      });
    }
    //eslint-disable-next-line
  }, [window.Razorpay]);

  const getSec = () => {
    if (type === "card") {
      return (
        <CreditCard
          {...props}
          order_id={order?.id}
          amount={order?.amount}
          currency={order?.currency}
        />
      );
    } else if (type === "netbanking") {
      return (
        <Netbanking
          {...props}
          banks={rzPayMethods?.netbanking}
          order_id={order?.id}
          amount={order?.amount}
          currency={order?.currency}
        />
      );
    } else if (type === "upi") {
      return (
        <UPI
          {...props}
          order_id={order?.id}
          amount={order?.amount}
          currency={order?.currency}
        />
      );
    }
  };

  return (
    <div className="payments">
      <AlertComponent />
      <div className="flex-center mt2 amt-desc mb2">
        <span>Amount Payable: </span>
        <span>Rs 2,000</span>
      </div>
      {props?.property?.paymentStatus?.name !== "success" ? (
        <div className="d-flex jc-center">
          <div>
            <ul className="pay-types">
              <li
                className={type === "card" ? "active" : "cursor"}
                onClick={() => {
                  setType("card");
                }}
              >
                Credit/Debit Card
              </li>
              <li
                className={type === "netbanking" ? "active" : "cursor"}
                onClick={() => {
                  setType("netbanking");
                }}
              >
                Net Banking
              </li>
              <li
                className={type === "upi" ? "active" : "cursor"}
                onClick={() => {
                  setType("upi");
                }}
              >
                UPI
              </li>
            </ul>
          </div>
          {getSec()}
        </div>
      ) : (
        <h4 className="text-gray flex-center">Paid !!!</h4>
      )}
      <div className="pay-btn-wrap mb2">
        <button
          className="secondary-dark mt3"
          onClick={() => {
            history.push("/steps/uploadDocs/" + params.id);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    property: state?.propertyContact?.property,
    userDetails: state?.auth?.userDetails?.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProperty,
      alertOpen,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
