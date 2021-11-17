import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { alertClose } from "../modules/common/Actions";

const Alert = ({ open, closeAlert, msg, title, action }) => {
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
      <div className="flex-center flex-col card p1">
        <h2>{title}</h2>
        <span className="text-center m1">{msg}</span>
        <button
          className="primary-color mt1"
          onClick={() => {
            closeAlert();
            if (action) {
              action();
            }
          }}
        >
          OK
        </button>
      </div>
    </Popup>
  );
};
const mapStateToProps = (state) => {
  return {
    open: state?.common?.alert?.open,
    msg: state?.common?.alert?.msg,
    title: state?.common?.alert?.title,
    action: state?.common?.alert?.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeAlert: () => {
        return alertClose();
      },
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
