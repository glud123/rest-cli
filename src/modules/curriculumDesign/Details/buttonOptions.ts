import type { ButtonInterface } from "@/components/ButtonGroup";
interface getButtonOptionsInterface {
  (currentKey: number): ButtonInterface[] | undefined;
}

export const getButtonOptions: getButtonOptionsInterface = (currentKey) => {
  const back = {
    key: "back",
    name: "返回",
  };
  const save = {
    key: "save",
    name: "保存",
    type: "primary",
  };
  const next = {
    key: "next",
    name: "下一步",
    type: "primary",
  };
  const pre = {
    key: "pre",
    name: "上一步",
  };
  // 基本信息
  if (currentKey === 0) {
    return [back,  next];
  }
  // 课程内容
  if (currentKey === 1) {
    return [back, pre, next];
  }
  // 发布
  if (currentKey === 2) {
    return [
      back,
      pre,
      {
        key: "storage",
        name: "暂存",
        type: "primary",
      },
      {
        key: "deploy",
        name: "发布",
        type: "primary",
      },
    ];
  }
};
