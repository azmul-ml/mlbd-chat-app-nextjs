import { Avatar, Button, Col, Popover, Row, Select } from "antd";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../features/auth/constants/auth.keys";

import {
  getSingleGroup,
  singleGroupSlice,
} from "../../features/chat/group/redux/get-single-group.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { AppIcons } from "../AppIcons";

const { Option } = Select;

export const GroupTop = ({
  styles,
  allUsers,
}: {
  styles: any;
  allUsers: any;
}) => {
  const [visible, setVisible] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({}) as any;
  const dispatch = useAppDispatch();

  const token = cookie.load(AUTH_ACCESS_TOKEN);
  let router = useRouter();

  function onSearch(val: any) {
    console.log("search:", val);
  }
  const handleVisibleChange = (visible: any) => {
    setVisible(true);
  };
  function onChange(value: any) {
    console.log(`selected ${value}`);
  }
  const getCurrentGroup = async () => {
    const data = {
      group_id: router.query.roomId,
      token,
    };

    const res = await dispatch(getSingleGroup(data));
    setCurrentGroup(res.payload);
  };
  useEffect(() => {
    getCurrentGroup();
  }, [router.query.roomId]);
  return (
    <Row className={styles.chatRightHeader}>
      <Col className={styles.chatRightHeaderTitle}>
        <Col className={styles.chatRightHeaderTitleText}>
          {currentGroup?.meta?.name}
        </Col>
      </Col>

      <Col className={styles.chatRightHeaderAction}>
        <Button type="link" icon={AppIcons.SearchOutlined}></Button>
        <Button type="link" icon={AppIcons.PhoneFilled}></Button>
        <Popover
          content={
            <Select
              showSearch
              mode="multiple"
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allUsers?.map((user: any) => (
                <Option key={user} value={user._id}>
                  {user.name}
                </Option>
              ))}
              {/* <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option> */}
            </Select>
          }
          title="Title"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button
            type="link"
            onClick={() => console.log("add member")}
            icon={AppIcons.UserAddOutlined}
          ></Button>
          {/* <Button type="primary">Click me</Button> */}
        </Popover>
        <Button type="link" icon={AppIcons.InfoCircleFilled}></Button>
      </Col>
    </Row>
  );
};
