import { Button, Popover } from "antd";
import React from "react";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../../../auth/constants/auth.keys";
import { AppIcons } from "../../../screens/AppICons";

export interface LogoutProps {
  router: any;
  visibleProfile: boolean;
  handleVisibleChangeProfile: () => void;
}

export default function Logout({
  router,
  visibleProfile,
  handleVisibleChangeProfile,
}: LogoutProps) {
  return (
    <Popover
      content={
        <label
          onClick={() => {
            cookie.remove(AUTH_ACCESS_TOKEN);
            router.push("/");
          }}
        >
          Logout
        </label>
      }
      // title="Title"
      trigger="click"
      visible={visibleProfile}
      onVisibleChange={handleVisibleChangeProfile}
    >
      <Button type="link" icon={AppIcons.InfoCircleFilled}></Button>
    </Popover>
  );
}
