import React, { memo } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

const Spinner: React.FC = () => {
  return (
    <Flex gap="small" vertical>
      <Button type="primary" icon={<PoweroffOutlined />} loading />
    </Flex>
  );
};

export default memo(Spinner);
