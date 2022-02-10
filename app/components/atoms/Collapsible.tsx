import React from "react";
import { Collapse, List } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export const Collapsible = ({
  revealData,
  handleGroupLink,
  styles,
}: {
  revealData: any;
  handleGroupLink: any;
  styles: any;
}) => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      //   className={
      //     styles.chatLeftDetailsHeader + " " + styles.chatLeftDetailsHeaderLink
      //   }
      style={{ backgroundColor: "#0e3752" }}
    >
      <Panel
        header="This is panel header 1"
        key="1"

        // className={styles.chatGroupList}
      >
        <List
          dataSource={revealData}
          renderItem={(item: any) => (
            <List.Item>
              <div>
                <span
                  style={{ marginLeft: "20px" }}
                  onClick={() => handleGroupLink(item.id)}
                >
                  {item.meta.name}
                </span>
                <span className={styles.chatMessageCount}>18</span>
              </div>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );
};
