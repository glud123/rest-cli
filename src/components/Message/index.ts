import { message as AntdMessage } from "antd";
import type { IconType } from "antd/lib/notification";

AntdMessage.config({
  top: 10,
  duration: 2,
  maxCount: 2,
});

const open = ({
  type = "warning",
  message,
}: {
  type?: IconType;
  message: string;
}) => {
  AntdMessage[type](message);
};

export default { open };
