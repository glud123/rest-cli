import { message as AntdMessage } from "antd";
import type { IconType } from "antd/lib/notification";

AntdMessage.config({
  top: 10,
  duration: 2,
  maxCount: 2,
});

const success = (message: string) => {
  AntdMessage["success"](message);
};

const error = (message: string) => {
  AntdMessage["error"](message);
};

const warning = (message: string) => {
  AntdMessage["warning"](message);
};
export default { success, error, warning };
