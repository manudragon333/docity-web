import Popup from "reactjs-popup";

const Thankyou = ({ open, setOpen, msg }) => {
  return (
    <Popup
      open={true}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      contentStyle={{ width: 400 }}
      overlayStyle={{
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex-center flex-col card p1">
        <h2>Thank You</h2>
        <span className="text-center m1">
          Thank you for choosing DoCity. Our Executive will get back to provide
          you service.
        </span>

        <button
          className="primary-color mt1"
          onClick={() => {
            setOpen(false);
          }}
        >
          OK
        </button>
      </div>
    </Popup>
  );
};

export default Thankyou;
