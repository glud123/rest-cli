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
      key: "next",
      name: "下一步",
      type: "primary",
    },
  ];
};
