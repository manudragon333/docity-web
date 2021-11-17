import WhiteNavBar from "./WhiteNavBar";
// import AssesmentVideo from "../assets/Pexels_Videos.mp4";
import AssesmentOgg from "../assets/Pexels_Videos.ogg";
import "./styles/video.css";
import "./styles/mobile/video.css";
import { useEffect, useState } from "react";
import AssesmentPopup from "./AssesmentPopup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAssessments } from "../modules/civil-engg";
import { useLocation } from "react-router";

const Video = (props) => {
  const getUser = JSON.parse(localStorage.getItem("user"));
  const [openAssesmentPopup, setOpenAssesmentPopup] = useState();
  const location = useLocation();
  useEffect(() => {
    props.fetchAssessments();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location?.state?.openAssesment) {
      setOpenAssesmentPopup(true);
    }
  }, [location?.state]);

  return (
    <div>
      <WhiteNavBar boxShadowBottom={true} />
      <div className="container mt6">
        <div className="d-flex">
          <div className="video-sec mr1">
            <h3 className="text-dark-gray mt1 mb1">
              Mandotary Training and Assesment
            </h3>
            <video controls>
              {/*<source src={AssesmentVideo} type="video/mp4" />*/}
              <source src={AssesmentOgg} type="video/ogg" />
            </video>
          </div>
          <div className="video-instructions ml1 mobile-margin">
            <h3 className="text-dark-gray mt1 mb1">Instructions</h3>
            <div className="elv-card p1">
              <div className="mb2">
                <h3 className="primary-text-color">Training Video:</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Molestias ab sed aspernatur natus quas unde. Distinctio animi
                  quam deserunt. Debitis ducimus quibusdam, similique
                  repudiandae obcaecati explicabo asperiores enim dolorem in!
                </p>
              </div>
              <div>
                <h3 className="primary-text-color">Assesment:</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Molestias ab sed aspernatur natus quas unde. Distinctio animi
                  quam deserunt. Debitis ducimus quibusdam, similique
                  repudiandae obcaecati explicabo asperiores enim dolorem in!
                </p>
              </div>
            </div>
          </div>
        </div>
        {getUser?.assessmentStatus === 4 ? (
          <div className="flex-center mt3">
            <button
              className="primary-color"
              onClick={() => {
                setOpenAssesmentPopup(true);
              }}
            >
              Start Assesment
            </button>
          </div>
        ) : (
          <div className="flex-center mt3">
            <span className="assessment-completed">Assessment Completed</span>
          </div>
        )}
      </div>
      {getUser?.assessmentStatus === 4 ? (
        <AssesmentPopup
          open={openAssesmentPopup}
          setOpen={setOpenAssesmentPopup}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchAssessments,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Video);
