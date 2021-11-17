import React from "react";
import FooterLogo from "../assets/images/white@3x.png";

const PDFHeader = (props) => {
  return (
    <div>
      <div
        style={{
          height: "4rem",
          backgroundColor: "rgb(139, 189, 197)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={FooterLogo}
          style={{
            width: "100px",
            paddingTop: "4px",
            marginLeft: "2rem",
          }}
          alt=""
        />
      </div>
      <div
        style={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            padding: "15px 0 15px 30px ",
            width: "600px",
          }}
        >
          Title: {props.title}
        </p>
        <p
          style={{
            fontSize: ".8rem",
            padding: "15px 0 15px 30px ",
            paddingTop: "20px",
            lineHeight: "20px",
          }}
        >
          Customer Name: <span>{props.properties.property.name}</span> <br />
          Docity Id:{" "}
          <span style={{ padding: "0 30px 0 20px" }}>
            {props.properties.property.referenceId}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PDFHeader;
