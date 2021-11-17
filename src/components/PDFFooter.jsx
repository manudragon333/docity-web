import React from "react";

const PDFFooter = () => {
  return (
    <div>
      <div
        style={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: ".8rem",
            padding: "15px 15px 15px 30px ",
            width: "600px",
          }}
        >
          The above file is subject to government regulations. It should not be
          subject to any misconduct. Violation will be punished by the
          government. So protect this. This is for your perusal only.
        </p>
        <div
          style={{
            fontSize: ".8rem",
            padding: "15px 0 15px 30px ",
            paddingTop: "20px",
            lineHeight: "20px",
          }}
        >
          <a
            href="http://www.docity.com/"
            style={{ color: "#000" }}
            target="_blank"
            rel="noreferrer"
          >
            www.docity.com
          </a>
          <br />
          &#169;&nbsp;Copyright
        </div>
      </div>
    </div>
  );
};

export default PDFFooter;
