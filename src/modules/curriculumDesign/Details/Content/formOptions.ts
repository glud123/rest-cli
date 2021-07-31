import { FormItemTypeEnum } from "@/components/Form/type";

export const getFormOptions = () => {
  return [
    {
      type: FormItemTypeEnum.Text,
      label: "阶段名称",
      key: "courseName",
      value: "",
      required: true,
    },
    {
      type: FormItemTypeEnum.Textarea,
      label: "阶段描述",
      key: "courseDesc",
      value: "",
    },
  ];
};
