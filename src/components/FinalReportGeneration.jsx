import Annotation from "react-image-annotation";
import React, { useRef } from "react";
import img from "../assets/images/docs.jpeg";
import { useReactToPrint } from "react-to-print";
// import { findIndex } from "lodash";
import PDFHeader from "./PDFHeader";
import PDFFooter from "./PDFFooter";
// import { jsPDF } from "jspdf";
// import html2pdf from "html2pdf.js";
// import ReactToPdf from "react-to-pdf";\

export const Spinner = () => {
  return (
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );
};

export const ViewFinalReport = (props) => {
  return (
    <div className="view-final-report-div">
      <embed src={props.path} />
    </div>
  );
};

const FinalReport = (props) => {
  console.log("FinalReport props: ", props);
  // const [state, setState] = useState({
  //   annotations: [],
  //   annotation: {},
  //   notes: "",
  //   file: "",
  // });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  /*
      const handlePrint = () => {
        // useReactToPrint({
        //     content: () => componentRef.current,
        // });
        let pdf = new jsPDF();
        pdf.html(componentRef.current, {
            callback: function () {
                // // pdf.save('myDocument.pdf');
                const reader = new FileReader();
                reader.readAsDataURL(pdf.output('blob'));
                reader.onloadend = function () {
                    var base64data = reader.result;
                    props.finalReport({
                        request_id: props?.match?.params?.id,
                        payload: {
                            finalReport: base64data,
                            note: state.notes,
                        },
                    });
                }

                // window.open(pdf.output('bloburl')); // To debug.
            },
            html2canvas: {
                allowTaint: false,
                useCORS: true,
                logging: true
            }
        });
        console.log(componentRef.current)
    }
  * */

  return (
    <>
      <div>
        <button className="primary-color m1" onClick={handlePrint}>
          Download Report
        </button>
      </div>
      <div
        className="final-report-div"
        id="final-report-div"
        ref={componentRef}
      >
        {props.docs &&
          Object.keys(props.docs).map((item, i) => {
            return (
              <div className={i !== 0 ? "mt3" : ""}>
                {/* <h4>{item}</h4> */}
                {props.docs[item].map((x, i) => {
                  return (
                    <>
                      <PDFHeader title={item} properties={props} />
                      <div
                        className="d-flex"
                        style={{
                          minHeight: "700px",
                          height: 850,
                        }}
                      >
                        <div
                          className={`annotate-div ${i !== 0 ? "mt3" : ""} ${
                            props.showClickDrag ? "" : "non-ce"
                          }`}
                        >
                          <Annotation
                            src={x && x.path ? x.path : img}
                            alt={x.path}
                            renderHighlight={(props, index) => {
                              const { geometry, data } = props.annotation;
                              console.log("Annotation index", index, props);
                              // const idx = findIndex(x.comments, (y) => {
                              //   return y.note === data.text;
                              // });
                              const idx = x.comments.findIndex((a) => {
                                return (
                                  a.note === data.text &&
                                  props.annotation.geometry.x === a.positionX &&
                                  props.annotation.geometry.y === a.positionY
                                );
                              });
                              return (
                                <div
                                  style={{
                                    position: "absolute",
                                    left: `${geometry.x}%`,
                                    top: `${geometry.y}%`,
                                    width: 25,
                                    background: "#d97d55",
                                    color: "#fff",
                                    height: 25,
                                    borderRadius: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <span>{idx + 1}</span>
                                </div>
                              );
                            }}
                            annotations={x.comments.map((item) => {
                              let geometry = {
                                x: item.positionX,
                                y: item.positionY,
                                type: item.type,
                                width: item.width,
                                height: item.height,
                              };
                              return {
                                geometry,
                                data: {
                                  text: item.note,
                                  id: Math.random(),
                                },
                              };
                            })}
                            type={"RECTANGLE"}
                            disableAnnotation={true}
                            className="annotate"
                          />
                        </div>
                        <div className="relative w30 mt3">
                          {x.comments.map((item, i) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  marginBottom: "1rem",
                                  marginLeft: "1rem",
                                  marginTop: -20,
                                }}
                              >
                                <div
                                  style={{
                                    top: 25,
                                    fontSize: 10,
                                    position: "relative",
                                    borderRadius: 19,
                                    width: 20,
                                    background: "#d97d55",
                                    color: "#fff",
                                    height: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 900,
                                  }}
                                >
                                  {i + 1}
                                </div>
                                <div
                                  style={{
                                    border: "1px solid #ccc",
                                    borderRadius: 5,
                                    padding: 10,
                                    margin: 10,
                                    fontSize: 14,
                                    color: "#333",
                                  }}
                                >
                                  {i + 1}. {item.note}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <PDFFooter />
                      <div
                        style={{
                          pageBreakAfter: "always",
                        }}
                      ></div>
                    </>
                  );
                })}
              </div>
            );
          })}
        {/* <PDFFooter /> */}
      </div>
    </>
  );
};

export default FinalReport;
