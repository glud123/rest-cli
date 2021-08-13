import { FormItemTypeEnum } from "@/components/Form/type";

export const getFormOptions = () => {
  return [
    {
      type: FormItemTypeEnum.Text,
      label: "课程名称",
      key: "courseName",
      required: true,
      rules: [{ required: true, message: "课程名称不能为空！" }],
    },
    {
      type: FormItemTypeEnum.Text,
      label: "课程简述",
      key: "courseDesc",
    },
    {
      type: FormItemTypeEnum.Text,
      label: "课程目标",
      key: "recommendMajor",
    },
    {
      type: FormItemTypeEnum.Text,
      label: "课程对象",
      key: "courseTarget",
    },
    {
      type: FormItemTypeEnum.Number,
      label: "课程时长",
      key: "recommendHour",
    },
  ];
};
