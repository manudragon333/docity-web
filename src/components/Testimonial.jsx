import Next from "../assets/images/next.png";
import Prev from "../assets/images/prev.svg";
import Oval from "../assets/images/oval-copy-2.png";
import Oval1 from "../assets/images/oval-copy-5.png";
import Oval2 from "../assets/images/oval-copy-6.png";
import Oval3 from "../assets/images/oval-copy-7.png";
import Oval4 from "../assets/images/oval-copy-8.png";
import "./styles/testimonial.css";
import { useState } from "react";

const Testimonial = () => {
  const [current, setCurrentNo] = useState(0);
  let arr = [
    <>
      <p className="text-justify">
        Kudos to DoCity and our civil engineer who did an excellent job in
        verifying our property, Thanks to their timely intervention, we were
        able to get full clarity on land use, negotiate a better deal on the
        property and draft an air-tight sales deed. I would highly recommend
        DoCity for all kinds of property buyers.
      </p>
      <div className="oval">
        <div>
          <img src={Oval} alt="oval" />
        </div>
        <div className="d-flex flex-col">
          <span>William Jones</span>
          <span>UI Developer</span>
        </div>
      </div>
    </>,
    <>
      <p className="text-justify">
        Having moved back to India recently, I was finding it very difficult to
        trust middlemen while looking for land. I registered with DoCity to
        explore my options, however, once they got the ball rolling, they
        quickly gained my trust with their professionalism and efficiency. I was
        able to complete my purchase formalities with ease and their
        verification process also gave me a headstart for my future ventures on
        the land I have bought.
      </p>
      <div className="oval">
        <div>
          <img src={Oval} alt="oval" />
        </div>
        <div className="d-flex flex-col">
          <span>William Jones</span>
          <span>UI Developer</span>
        </div>
      </div>
    </>,
    <>
      <p className="text-justify">
        DoCity’s civil engineer has been indispensable in our property purchase.
        If not for DoCity, it would have taken us much longer to authenticate
        and make a purchase. Thanks to their standardised sales deed, I feel
        confident about my decision and know that there aren’t any hidden
        liabilities that could affect the future of my purchase. I’d also like
        to add that being a single woman, Going through DoCity felt much safer
        and professional.
      </p>
      <div className="oval">
        <div>
          <img src={Oval} alt="oval" />
        </div>
        <div className="d-flex flex-col">
          <span>William</span>
          <span>Civil Engineer</span>
        </div>
      </div>
    </>,
    <>
      <p className="text-justify">
        Had a great experience using DoCity for my 3rd property purchase and
        would recommend it to both new and experienced property buyers for its
        convenience and price. They got the job done in 1/4th of the price I
        have paid for my previous property verifications that I got done by
        middlemen. This was much needed. Thank you!
      </p>
      <div className="oval">
        <div>
          <img src={Oval4} alt="oval" />
        </div>
        <div className="d-flex flex-col">
          <span>Patrick</span>
          <span>Real estate agent</span>
        </div>
      </div>
    </>,
  ];

  return (
    <div className="testimonial">
      <h1 className="heading">Testimonials</h1>
      <div className="d-flex">
        <div className="side-head">
          Success stories from our valued customers
        </div>
        <div className="prev-next dsk-view">
          {current === 0 ? (
            <img
              alt={"prevNext"}
              src={current === 0 ? Next : Prev}
              className={`rotate ${current === 3 ? "" : "cursor"}`}
              onClick={() => {
                if (current < 3) {
                  setCurrentNo(current + 1);
                }
              }}
            />
          ) : (
            ""
          )}
          {current > 0 && current < 3 ? (
            <img
              alt={"prevNext"}
              src={current > 0 && current < 3 ? Next : Prev}
              className={`rotate ${current === 3 ? "" : "cursor"}`}
              onClick={() => {
                if (current < 3) {
                  setCurrentNo(current + 1);
                }
              }}
            />
          ) : (
            ""
          )}
          {current === 3 ? (
            <img
              alt={"prevNext"}
              src={current === 3 ? Prev : Next}
              className={`rotate ${current === 3 ? "" : "cursor"}`}
              onClick={() => {
                if (current < 3) {
                  setCurrentNo(current + 1);
                }
              }}
            />
          ) : (
            ""
          )}
          <img
            alt={"prevNext"}
            src={current > 0 ? Next : Prev}
            className={current === 0 ? "" : "cursor"}
            onClick={() => {
              if (current > 0) {
                setCurrentNo(current - 1);
              }
            }}
          />
        </div>
        <div className="d-flex cards-wrap cards-wrap-mobile">
          <div className="elv-card p1 d-flex flex-col space-between">
            {arr[current]}
          </div>
          {current !== 3 && (
            <div className="elv-card p1 d-flex flex-col space-between opacity-half hide-mob">
              {arr[current + 1]}
            </div>
          )}
        </div>
        <div className="prev-next mob-view">
          <img
            alt={"prevNext"}
            src={Next}
            className={`rotate ${current === 3 ? "" : "cursor"}`}
            onClick={() => {
              if (current < 3) {
                setCurrentNo(current + 1);
              }
            }}
          />
          <img
            alt={"prevNext"}
            src={Prev}
            className={current === 0 ? "" : "cursor"}
            onClick={() => {
              if (current > 0) {
                setCurrentNo(current - 1);
              }
            }}
          />
        </div>
      </div>
      <div className="round-imgs">
        <div>
          <img src={Oval1} alt={"oval"} />
          <img src={Oval2} alt={"oval"} />
          <img src={Oval3} alt={"oval"} />
        </div>
        <div>
          <img src={Oval1} alt={"oval"} />
          <img src={Oval2} alt={"oval"} />
          <img src={Oval3} alt={"oval"} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
