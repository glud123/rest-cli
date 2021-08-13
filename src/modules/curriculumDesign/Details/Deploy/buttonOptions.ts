import type { ButtonInterface } from "@/components/ButtonGroup";
interface getButtonOptionsInterface {
  (): ButtonInterface[] | undefined;
}

export const getButtonOptions: getButtonOptionsInterface = () => {
  return [
    {
      key: "back",
      name: "返回",
    },
    {
      key: "pre",
      name: "上一步",
    },
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
};
