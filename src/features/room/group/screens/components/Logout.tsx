import { Button, Popover } from "antd";
import { useRouter } from "next/router";
import React from "react";
import cookie from "react-cookies";
import { useAppDispatch } from "../../../../../redux/hooks";
import { AUTH_ACCESS_TOKEN } from "../../../../auth/constants/auth.keys";
import { AppIcons } from "../../../screens/AppICons";
import { getMyGroupsSlice } from "../../redux/getMy-group";

export interface LogoutProps {
  visibleProfile: boolean;
  handleVisibleChangeProfile: () => void;
}

export default function Logout({
  visibleProfile,
  handleVisibleChangeProfile,
}: LogoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { updateGroupArray } = getMyGroupsSlice.actions;

  const handleLogout = async () => {
    await cookie.remove(AUTH_ACCESS_TOKEN, { path: "/" });
    await dispatch(updateGroupArray(undefined));
    router.push("/");
  };

  return (
    <Popover
      content={<Button onClick={() => handleLogout()}>Logout</Button>}
      trigger="click"
      visible={visibleProfile}
      onVisibleChange={handleVisibleChangeProfile}
    >
      <Button type="link" icon={AppIcons.InfoCircleFilled}></Button>
    </Popover>
  );
}