import { notification } from "antd";
import type { IconType } from "antd/lib/notification";

const open = ({
  type = "warning",
  desc,
}: {
  type?: IconType;
  desc: string;
}) => {
  let message = "";
  switch (type) {
    case "success":
      message = "成功";
      break;
    case "info":
      message = "提示";
      break;
    case "error":
      message = "错误";
      break;
    default:
      message = "警告";
      break;
  }
  notification[type]({
    message,
    description: desc,
  });
};

export default {
  open,
};
