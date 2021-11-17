/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import Select from "react-select";
import Popup from "reactjs-popup";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import Ack from "../assets/images/acknowledgment_success.png";
import Calendar from "../assets/images/calendar.svg";
import Clock from "../assets/images/clock.svg";
import Close from "../assets/images/close.svg";
import Send from "../assets/images/paper-plane.svg";
import AttachmentDark from "../assets/images/paperclip-dark.svg";
import Attachment from "../assets/images/paperclip.svg";
import oval from "../assets/images/user.svg";
import {
  ROLE_CE,
  ROLE_SUPER_ADMIN,
  // ROLE_USER,
  STATUS_LIST,
} from "../constants";
import { APP_BASE_URL, URL_HOSTNAME } from "../endpoint";
import {
  assignCERequest,
  CEPropertyAction,
  fetchCE,
} from "../modules/civil-engg";
// import { getUser } from "../utils/utils";
import {
  addAnnotation,
  fetchProperty,
  FetchPropertyActionTypes,
  finalReport,
  FinalReportActionTypes,
  updateAnnotation,
} from "../modules/property-contact";
import { alertOpen } from "../modules/common";
import { getAccessToken, toBase64 } from "../utils/utils";
import AnnotationComponent from "./Annotations";
import FinalReport, { Spinner, ViewFinalReport } from "./FinalReportGeneration";
import "./styles/viewRequest.css";
import WhiteNavBar from "./WhiteNavBar";
import AlertComponent from "./AlertComponent";
import socketio from "socket.io-client";
// import DownloadLink from "react-download-link";
// import ShareFinalReport from "./ShareFinalReport";
import ShareFinalReportDialog from "./ShareFinalReportDialog";
import SuccessAndCompleted from "../assets/images/success&completed.png";
import Calender from "../assets/images/calender.png";
import Pending from "../assets/images/pending.png";
// import Submit from "../assets/images/submit.png";
// import Inprogress from "../assets/images/inprogress.png";
// import Draft from "../assets/images/draft.png";
// import Assigned from "../assets/images/assigned.png";

const ActionSchema = Yup.object().shape({
  action: Yup.string().required("Action is required"),
  estimated_date: Yup.string().when("action", {
    is: "ACCEPT",
    then: Yup.string().required("Estimated date is required"),
  }),
});

