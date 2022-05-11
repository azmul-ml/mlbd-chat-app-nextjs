import React, { memo } from "react";
import { Row } from "antd";

export default memo(function MainLayout({ children }: any) {
  return <Row>{children}</Row>;
});
