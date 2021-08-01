import { FormItemTypeEnum } from "@/components/Form/type";

export const getFormOptions = () => {
  return [
    {
      type: FormItemTypeEnum.Text,
      label: "阶段名称",
      key: "courseName",
      required: true,
      rules: [{ required: true, message: "Please input your username!" }],
    },
    {
      type: FormItemTypeEnum.Textarea,
      label: "阶段描述",
      key: "courseDesc",
    },
  ];
};
