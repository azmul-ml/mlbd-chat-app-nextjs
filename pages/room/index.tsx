import React from "react";
import PageLeft from "../../src/components/common/layout/PageLeft";

export default function Room() {
  return (
    <>
      <PageLeft />
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
        }}
      >
        <div
          style={{
            border: "2px solid #0e3752",
            padding: "50px 100px",
            // background: "#0e4962",
          }}
        >
          <h3 style={{ color: "#0e3752", cursor: "pointer" }}>
            Create a group for start chat +
          </h3>
        </div>
      </div>
    </>
  );
}
