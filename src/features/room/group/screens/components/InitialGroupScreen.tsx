import { Button } from "antd";
import { PlusSquareFilled } from "@ant-design/icons";
import React from "react";
import { createGroupSlice } from "../../redux/create-group.slice";
import style from "../../../../../../styles/layout.module.scss";
import { useAppDispatch } from "../../../../../redux/hooks";

export default function InitialGroupScreen() {
  const dispatch = useAppDispatch();
  const { triggerGroupModal } = createGroupSlice.actions;
  return (
    <div style={{ margin: "auto" }}>
      <div className={style.initialCreateBlock}>
        <Button
          onClick={() => {
            dispatch(triggerGroupModal(true));
          }}
        >
          Create a room to start chatting
          <span style={{ marginLeft: "5px" }}>
            <PlusSquareFilled style={{ fontSize: "14px", color: "#4d504f" }} />
          </span>
        </Button>
      </div>
    </div>
  );
}
