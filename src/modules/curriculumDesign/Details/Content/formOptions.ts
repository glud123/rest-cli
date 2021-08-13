import { FormItemTypeEnum } from "@/components/Form/type";

export const getFormOptions = () => {
  return [
    {
      type: FormItemTypeEnum.Text,
      label: "阶段名称",
      key: "stepName",
      required: true,
      rules: [{ required: true, message: "阶段名称不能为空！" }],
    },
    {
      type: FormItemTypeEnum.Textarea,
      label: "阶段描述",
      key: "stepDesc",
    },
  ];
};
