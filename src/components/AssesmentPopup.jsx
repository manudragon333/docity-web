import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "./styles/assesment.css";
import Arrow from "../assets/images/backarrow.png";
// import { assessmentQuestions } from "../utils/utils";
import { connect } from "react-redux";
import { Spinner } from "./FinalReportGeneration";
import { bindActionCreators } from "redux";
import { submitAssessmentsRequest } from "../modules/civil-engg";
import moment from "moment";
import { alertOpen } from "../modules/common";

const Question1 = ({
  ques = "",
  options = [],
  type = "text_box",
  id,
  answers,
  setAnswers,
  ...props
}) => {
  return props.loading ? (
    <div className="flex-center">
      <Spinner />
    </div>
  ) : (
    <div className="p1">
      <h4 className="ques gray-black">{ques}</h4>
      {type.toLowerCase() === "text_box" ? (
        <div className="input-wrap">
          {" "}
          <input
            type="text"
            value={answers[id] ? answers[id] : ""}
            onChange={(e) => {
              setAnswers({ ...answers, [id]: e.target.value });
            }}
          />
        </div>
      ) : (
        false
      )}
      {type.toLowerCase() === "single_select" ? (
        <ul className="options">
          {options.map((x, index) => (
            <li key={index}>
              <input
                id={x}
                type="radio"
                name="que1"
                className="radio cursor"
                checked={answers[id] === x}
                value={x}
                onChange={(e) => {
                  setAnswers({ ...answers, [id]: e.target.value });
                }}
              />
              &nbsp;&nbsp;
              <label className="opt" htmlFor={x}>
                {x}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        false
      )}
    </div>
  );
};

const AssesmentPopup = ({ open, setOpen, ...props }) => {
  const history = useHistory();
  const [currentQues, setCurrentQues] = useState(1);
  const [assesment, setAssesment] = useState({});
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState(300);
  const interval = useRef();
  useEffect(() => {
    setAssesment(props?.assesments?.[currentQues - 1]);
    // eslint-disable-next-line
  }, [currentQues]);

  useEffect(() => {
    if (open) {
      interval.current = setTimeout(() => {
        if (interval.current) {
          clearTimeout(interval.current);
        }

        if (duration > 0) {
          let dur = duration;
          setDuration(dur - 1);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(interval.current);
    };
    // eslint-disable-next-line
  }, [duration, open]);

  useEffect(() => {
    if (props?.assesments?.length) {
      setAssesment(props?.assesments?.[0]);
    }
  }, [props.assesments]);

  useEffect(() => {
    if (props?.submitAssessmentsRes?.success) {
      setOpen(false);
      history.push("/civilEnggProfile");
      props.alertOpen({
        msg: "Assessment submitted.",
      });
    }
    // eslint-disable-next-line
  }, [props.submitAssessmentsRes]);

  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      contentStyle={{ width: 700, height: 400 }}
      overlayStyle={{
        background: "#8bbdc5",
      }}
    >
      <div className="card p1 relative h100 d-flex flex-col space-between">
        <div>
          <div className="m-flex space-between mb1">
            <h3 className="primary-text-color">Training Assesment</h3>
            <p>
              <span className="gray-black fw-500">Time left</span>
              <br />
              <span className="text-dark-gray">
                {moment()
                  .hours(0)
                  .minutes(Math.floor(duration / 60))
                  .seconds(duration % 60)
                  .format("mm:ss")}
              </span>
            </p>
          </div>
          <Question1
            ques={assesment?.question}
            options={assesment?.options}
            type={assesment?.questionType}
            id={assesment?.id}
            loading={props.loading}
            setAnswers={setAnswers}
            answers={answers}
            questions={props.assesments}
          />
        </div>
        <div className="assesment-next m-flex space-between">
          <img
            src={Arrow}
            className={currentQues <= 1 ? "pe-none" : "cursor"}
            onClick={() => setCurrentQues(currentQues - 1)}
            alt="arrow"
          />
          <span className="text-gray">
            {currentQues}/{props?.assesments?.length}
          </span>
          <img
            src={Arrow}
            alt="arrow"
            className={`${
              currentQues >= props?.assesments?.length ? "pe-none" : "cursor"
            } rotate`}
            onClick={() => {
              if (currentQues === props?.assesments?.length) {
                return;
              }
              setCurrentQues(currentQues + 1);
            }}
          />
        </div>
        <div className="assesment-btns">
          <button
            onClick={() => {
              setOpen(false);
              setAnswers({});
              setCurrentQues(1);
              clearTimeout(interval);
              setDuration(300);
            }}
          >
            Back to Video
          </button>
          {props.submitAssessmentsRes?.errors?.message && (
            <div className="errorMsg">
              {props.submitAssessmentsRes?.errors?.message}
            </div>
          )}
          <button
            disabled={
              !(Object.keys(answers).length === props.assesments?.length)
            }
            className={`${
              props.submitAssessmentsRes?.loading ? "loadBtn" : ""
            }`}
            onClick={() => {
              let ans = Object.keys(answers).map((item) => {
                return {
                  question: { id: item },
                  answer: answers[item],
                };
              });
              props.submitAssessmentsRequest({
                assessment: ans,
              });
            }}
          >
            {props.submitAssessmentsRes?.loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return {
    assesments: state?.civilEng?.assessments?.list,
    loading: state?.civilEng?.assesments?.loading,
    submitAssessmentsRes: state?.civilEng?.submitAssessment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      submitAssessmentsRequest: (values) => {
        return submitAssessmentsRequest(values);
      },
      alertOpen: (payload) => {
        return alertOpen(payload);
      },
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AssesmentPopup);
