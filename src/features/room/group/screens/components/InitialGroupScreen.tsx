import { Button } from "antd";
import { PlusSquareFilled } from "@ant-design/icons";

import React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { createGroupSlice } from "../../redux/create-group.slice";

export default function InitialGroupScreen() {
  const dispatch = useAppDispatch();
  const { triggerGroupModal } = createGroupSlice.actions;
  return (
    <div style={{ margin: "auto" }}>
      <div
        style={{
          border: "2px solid #0e3752",
          padding: "50px 100px",
          // background: "#0e4962",
          margin: "auto",
        }}
      >
        <Button
          onClick={() => {
            dispatch(triggerGroupModal(true));
            console.log("open");
          }}
          style={{ color: "#0e3752", cursor: "pointer" }}
        >
          Create a room for start chating
          <span style={{ marginLeft: "5px" }}>
            <PlusSquareFilled style={{ fontSize: "14px", color: "#154c6d" }} />
          </span>
        </Button>
      </div>
    </div>
  );
}
