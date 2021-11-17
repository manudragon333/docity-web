import Prev from "../../assets/images/prev.svg";

const OurProcessNext = (props) => {
  const { currentNo, setCurrentNo } = props;

  return (
    <div className="nextBg">
      <div className="nextBtns mt3">
        <img
          className="cursor"
          src={Prev}
          onClick={() => {
            if (currentNo > 1) {
              setCurrentNo(currentNo - 1);
            }
          }}
          alt="prev"
        />
        <img
          src={Prev}
          className="rotate cursor"
          onClick={() => {
            if (currentNo < 5) {
              setCurrentNo(currentNo + 1);
            }
          }}
          alt="next"
        />
      </div>
      <div className="nums">
        <span className={currentNo !== 5 ? "active" : ""}>
          0{currentNo === 5 ? currentNo - 1 : currentNo}
        </span>
        <span className={currentNo === 5 ? "active" : ""}>05</span>
      </div>
      <div className="nextLine">
        <div
          className={currentNo === 1 ? "active" : ""}
          onClick={() => {
            setCurrentNo(1);
          }}
        ></div>
        <div
          className={currentNo === 2 ? "active" : ""}
          onClick={() => {
            setCurrentNo(2);
          }}
        ></div>
        <div
          className={currentNo === 3 ? "active" : ""}
          onClick={() => {
            setCurrentNo(3);
          }}
        ></div>
        <div
          className={currentNo === 4 ? "active" : ""}
          onClick={() => {
            setCurrentNo(4);
          }}
        ></div>
        <div
          className={currentNo === 5 ? "active" : ""}
          onClick={() => {
            setCurrentNo(5);
          }}
        ></div>
      </div>
    </div>
  );
};

export default OurProcessNext;
