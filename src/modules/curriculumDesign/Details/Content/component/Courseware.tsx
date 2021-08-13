import React, { FC, useState, useEffect } from "react";
import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface CoursewarePropsInterface {
  visible: boolean;
  onChange: () => void;
}
/**
 * 课件弹窗
 * @param props
 * @returns
 */
const Courseware: FC<CoursewarePropsInterface> = (props) => {
  const { visible, onChange } = props;

  const handleOk = () => {
    onChange();
  };

  const handleCancel = () => {
    onChange();
  };

  const handleUploadChange = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Modal
      title="课件上传"
      maskClosable={false}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      bodyStyle={{
        padding: "16px 32px",
      }}
    >
      <Dragger
        name="file"
        multiple={true}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={handleUploadChange}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Modal>
  );
};

export default Courseware;
