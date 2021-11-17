import { useEffect, useState } from "react";
import Document from "../../assets/images/doc-default.svg";
import ArrowDown from "../../assets/images/arrow_down.png";
import Close from "../../assets/images/close.svg";
import { useParams } from "react-router-dom";
import { Spinner } from "../FinalReportGeneration";
// import { PDFtoIMG } from "react-pdf-to-image";

const UploadDetailsCard = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [notes, setNotes] = useState("");
  const [docId, setDocId] = useState("");
  const [docsId, setDocsId] = useState({});
  const [errDocsId, setErrDocsId] = useState({});
  // const [file, setFile] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (props.addNoteToDoc.success) {
      setNotes({});
    }
    if (props.uploadDoc?.success) {
      setDocsId({});
    }
  }, [props.addNoteToDoc, props.uploadDoc]);

  return (
    <div>
      <div
        className="elv-card d-flex space-between mt1 p1 w95"
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <div className="flex-center">
          <div className="d-flex flex-col text-sec">
            <span className="primary-text-color">
              {props.title || "Upload Document"}
            </span>
            <span className="text-dark-gray">
              Count:{" "}
              {
                props.documents?.[props.title]?.filter(
                  (item) => item.attachmentType.id === props.id
                ).length
              }{" "}
              documents
            </span>
          </div>
          <div className="flex-center doc-thumbnails">
            {props.documents?.[props.title]?.filter(
              (item) => item?.attachmentType?.id === props.id
            )?.length > 0 &&
              props.documents?.[props.title]
                ?.filter((item) => item?.attachmentType?.id === props.id)
                ?.map((item, i) => {
                  if (i > 2) {
                    return null;
                  }
                  return (
                    <div className="relative" key={"sd" + i}>
                      <div
                        className={
                          i === 0
                            ? "step-border-first"
                            : i === 1
                            ? "step-border-second"
                            : "step-border-last"
                        }
                      ></div>
                      <img
                        src={
                          !item.path || errDocsId[item.path]
                            ? Document
                            : item.path
                        }
                        alt="Document 1"
                        className={
                          i === 0 ? "first" : i === 1 ? "second" : "last"
                        }
                        onError={() => {
                          setErrDocsId((errImgs) => ({
                            ...errImgs,
                            [item.path]: true,
                          }));
                        }}
                      />
                    </div>
                  );
                })}

            <span>
              {/* {props.documents?.[props.title]?.length < 8
                ? props.documents?.[props.title]?.filter(
                  (item) => item.attachmentType.id === props.id
                ).length
                : props.propertyLoading
                ? ""
                : props.documents?.[props.title]
                ? (((props.documents?.[props.title]?.filter(
                  (item) => item.attachmentType.id === props.id
                ).length) > 3) ? ((props.documents?.[props.title]?.filter(
                  (item) => item.attachmentType.id === props.id
                ).length)-3) : (""))
                : 0} */}
              {
                props.documents?.[props.title]?.filter(
                  (item) => item.attachmentType.id === props.id
                ).length > 3
                  ? ` + ${
                      props.documents?.[props.title]?.filter(
                        (item) => item.attachmentType.id === props.id
                      ).length - 3
                    } `
                  : null
                /* (
                    props.documents?.[props.title]?.filter(
                      (item) => item.attachmentType.id === props.id).length
                  ) */
              }
            </span>
          </div>
        </div>

        <div
          className="flex-center mr1"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          <img
            src={ArrowDown}
            alt="ArrowDown"
            className={showMore ? "rotate cursor" : "cursor"}
          />
        </div>
      </div>
      {showMore && (
        <div className="uploadFileSec d-flex flex-col w100">
          <div className="">
            <h4 className="primary-text-color ml2">
              Upload {props.title}{" "}
              <span className="note">
                {" "}
                - (Capture each page as a photo and upload.)
              </span>
            </h4>
            <div className="mt1">
              {props.documents?.[props.title]
                ?.filter((item) => item?.attachmentType?.id === props?.id)
                .map((item, i) => {
                  return (
                    <div
                      className="d-flex ml1 align-flex-start"
                      key={i + "file"}
                    >
                      <div className="flex-center m1 mt2">
                        <span className="text-dark-gray count">
                          Page {i + 1}
                        </span>
                        <input
                          type="file"
                          id={item.id}
                          // accept="image/*"
                          className="d-none"
                          // onChange={(e) => {
                          //   let newFiles = [...files];
                          //   newFiles[i] = e.target.files[0];
                          //   setFiles(newFiles);
                          // }}
                        />
                        <div className="fileStyle cursor">
                          <span
                            className="ellipsis text-dark-gray"
                            // onClick={() => {
                            //   document.getElementById("file" + i).click();
                            // }}
                          >
                            {item.name ? item.name : "Browse Files"}
                          </span>
                          <img
                            src={Close}
                            alt={"close"}
                            onClick={() => {
                              props.deleteDocAction({
                                doc_id: item.id,
                                request_id: params.id,
                                name: props.title,
                              });
                            }}
                            className="cursor"
                          />
                        </div>
                      </div>

                      <div className="mr2 addNotes w80 ml1 mb1">
                        <h4
                          className={`primary-text-color ${
                            i === 0 /* ? "" : "vHidden" */
                          }`}
                        >
                          Notes
                        </h4>
                        <div className={`para`}>
                          <div className="textarea-wrap">
                            <textarea
                              autoComplete="off"
                              rows={"2"}
                              value={notes[i] ? notes[i] : item.notes}
                              onChange={(e) => {
                                setNotes({ [i]: e.target.value });
                              }}
                              onBlur={() => {
                                if (notes[i]) {
                                  props.addNoteToDocAction({
                                    notes: notes[i],
                                    request_id: params.id,
                                    doc_id: item.id,
                                  });
                                  setDocId(item.id);
                                }
                                // endpoint
                                //   .put(apis.deleteDoc(params.id, item.id), {
                                //     notes: notes[i],
                                //   })
                                //   .then((res) => {
                                //     props.fetchProperty(params.id);
                                //     setNotes({ [i]: "" });
                                //   });
                              }}
                            />
                            {props?.addNoteToDoc?.loading && item.id === docId && (
                              <div className="abs-notes-spinner">
                                <Spinner />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="d-flex align-flex-start ml0">
            <div className="flex-center mb1 mt2">
              {/* <span className="text-dark-gray count">{}</span> */}
              <input
                type="file"
                id={props.id}
                accept="image/*" //, application/pdf"
                className="d-none"
                onClick={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => {
                  if (
                    ![
                      "image/jpeg",
                      "image/jpg",
                      "image/png",
                      // "application/pdf",
                    ].includes(e.target.files[0].type)
                  ) {
                    props.alertOpen({
                      msg: "PNG, JPEG, JPG format images and PDF only allowed",
                    });
                    return;
                  }

                  // if (file?.name?.includes(e.target.files[0].name)) {
                  //   props.alertOpen({
                  //     msg: "Same file not allowed",
                  //   });
                  //   return;
                  // }
                  // setFile(e.target.files[0]);
                  console.log("e.target.files[0]", e.target.files[0]);
                  let formData = new FormData();
                  // if (e.target.files[0].type === "application/pdf") {
                  //   return (
                  //     <div>
                  //       <PDFtoIMG file={e.target.files[0]}>
                  //         {({ pages }) => {
                  //           if (!pages.length) return "Loading...";
                  //           return pages.map((page, index) =>
                  //             // <img key={index} src={page} />
                  //             console.log(`page ${index + 1}: page `)
                  //           );
                  //         }}
                  //       </PDFtoIMG>
                  //     </div>
                  //   );
                  // }
                  formData.append("attachment", e.target.files[0]);
                  formData.append("attachmentType", props.id);
                  formData.append("type", props.title);
                  props.uploadDocAction({
                    request_id: params.id,
                    formData,
                  });
                }}
              />
              <div
                className={`fileStyle cursor ml2 ${
                  props?.uploadDoc?.loading ? "loadBtn" : ""
                }`}
              >
                <span
                  className="ellipsis text-dark-gray"
                  onClick={() => {
                    document.getElementById(props.id).click();

                    setDocsId({ [props.id]: true });
                  }}
                >
                  {"Upload from device"}
                </span>
                {props?.uploadDoc?.loading && docsId[props.id] ? (
                  <Spinner />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDetailsCard;
