import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./styles/resources.css";

const Resources = () => {
  const [showReadMore, setShowReadMore] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const paraRef = useRef([]);

  useEffect(() => {
    if (paraRef?.current?.clientHeight <= paraRef?.current?.scrollHeight) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, []);

  return (
    <>
      <div className="resources">
        <div className="container">
          <NavBar />

          <div className="title_faq">
            <h1>Resources.</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt2 mb1 content-wrap">
          <h3 className="primary-text-color">Title of content comes here</h3>
          <div
            ref={(ref) => (paraRef.current[0] = ref)}
            className={`para ${showReadMore ? "readMore" : ""}`}
            style={{ color: "#000" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            ab sed aspernatur natus quas unde. Distinctio animi quam deserunt.
            Debitis ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!
          </div>
          <div className="hr"></div>
          <div className="d-flex space-between">
            <div className="d-flex space-between w25 text-gray fw-500">
              <span>By DoCity</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="text-blue fw-500">
              {showMore && !showReadMore ? (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(true);
                  }}
                >
                  Read more...
                </span>
              ) : (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(false);
                  }}
                >
                  Read less...
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt2 mb1 content-wrap">
          <h3 className="primary-text-color">Title of content comes here</h3>
          <div
            ref={(ref) => (paraRef.current[1] = ref)}
            className={`para ${showReadMore ? "readMore" : ""}`}
            style={{ color: "#000" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            ab sed aspernatur natus quas unde. Distinctio animi quam deserunt.
            Debitis ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!
          </div>
          <div className="hr"></div>
          <div className="d-flex space-between">
            <div className="d-flex space-between w25 text-gray fw-500">
              <span>By DoCity</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="text-blue fw-500">
              {showMore ? (
                !showReadMore ? (
                  <span
                    className="cursor"
                    onClick={() => {
                      setShowReadMore(true);
                    }}
                  >
                    Read more...
                  </span>
                ) : (
                  <span
                    className="cursor"
                    onClick={() => {
                      setShowReadMore(false);
                    }}
                  >
                    Read less...
                  </span>
                )
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt2 mb1 content-wrap">
          <h3 className="primary-text-color">Title of content comes here</h3>
          <div
            ref={(ref) => (paraRef.current[2] = ref)}
            className={`para ${showReadMore ? "readMore" : ""}`}
            style={{ color: "#000" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            ab sed aspernatur natus quas unde. Distinctio animi quam deserunt.
            Debitis ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit.
          </div>
          <div className="hr"></div>
          <div className="d-flex space-between">
            <div className="d-flex space-between w20 text-gray fw-500">
              <span>By DoCity</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="text-blue fw-500">
              {showMore && !showReadMore ? (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(true);
                  }}
                >
                  Read more...
                </span>
              ) : (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(false);
                  }}
                >
                  Read less...
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt2 mb1 content-wrap">
          <h3 className="primary-text-color">Title of content comes here</h3>
          <div
            ref={(ref) => (paraRef.current[3] = ref)}
            className={`para ${showReadMore ? "readMore" : ""}`}
            style={{ color: "#000" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            ab sed aspernatur natus quas unde. Distinctio animi quam deserunt.
            Debitis ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestias ab sed aspernatur natus quas unde.
            Distinctio animi quam deserunt. Debitis ducimus quibusdam, similique
            repudiandae obcaecati explicabo asperiores enim dolorem in!Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab sed
            aspernatur natus quas unde. Distinctio animi quam deserunt. Debitis
            ducimus quibusdam, similique repudiandae obcaecati explicabo
            asperiores enim dolorem in!
          </div>
          <div className="hr"></div>
          <div className="d-flex space-between">
            <div className="d-flex space-between w25 text-gray fw-500">
              <span>By DoCity</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="text-blue fw-500">
              {showMore && !showReadMore ? (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(true);
                  }}
                >
                  Read more...
                </span>
              ) : (
                <span
                  className="cursor"
                  onClick={() => {
                    setShowReadMore(false);
                  }}
                >
                  Read less...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;
