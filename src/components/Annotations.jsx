import Annotation from "react-image-annotation";
import {
  PointSelector,
  // RectangleSelector,
  // OvalSelector,
} from "react-image-annotation/lib/selectors";
import React from "react";
import img from "../assets/images/docs.jpeg";
import { ROLE_CE } from "../constants";
// import { AnnotationFactory } from "annotpdf";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/umd/Page/AnnotationLayer.css";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// import WebViewer from "@pdftron/pdfjs-express";

// export const AppViewer = (props) => {
//   const viewer = useRef(null);

//   // if using a class, equivalent of componentDidMount

//   useEffect(() => {
//     WebViewer(
//       {
//         path: "/webviewer/lib",
//         initialDoc: props?.baseUrl + props?.doc?.path,
//       },
//       viewer.current
//     ).then((instance) => {
//       console.log("instance", instance);
//       // instance.loadDocument(
//       //   "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
//       // );
//       const { docViewer, Annotations } = instance;
//       const annotManager = docViewer.getAnnotationManager();

//       annotManager.on("annotationChanged", (annotations, action) => {
//         if (action === "add") {
//           console.log("this is a change that added annotations");
//         } else if (action === "modify") {
//           console.log("this change modified annotations");
//         } else if (action === "delete") {
//           console.log("there were annotations deleted");
//         }

//         annotations.forEach((annot) => {
//           console.log(
//             "annotation page number",
//             annot.PageNumber,
//             annot.X,
//             annot.Y,
//             annot.Width,
//             annot.Height,
//             annot.Subject
//           );
//         });
//       });

//       docViewer.on("documentLoaded", () => {
//         const rectangleAnnot = new Annotations.RectangleAnnotation();
//         rectangleAnnot.PageNumber = 1;
//         // values are in page coordinates with (0, 0) in the top left
//         rectangleAnnot.X = 100;
//         rectangleAnnot.Y = 150;
//         rectangleAnnot.Width = 200;
//         rectangleAnnot.Height = 50;
//         rectangleAnnot.Author = annotManager.getCurrentUser();

//         annotManager.addAnnotation(rectangleAnnot);
//         // need to draw the annotation otherwise it won't show up until the page is refreshed
//         annotManager.redrawAnnotation(rectangleAnnot);
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       <div className="webviewer" ref={viewer} style={{ height: "30rem" }}></div>
//     </div>
//   );
// };

export default class AnnotationComponent extends React.Component {
  state = {
    annotations: [],
    annotation: {},
    numPages: 0,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  onChange = (annotation, id) => {
    this.setState({ [id]: annotation });
  };

  onSubmit = (annotation, pageNumber, doc) => {
    const { geometry, data } = annotation;

    let annote = {
      ...geometry,
      positionX: geometry.x,
      positionY: geometry.y,
      note: data.text,
      pageNumber,
    };
    delete annote.x;
    delete annote.y;

    this.props.addAnnotation({
      doc_id: doc.id,
      request_id: this.props?.match?.params?.id,
      payload: annote,
    });
    console.log(annote, "haskjhasdkjhkj");
    this.setState({
      [doc.id]: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      }),
    });
  };

  // componentDidMount() {
  //   let pdfContainer = document.getElementById("viewerContainer");
  //   let pdfUrl =
  //     "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
  //   let pdfViewer = new window.pdfjsViewer.PDFViewer({
  //     container: pdfContainer,
  //   });

  //   let loadingTask = window.pdfjsLib.getDocument({
  //     url: pdfUrl,
  //   });
  //   loadingTask.promise.then((pdfDocument) => {
  //     // pdfDocument.getData().then((data) => {
  //     //   pdfFactory = new pdfAnnotate.AnnotationFactory(data);
  //     // });
  //     pdfViewer.setDocument(pdfDocument);
  //     setTimeout(() => {
  //       pdfViewer.currentScaleValue = "page-width";
  //     }, 1500);
  //   });
  // }

  render() {
    const { props } = this;
    const { pageNumber } = this.state;
    // const item = props?.doc?.[pageNumber - 1];
    console.log("props.doc annotation: ", props.doc[0].mimeType);
    return (
      <>
        {/* <div className="flex-center">
          <button
            disabled={pageNumber === 1}
            style={{ color: "black" }}
            onClick={() => {
              this.setState({
                pageNumber: this.state.pageNumber - 1,
              });
            }}
          >
            Prev
          </button>
          {pageNumber}/{this.props.doc?.length}
          <button
            style={{ color: "black" }}
            disabled={pageNumber === this.props.doc?.length}
            onClick={() => {
              this.setState({
                pageNumber: this.state.pageNumber + 1,
              });
            }}
          >
            Next
          </button>
        </div> */}
        <div className={`annotation ${props.isCE ? "" : "non-ce"}`}>
          {/* <iframe src={props?.baseUrl + props?.doc?.path} /> */}
          {props.doc.length > 0 &&
            props.doc.map((item, i) => (
              <Annotation
                type={PointSelector.TYPE}
                src={item && item.path ? item.path : img}
                alt={item.path}
                key={item.id}
                disableAnnotation={
                  props.role !== ROLE_CE ||
                  props.property?.civilEngineerResponse?.name !== "accept" ||
                  props.property?.finalReport
                }
                annotations={
                  item
                    ? item?.comments?.map((item) => {
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
                      })
                    : []
                }
                // type={this.state.type}
                value={this.state[item.id] ? this.state[item.id] : {}}
                onChange={(annotation) => {
                  this.onChange(annotation, item.id);
                }}
                onSubmit={(annotation) => {
                  this.onSubmit(annotation, pageNumber, item);
                }}
                className={`p1 ${i !== 0 ? "mt6" : ""}`}
              />
            ))}
          {/* <Document file={Doc} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} note={"Hi there"} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p> */}
          {/* <AppViewer {...props} /> */}
          {/* <div id="viewerContainer">
          <div id="viewer" className="pdfViewer"></div>
        </div> */}
        </div>
      </>
    );
  }
}