const ViewRequest = (props) => {
  console.log("ViewRequest props: ", props);
  const getUser = localStorage.getItem("user");
  const userRole = JSON.parse(getUser);
  // const [valid, setValid] = useState(true);
  const [showDownload, setShowDownload] = useState({});
  const [view, setView] = useState(false);
  const [viewFinalReport, setViewFinalReport] = useState(false);
  const [doc, setDoc] = useState({});
  const [docType, setDocType] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const { property } = props;

  const [shareDialog, setShareDialog] = useState(false);
  const [shareDialog1, setShareDialog1] = useState(false);
  const [state, setState] = useState({
    notes: "",
    file: "",
    chatText: "",
  });
  const [messages, setMessages] = useState([]);
  console.log("load messages: ", messages);
  const [assignedCE, setAssignedCE] = useState(null);
  const formik = useFormik({
    initialValues: {
      action: "",
      estimated_date: "",
    },
    onSubmit: (values) => {
      props.CEPropertyAction({
        request_id: props?.match?.params?.id,
        action: values.action,
        estimatedFinishDate: values.estimated_date,
      });
    },
    validationSchema: ActionSchema,
  });

  const socket = useRef();

  const loadMessages = () => {
    try {
      socket.current = socketio.connect(`wss://${URL_HOSTNAME}`, {
        auth: {
          token: getAccessToken(),
        },
        query: {
          room: props?.match?.params?.id,
        },
        secure: true,
      });

      socket.current.on("disconnect", () => {
        console.log("disConnected");
      });
      socket.current.on("connect", () => {
        console.log("Connected");
        if (messages.length === 0) {
          socket.current.emit("fetch_messages", {
            propertyRequestId: props?.match?.params?.id,
            room: props?.match?.params?.id,
          });
        }
      });
      socket.current.on("error", (error) => {
        console.log(error.message);
      });
      socket.current.on("show_messages", (messages) => {
        // console.log("show_messages: ", messages);
        setMessages(messages);
      });
      socket.current.on("receive_message", (msg) => {
        // console.log("receive_message: ", msg);
        setState((cState) => ({
          ...cState,
          chatText: "",
          chatFile: null,
          sendLoading: false,
        }));

        if (!messages.find((x) => x._id === msg._id)) {
          setMessages((msgs) => [...msgs, msg]);
        }
        let obj = {
          propertyRequestId: props?.match?.params?.id,
          room: props?.match?.params?.id,
          senderChatID: props?.userId,
          content: state.chatText,
        };
        socket.current.emit("fetch_messages", obj);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    loadMessages();
    //eslint-disable-next-line
  }, []);

  const socketDisconnect = () => {
    if (socket.current && socket.current.connected) {
      socket.current.disconnect();
    }
  };

  const emitMsg = (obj) => {
    console.log("Message Emitting...");
    if (socket.current) {
      socket.current = socketio.connect(`wss://${URL_HOSTNAME}`, {
        auth: {
          token: getAccessToken(),
        },
        query: {
          room: props?.match?.params?.id,
        },
        secure: true,
      });
      socket.current.on("show_messages", (messages) => {
        console.log("show_messages: ", messages);
        setMessages(messages);
      });
      socket.current.emit("send_message", obj);
    }
  };

  useEffect(() => {
    return () => {
      socketDisconnect();
    };
  }, []);

  useEffect(() => {
    props.fetchProperty(props?.match?.params?.id);
    if (props.role === ROLE_SUPER_ADMIN) {
      props.fetchCE();
    }
    //eslint-disable-next-line
  }, [props?.match?.params?.id]);

  useEffect(() => {
    return () => {
      props.resetProperty();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.finalReportRes?.success) {
      setState({
        ...state,
        file: "",
        notes: "",
      });
      if (document.getElementById("final-file")) {
        document.getElementById("final-file").value = "";
      }
      props.fetchProperty(props?.match?.params?.id);
    }
    //eslint-disable-next-line
  }, [props.finalReportRes]);

  useEffect(() => {
    let objDiv = document.getElementById("chat-box");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    //eslint-disable-next-line
  }, [state.sendLoading, state, messages]);

  const handleCESelect = (selectedCE) => {
    props.assignCERequest({
      request_id: props?.match?.params?.id,
      civilEngineer: {
        id: selectedCE.value,
      },
    });
    setAssignedCE(selectedCE);
  };

  useEffect(() => {
    if (
      props.CEData &&
      props?.CEData?.find(
        (item) => item.emailId === property?.civilEngineer?.emailId
      )
    ) {
      setAssignedCE({
        label: props?.CEData?.find(
          (item) => item.emailId === property?.civilEngineer?.emailId
        )?.firstName,
        value: props?.CEData?.find(
          (item) => item.emailId === property?.civilEngineer?.emailId
        )?.id,
      });
    }
    //eslint-disable-next-line
  }, [props.CEData]);

  useEffect(() => {
    if (props.CEActionRes?.success) {
      props.fetchProperty(props?.match?.params?.id);
    }

    if (props.addAnnotationRes?.success) {
      props.fetchProperty(props?.match?.params?.id);
    }
    //eslint-disable-next-line
  }, [props.CEActionRes, props.addAnnotationRes]);

  useEffect(() => {
    if (property && property.documents) {
      setDoc(property.documents[docType]);
    }
    //eslint-disable-next-line
  }, [property]);

  return (
    <div className="view-request">
      <AlertComponent />
      <WhiteNavBar />
      {property.loading && !property.referenceId ? (
        <div className="flex-center relative">
          <div className="mt8 t8 pSticky">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="container mt6">
          <div className="d-flex">
            <div className="d-flex flex-col mr1 w100">
              <div className="elv-card mb1 request-details">
                <h4>REQUEST DETAILS</h4>
                <div className="request-details-space-between">
                  <div className="request-details-id">
                    <span>Request Id: </span>
                    <br />
                    <span style={{ color: "#000", fontWeight: 500 }}>
                      {property?.referenceId}
                    </span>
                  </div>
                  {props.role !== ROLE_CE && (
                    <div>
                      <span>Price: </span>
                      <br />
                      <span style={{ color: "#000", fontWeight: 500 }}>
                        &#x20B9; 2000/-
                      </span>
                    </div>
                  )}
                </div>
                <br />
                <div className="request-details-space-between">
                  <div className="request-details-id">
                    <span>Order Date</span>
                    <br />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#000",
                        fontWeight: 500,
                        marginTop: "3px",
                      }}
                    >
                      <img
                        className="status-submitted-icon"
                        src={Calender}
                        alt="calender"
                      />{" "}
                      &nbsp;
                      {moment(property?.auditInfo?.creationTime).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </div>
                  {props.role !== ROLE_CE && (
                    <div>
                      <span>Payment Status</span>
                      <br />
                      <span className="request-payment-status">
                        {property?.paymentStatus?.name &&
                        property?.paymentStatus?.name === "success" ? (
                          <span
                            className="payment-status-success"
                            style={{ fontWeight: 500, fontSize: "18px" }}
                          >
                            <img
                              className="status-submitted-icon"
                              src={SuccessAndCompleted}
                              alt="submit"
                            />
                            &nbsp;&nbsp;
                            {property?.paymentStatus?.name}
                          </span>
                        ) : (
                          <span
                            className="payment-status-pending"
                            style={{ fontWeight: 500, fontSize: "18px" }}
                          >
                            <img
                              className="status-submitted-icon"
                              src={Pending}
                              alt="pending"
                            />
                            &nbsp;&nbsp;
                            {property?.paymentStatus?.name}
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="elv-card mb1 property-address">
                <h4>Property Address</h4>
                <p>{property?.address}</p>
              </div>
              <div className="elv-card mb1 req-status">
                <h4>Request Status</h4>
                <div>
                  <div className="line"></div>
                  <div className="d-flex space-between req-stat-mobile">
                    <span>
                      {property?.status?.name === "submitted" && (
                        <img className="tick" src={Ack} alt={"ack"} />
                      )}
                      Submitted
                    </span>
                    <span>
                      {property?.status?.name === "assigned" &&
                        property.civilEngineerResponse?.name !== "decline" && (
                          <img className="tick" src={Ack} alt={"ack"} />
                        )}
                      Assigned CE
                    </span>
                    {property.civilEngineerResponse?.name === "decline" ? (
                      <span>
                        <img className="tick" src={Ack} alt={"ack"} />
                        CE Declined
                      </span>
                    ) : (
                      <>
                        <span>
                          {property?.status?.name === "inProgress" && (
                            <img className="tick" src={Ack} alt={"ack"} />
                          )}
                          Inprogress
                        </span>
                        <span>
                          {property?.status?.name === "completed" && (
                            <img className="tick" src={Ack} alt={"ack"} />
                          )}
                          Completed
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {props.role !== ROLE_SUPER_ADMIN ||
              property.civilEngineerResponse?.name === "accept"
                ? props.role !== ROLE_CE && (
                    <div className="elv-card mb1 request-details">
                      <h4>Civil engineer</h4>
                      {property?.civilEngineer?.firstName ? (
                        <>
                          <div className="d-flex space-between">
                            <div>
                              <span>Name:</span>
                              <br />
                              <span style={{ fontWeight: 500, color: "#000" }}>
                                {property?.civilEngineer?.firstName}
                              </span>
                            </div>
                            <div className="w40 text-left">
                              <span>Response: </span>
                              <br />
                              <span style={{ fontWeight: 500, color: "#000" }}>
                                {
                                  STATUS_LIST[
                                    property?.civilEngineerResponse?.id
                                  ]?.name
                                }
                              </span>
                            </div>
                          </div>
                          <div className="d-flex space-between">
                            <div>
                              <span>Contact:</span>
                              <br />
                              <span style={{ fontWeight: 500, color: "#000" }}>
                                {property?.civilEngineer?.mobileNumber}
                              </span>
                            </div>
                            <div
                              className="w40 text-left"
                              // style={{ display: "flex" }}
                            >
                              <span>Status: </span>
                              <br />

                              {STATUS_LIST[property?.status?.id]?.name &&
                              STATUS_LIST[property?.status?.id]?.name ===
                                "Submitted" ? (
                                property?.paymentStatus.name === "success" ? (
                                  <div /* style={{ display: "flex" }} */>
                                    {/* <img
                                      className="status-submitted-icon"
                                      src={Submit}
                                      alt="submit"
                                      style={{ marginTop: "-3px" }}
                                    /> */}
                                    <span className="status-submitted">
                                      {STATUS_LIST[property?.status?.id]?.name}
                                    </span>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    {/* <img
                                      className="status-draft-icon"
                                      src={Draft}
                                      alt="draft"
                                      style={{ marginTop: "-3px" }}
                                    /> */}
                                    <span className="status-draft">Draft</span>
                                  </div>
                                )
                              ) : (
                                ""
                              )}
                              {STATUS_LIST[property?.status?.id]?.name &&
                              STATUS_LIST[property?.status?.id]?.name ===
                                "Assigned" ? (
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  {/* <img
                                    className="status-assigned-icon"
                                    src={Assigned}
                                    alt="assigned"
                                    style={{ marginTop: "-3px" }}
                                  /> */}
                                  <span className="status-assigned">
                                    {STATUS_LIST[property?.status?.id]?.name}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {STATUS_LIST[property?.status?.id]?.name &&
                              STATUS_LIST[property?.status?.id]?.name ===
                                "In Progress" ? (
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  {/* <img
                                    className="status-inprogress-icon"
                                    src={Inprogress}
                                    alt="inprogress"
                                    // style={{ marginTop: "-3px" }}
                                  /> */}
                                  <span className="status-inprogress">
                                    {STATUS_LIST[property?.status?.id]?.name}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {STATUS_LIST[property?.status?.id]?.name &&
                              STATUS_LIST[property?.status?.id]?.name ===
                                "Completed" ? (
                                <div>
                                  {/* <img
                                    className="status-completed-icon"
                                    src={SuccessAndCompleted}
                                    alt="completed"
                                  /> */}
                                  <span className="status-completed">
                                    {STATUS_LIST[property?.status?.id]?.name}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="d-flex space-between">
                            <div>
                              <span>Email:</span>
                              <span
                                className=" w10"
                                style={{ fontWeight: 500, color: "#000" }}
                              >
                                {property?.civilEngineer?.emailId}
                              </span>
                            </div>
                            {property?.civilEngineerResponse?.id === "12" &&
                              property?.estimatedFinishDate && (
                                <div className="w40 text-left">
                                  <span>Est. Finish Date: </span>
                                  <span>{property?.estimatedFinishDate}</span>
                                </div>
                              )}
                          </div>
                        </>
                      ) : (
                        "Not Assigned"
                      )}
                    </div>
                  )
                : null}{" "}
              {props.role === ROLE_CE &&
              property?.status?.name === "assigned" &&
              property?.civilEngineerResponse?.name === "pending" ? (
                <form
                  className="elv-card mb1 request-details"
                  onSubmit={formik.handleSubmit}
                >
                  <h4>Respond To Request</h4>
                  <div className="d-flex space-between w40">
                    <div>
                      <input
                        type="radio"
                        name="action"
                        value={formik?.values?.action}
                        onChange={() =>
                          formik.setFieldValue("action", "ACCEPT")
                        }
                      />
                      &nbsp;&nbsp;
                      <span className="accept">Accept</span>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="action"
                        value={formik?.values?.action}
                        onChange={() =>
                          formik.setFieldValue("action", "DECLINE")
                        }
                      />
                      &nbsp;&nbsp;
                      <span className="decline">Decline</span>
                    </div>
                  </div>
                  {formik?.errors?.action && formik?.touched?.action && (
                    <div className="error">{formik?.errors?.action}</div>
                  )}
                  <div className="d-flex space-between ">
                    <div>
                      <img
                        src={Calendar}
                        alt="calendar"
                        className="calendar-icon"
                      />

                      <span
                        className="sm-text cursor"
                        onClick={() => {
                          setShowDate(!showDate);
                        }}
                      >
                        Select estimated finish date
                      </span>
                      <br />
                      {formik.values.estimated_date && (
                        <span
                          className="nm-text cursor"
                          onClick={() => {
                            setShowDate(!showDate);
                          }}
                        >
                          {formik.values.estimated_date}
                        </span>
                      )}
                      {formik?.errors?.estimated_date &&
                        formik?.touched?.estimated_date && (
                          <div className="error mt1">
                            {formik?.errors?.estimated_date}
                          </div>
                        )}

                      <DatePicker
                        open={showDate}
                        dateFormat="MMMM d, yyyy"
                        className="DatePickerField vHidden"
                        name="estimated_date"
                        onChange={(date) => {
                          formik.setFieldValue(
                            "estimated_date",
                            moment(date).format("DD/MM/YYYY")
                          );
                          setShowDate(false);
                        }}
                        popperPlacement={"top"}
                        minDate={new Date()}
                        onClickOutside={() => {
                          setShowDate(false);
                        }}
                      />
                    </div>
                    <div>
                      <button
                        className={`${
                          props.CEActionRes?.loading ? "loadBtn" : ""
                        } primary-color`}
                        type="submit"
                      >
                        {props.CEActionRes?.loading
                          ? "Processing..."
                          : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                false
              )}
              {props.role === ROLE_SUPER_ADMIN &&
              property.civilEngineerResponse?.name !== "accept" ? (
                <div className="elv-card mb1 request-details">
                  <div className="d-flex space-between">
                    <h4>Assign CE</h4>
                    <div className="w50">
                      <Select
                        className="w100"
                        name={"propertyType"}
                        value={assignedCE}
                        // isDisabled={property?.civilEngineer?.emailId}
                        options={
                          props?.CEData
                            ? props?.CEData?.map((item) => ({
                                label: item.firstName,
                                value: item.id,
                              }))
                            : []
                        }
                        onChange={handleCESelect}
                      />
                    </div>
                  </div>

                  <div className="d-flex space-between">
                    <div>
                      <span>Name:</span>
                      <span style={{ fontWeight: 500, color: "#000" }}>
                        {property?.civilEngineer?.firstName}
                      </span>
                    </div>
                    <div>
                      <span>Response: </span>
                      <span style={{ fontWeight: 500, color: "#000" }}>
                        {STATUS_LIST[property?.civilEngineerResponse?.id]?.name}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex space-between">
                    <div>
                      <span>Contact:</span>
                      <span style={{ fontWeight: 500, color: "#000" }}>
                        {property?.civilEngineer?.mobileNumber}
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <span>Status: </span>
                      {STATUS_LIST[property?.status?.id]?.name &&
                      STATUS_LIST[property?.status?.id]?.name ===
                        "Submitted" ? (
                        property?.paymentStatus.name === "success" ? (
                          <div style={{ display: "flex" }}>
                            {/* <img
                              className="status-submitted-icon"
                              src={Submit}
                              alt="submit"
                              style={{ marginTop: "-3px" }}
                            /> */}
                            <span className="status-submitted">
                              {STATUS_LIST[property?.status?.id]?.name}
                            </span>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            {/* <img
                              className="status-draft-icon"
                              src={Draft}
                              alt="draft"
                              style={{ marginTop: "-3px" }}
                            /> */}
                            <span className="status-draft">Draft</span>
                          </div>
                        )
                      ) : (
                        ""
                      )}
                      {STATUS_LIST[property?.status?.id]?.name &&
                      STATUS_LIST[property?.status?.id]?.name === "Assigned" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <img
                            className="status-assigned-icon"
                            src={Assigned}
                            alt="assigned"
                            style={{ marginTop: "-3px" }}
                          /> */}
                          <span className="status-assigned">
                            {STATUS_LIST[property?.status?.id]?.name}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {STATUS_LIST[property?.status?.id]?.name &&
                      STATUS_LIST[property?.status?.id]?.name ===
                        "In Progress" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <img
                            className="status-inprogress-icon"
                            src={Inprogress}
                            alt="inprogress"
                            style={{ marginTop: "-3px" }}
                          /> */}
                          <span className="status-inprogress">
                            {STATUS_LIST[property?.status?.id]?.name}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {STATUS_LIST[property?.status?.id]?.name &&
                      STATUS_LIST[property?.status?.id]?.name ===
                        "Completed" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <img
                            className="status-completed-icon"
                            src={SuccessAndCompleted}
                            alt="completed"
                            style={{ marginTop: "-3px" }}
                          /> */}
                          <span className="status-completed">
                            {STATUS_LIST[property?.status?.id]?.name}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="d-flex space-between">
                    <div>
                      <span>Email:</span>
                      <span
                        className="w10"
                        style={{ fontWeight: 500, color: "#000" }}
                      >
                        {property?.civilEngineer?.emailId}
                      </span>
                    </div>
                    {property?.estimatedFinishDate && (
                      <div>
                        <span>Est. Finish Date: </span>
                        <span>{property?.estimatedFinishDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                false
              )}
              {property.civilEngineerResponse?.name !== "decline" &&
                property.civilEngineerResponse?.name !== "pending" && (
                  <div className="elv-card mb1 final-report">
                    <h4>Final Report</h4>
                    <div className="finalReport">
                      {!property?.finalReport && props.role !== ROLE_CE && (
                        <p>Report not generated</p>
                      )}
                      {props.role === ROLE_CE && !property?.finalReport && (
                        <button
                          disabled={property?.documents?.length === 0}
                          className="primary-color mb1  mt2"
                          onClick={() => {
                            setGenerateReport(true);
                          }}
                        >
                          {" "}
                          Generate Report{" "}
                        </button>
                      )}
                    </div>
                    {property?.finalReport?.note && (
                      <>
                        <div>
                          <div
                            className="relative"
                            onMouseEnter={() => {
                              setShowDownload({ finalReport: true });
                            }}
                            onMouseLeave={() => {
                              setShowDownload({ finalReport: false });
                            }}
                          >
                            <embed src={property?.finalReport?.path} />
                            {/* <FileViewer
                          fileType={"pdf"}
                          filePath={property?.finalReport?.path}
                          errorComponent={CustomErrorComponent}
                          onError={(err) => {
                            console.log("err", err);
                          }}
                        /> */}
                            {/* <PDFViewer
                          document={{
                            url: property?.finalReport?.path,
                          }}
                        /> */}
                            {showDownload?.finalReport ? (
                              <div className="download flex-center flex-col">
                                <button
                                  className="mb1"
                                  onClick={() => {
                                    setViewFinalReport(true);
                                  }}
                                >
                                  View
                                </button>
                                <button className="mb1">
                                  <a
                                    href={property?.finalReport?.path}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    Download
                                  </a>
                                </button>
                                <button
                                  onClick={() => {
                                    setShareDialog(true);
                                  }}
                                >
                                  Share
                                </button>
                              </div>
                            ) : null}
                            <ShareFinalReportDialog
                              open={shareDialog}
                              setOpen={setShareDialog}
                              share={property?.finalReport?.path}
                            />
                          </div>
                        </div>

                        <div className="analysis">
                          <span className="text-dark-gray">
                            Overall Report Notes:
                          </span>
                          <p className="text-gray">
                            {property?.finalReport?.note}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              {props.role === ROLE_CE &&
                !property?.finalReport &&
                property.civilEngineerResponse?.name !== "decline" &&
                property.civilEngineerResponse?.name !== "pending" && (
                  <div className="elv-card mb1 final-report">
                    <h4>Report submission</h4>
                    <div className="finalReport">
                      <div className="textarea-wrap p1">
                        <textarea
                          autoComplete="off"
                          rows={"4"}
                          value={state.notes}
                          onChange={(e) => {
                            setState({ ...state, notes: e.target.value });
                          }}
                        />
                      </div>
                      <div className="ml1">
                        <input
                          id="final-file"
                          className="d-none"
                          accept="application/pdf"
                          type="file"
                          onChange={(e) => {
                            if (
                              !["application/pdf"].includes(
                                e.target.files[0].type
                              )
                            ) {
                              props.alertOpen({
                                msg: "PDF format only allowed",
                              });
                              return;
                            }
                            setState({
                              ...state,
                              file: e.target.files[0],
                            });
                          }}
                        />
                        <div className="fileStyle cursor">
                          <span
                            className="ellipsis text-dark-gray"
                            onClick={() => {
                              document.getElementById("final-file").click();
                            }}
                          >
                            {state?.file?.name
                              ? state?.file?.name
                              : "Upload generated report"}
                          </span>
                          {props.finalReportRes?.loading ? <Spinner /> : ""}
                        </div>
                        <br />
                        {props.finalReportRes?.errors?.message && (
                          <span className="error mt1">
                            {props.finalReportRes?.errors?.message}
                          </span>
                        )}
                      </div>
                      <button
                        className={`primary-color m1 btnRight ${
                          props.finalReportRes?.loading ? "loadBtn" : ""
                        }`}
                        type="button"
                        disabled={!state.file || !state.notes}
                        onClick={() => {
                          props.resetFinalReport();
                          let formData = new FormData();
                          formData.append("finalReport", state.file);
                          formData.append("note", state.notes);
                          props.finalReport({
                            request_id: props?.match?.params?.id,
                            payload: formData,
                          });
                        }}
                      >
                        {props.finalReportRes?.loading
                          ? "Processing..."
                          : "Send Report"}
                      </button>
                    </div>
                  </div>
                )}
            </div>
            <div className="elv-card m9 mr1 mb1 w100 upload-sec">
              <div className="p1 upload-docs" style={{ overflowY: "scroll" }}>
                <h4>Documents</h4>
                <div className="img-sec scroll-sec">
                  {property &&
                    property.documents &&
                    Object.keys(property.documents)?.map((item, id) => (
                      <div key={id}>
                        <h4>{item}</h4>
                        <div
                          className="relative"
                          onMouseEnter={() => {
                            setShowDownload({ [item]: true });
                          }}
                          onMouseLeave={() => {
                            setShowDownload({ [item]: false });
                          }}
                        >
                          <img
                            className="ellipsis-image"
                            src={property?.documents[item]?.[0]?.path}
                            alt={property?.documents[item]?.[0]?.path}
                          />
                          {/* <FileViewer
                        fileType={item.mimeType.split("/")[1]}
                        filePath={APP_BASE_URL + item.path}
                        errorComponent={CustomErrorComponent}
                        onError={(err) => {
                          console.log("err", err);
                        }}
                      /> */}
                          {showDownload[item] ? (
                            <div className="download flex-center flex-col">
                              <button
                                className="mt1"
                                onClick={() => {
                                  setView(true);
                                  setDoc(property?.documents[item]);
                                  setDocType(item);
                                }}
                              >
                                View
                              </button>
                              {/* <button className="mt1 mb1" id="blobDownload">
                                <a
                                  href={property?.documents[item][0].path}
                                  download
                                  target="_blank"
                                  rel="noreferrer noopener"
                                >
                                  Download
                                </a>
                              </button> */}
                              {/* <button
                                onClick={() => {
                                  setShareDialog1(true);
                                }}
                              >
                                Share
                              </button> */}
                            </div>
                          ) : null}
                          <ShareFinalReportDialog
                            open={shareDialog1}
                            setOpen={setShareDialog1}
                            share={property?.documents[item][0].path}
                          />
                        </div>
                        <div>
                          {property?.documents.Saledeed.map((item, index) => (
                            <div key={index}>
                              {item.notes ? (
                                <span className="text-dark-gray">
                                  Notes {index + 1}:
                                </span>
                              ) : (
                                ""
                              )}
                              <p className="text-gray">
                                {/* {property?.documents[item]?.[0]?.notes} */}
                                {
                                  item.notes /*  && item.notes
                                  ? item.notes
                                  : "Notes not found" */
                                }
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="elv-card m9 mr1 w100 chat-sec mb1  relative">
              <h4>Notes</h4>
              <div className="chat-box" id="chat-box">
                {messages.length === 0 ? (
                  <div className="msg flex-center h-inherit">Let's Talk</div>
                ) : (
                  messages.map((item, index) => (
                    <div key={index}>
                      {item?.senderId === userRole.id && (
                        <div
                          className="p1"
                          key={"chat " + item.id}
                          style={{
                            backgroundColor: "brown",
                            margin: "1rem .5rem 1rem 3rem",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="d-flex"
                            style={{ alignItems: "center" }}
                          >
                            <img src={oval} className="userpic" alt="oval" />
                            <div>
                              <div className="username">
                                {item?.auditInfo?.createdBy?.name}
                              </div>
                              {/* <div className="msg">{item?.content}</div> */}
                            </div>
                          </div>
                          <div style={{ paddingTop: "1rem" }}>
                            {/* <div className="username">
                          {item?.auditInfo?.createdBy?.name}
                        </div> */}
                            <div className="msg" style={{ color: "#cfd8dc" }}>
                              {item?.content}
                            </div>
                          </div>
                          <div className="d-flex space-between">
                            {item.attachmentPath ? (
                              <div className="flex-center chat-attachment">
                                <img src={Attachment} alt="attachment" />
                                <span className="available">
                                  <a
                                    href={item.attachmentPath}
                                    download
                                    className="available"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    Attachment available
                                  </a>
                                </span>
                              </div>
                            ) : (
                              // <div className="flex-center chat-attachment">
                              //   <img src={AttachmentDark} alt="attachment" />
                              //   <span>No attachment</span>
                              // </div>
                              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            )}

                            <div className="flex-center chat-time">
                              <img src={Clock} alt="clock" />
                              <span>
                                {moment(item?.auditInfo?.creationTime).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </span>
                            </div>
                          </div>
                          {/* <div className="hr"></div> */}
                        </div>
                      )}
                      {item?.senderId !== userRole.id && (
                        <div
                          className="p1"
                          key={"chat " + item.id}
                          style={{
                            backgroundColor: "#0d47a1",
                            margin: "1rem 3rem 1rem 0.5rem",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="d-flex"
                            style={{ alignItems: "center" }}
                          >
                            <img src={oval} className="userpic" alt="oval" />
                            <div>
                              <div className="username">
                                {item?.auditInfo?.createdBy?.name}
                              </div>
                              {/* <div className="msg">{item?.content}</div> */}
                            </div>
                          </div>
                          <div style={{ paddingTop: "1rem" }}>
                            {/* <div className="username">
                          {item?.auditInfo?.createdBy?.name}
                        </div> */}
                            <div className="msg" style={{ color: "#cfd8dc" }}>
                              {item?.content}
                            </div>
                          </div>
                          <div className="d-flex space-between">
                            {item.attachmentPath ? (
                              <div className="flex-center chat-attachment">
                                <img src={Attachment} alt="attachment" />
                                <span className="available">
                                  <a
                                    href={item.attachmentPath}
                                    download
                                    className="available"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    Attachment available
                                  </a>
                                </span>
                              </div>
                            ) : (
                              //  <div className="flex-center chat-attachment">
                              // <img src={AttachmentDark} alt="attachment" />
                              // <span>No attachment</span>
                              // </div>
                              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            )}

                            <div className="flex-center chat-time">
                              <img src={Clock} alt="clock" />
                              <span>
                                {moment(item?.auditInfo?.creationTime).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </span>
                            </div>
                          </div>
                          {/* <div className="hr"></div> */}
                        </div>
                      )}
                    </div>
                  ))
                )}
                {state.sendLoading && (
                  <div className="stage">
                    <div className="dot-flashing"></div>
                  </div>
                )}
              </div>
              {state.chatFile && (
                <div
                  className={`fileStyle cursor chatFile ${
                    state.sendLoading ? "loadBtn" : ""
                  }`}
                >
                  <span className="ellipsis text-dark-gray">
                    {state.chatFile.name}
                  </span>
                  <img
                    src={Close}
                    alt={"close"}
                    onClick={() => {
                      setState({
                        ...state,
                        chatFile: "",
                      });
                    }}
                    className="cursor"
                  />
                </div>
              )}
              <div
                className={`chat-input relative ${
                  state.sendLoading ? "loadBtn" : ""
                }`}
              >
                <input
                  required={true}
                  placeholder={"Add Notes"}
                  value={state.chatText}
                  onChange={(e) => {
                    setState({
                      ...state,
                      chatText: e.target.value,
                    });
                  }}
                  onKeyUp={async (e) => {
                    if (e.keyCode === 13) {
                      let to;
                      setState({
                        ...state,
                        sendLoading: true,
                      });

                      if (to) {
                        clearTimeout(to);
                      }
                      let obj = {
                        propertyRequestId: props?.match?.params?.id,
                        room: props?.match?.params?.id,
                        senderChatID: props?.userId,
                        content: state.chatText,
                      };

                      if (state.chatFile) {
                        obj.attachment = await toBase64(state.chatFile);
                        obj.attachmentType = state.chatFile?.type;
                      }
                      emitMsg(obj);
                    }
                  }}
                />
                <div className="border-lr">
                  <input
                    id="chatFile"
                    type="file"
                    className="d-none"
                    onChange={(e) => {
                      setState({
                        ...state,
                        chatFile: e.target.files[0],
                      });
                    }}
                  />
                  <img
                    src={Attachment}
                    className="attachment cursor"
                    alt="attachment"
                    onClick={() => {
                      document.getElementById("chatFile").click();
                    }}
                  />
                </div>
                <img
                  src={Send}
                  className="send cursor"
                  alt="send"
                  id="sendMessageAttach"
                  onClick={async () => {
                    setState({
                      ...state,
                      sendLoading: true,
                    });
                    let obj = {
                      propertyRequestId: props?.match?.params?.id,
                      room: props?.match?.params?.id,
                      senderChatID: props?.userId,
                      content: state.chatText,
                    };

                    if (state.chatFile) {
                      obj.attachment = await toBase64(state.chatFile);
                      obj.attachmentType = state.chatFile?.type;
                    }

                    if (!state.chatFile && state.chatText === "") {
                      console.log("state.chatFile: ", state.chatFile);
                      console.log("state.chatText: ", state.chatText);
                      // setValid(false);
                    } else {
                      // setValid(true);
                      emitMsg(obj);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Popup
        open={view}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 940 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
          zIndex: 1001,
        }}
      >
        <div className="card">
          <div className="relative w100">
            <div
              className="p1 d-flex flex-end cursor"
              onClick={() => {
                setView(false);
              }}
            >
              <img src={Close} alt="close" width="20px" />
            </div>
          </div>
          <AnnotationComponent
            {...props}
            doc={doc}
            baseUrl={APP_BASE_URL}
            isCE={props.role === ROLE_CE}
          />
        </div>
      </Popup>
      <Popup
        open={generateReport}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 940 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="card mt6">
          <div className="relative w100">
            <div
              className="p1 d-flex flex-end cursor"
              onClick={() => {
                setGenerateReport(false);
              }}
            >
              <img src={Close} alt="close" width="20px" />
            </div>
          </div>
          <FinalReport
            {...props}
            docs={props?.property?.documents}
            baseUrl={APP_BASE_URL}
            showClickDrag={false}
          />
        </div>
      </Popup>
      <Popup
        open={viewFinalReport}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 940 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="card mt6">
          <div className="relative w100">
            <div
              className="p1 d-flex space-between cursor"
              onClick={() => {
                setViewFinalReport(false);
              }}
            >
              <div className="primary-text-color md-text fw-500">
                Final report with comments from civil engineer
              </div>
              <img src={Close} alt="close" width="20px" />
            </div>
          </div>
          <ViewFinalReport
            path={property?.finalReport?.path}
            baseUrl={APP_BASE_URL}
          />
        </div>
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    property: state?.propertyContact?.property,
    CEData: state?.civilEng?.CEData?.list,
    assignCE: state?.civilEng?.assign,
    role: state?.auth?.userDetails?.user?.role[0]?.name,
    userId: state?.auth?.userDetails?.user?.id,
    CEActionRes: state?.civilEng?.CEPropertyAction,
    addAnnotationRes: state?.propertyContact?.addAnnotation,
    finalReportRes: state?.propertyContact?.finalReport,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProperty,
      fetchCE,
      assignCERequest,
      CEPropertyAction,
      addAnnotation,
      updateAnnotation,
      finalReport,
      alertOpen,
      resetProperty: () => {
        return {
          type: FetchPropertyActionTypes.RESET,
        };
      },
      resetFinalReport: () => {
        return {
          type: FinalReportActionTypes.RESET,
        };
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);
