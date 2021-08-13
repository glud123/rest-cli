import React, { FC, useState, useEffect } from "react";
import { Modal, Upload, message, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { upload } from "@/util/fetchUtil";

import type { RcFile } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";

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

  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = () => {
    setUploading(true);
    upload("design/task/resource/uploads", { "files": fileList }).then(
      (data) => {
        if (data) {
          console.log(data);
        }
      }
    );
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
      {fileList.length > 0 ? (
        <div>
          <Upload
            onRemove={(file) => {
              const index = fileList.indexOf(file as any);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(() => newFileList);
            }}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);
              return false;
            }}
            fileList={fileList as unknown as UploadFile<any>[]}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "正在上传" : "开始上传"}
          </Button>
        </div>
      ) : (
        <Dragger
          name="file"
          multiple={true}
          onChange={handleUploadChange}
          beforeUpload={(file) => {
            setFileList([...fileList, file]);
            return false;
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖动文件到此区域上传</p>
          <p className="ant-upload-hint">支持单文件或者批量上传</p>
        </Dragger>
      )}
    </Modal>
  );
};

export default Courseware;
