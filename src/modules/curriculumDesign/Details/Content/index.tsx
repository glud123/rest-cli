import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "@ahooksjs/use-url-state";
import { useSetRecoilState } from "recoil";
import { Form as AntdForm, Table, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OperationTree from "@/components/OperationTree";
import ButtonGroup from "@/components/ButtonGroup";
import Store from "@/store";
import Message from "@/components/Message";
import { post } from "@/util/fetchUtil";
import Form, { useForm } from "@/components/Form";
import { columns } from "./columnsOptions";
import { getFormOptions } from "./formOptions";
import { Courseware, Exam, HomeWork, Experience } from "./component";
import { getButtonOptions } from "./buttonOptions";

import type { TreeItem } from "@/components/OperationTree";
interface ContentPropsInterface {
  onChange: (key: number) => void;
}
const Content: FC<ContentPropsInterface> = (props) => {
  const { onChange } = props;
  let history = useHistory();
  const [form] = useForm();
  const [urlParams, setUrlParams] = useUrlState();
  const setOperation = useSetRecoilState(Store.platform.operationState);
  const buttonOptions = getButtonOptions();

  const [current, setCurrent] = useState();
  const [tree, setTree] = useState<TreeItem[]>([]);
  const [list, setList] = useState();

  // 获取阶段树数据
  const getTreeData = () => {
    if (!urlParams.id) {
      return;
    }
    let id = parseInt(urlParams.id);
    post("design/course/step/list", { courseId: id }).then((data) => {
      if (data) {
        setTree(data);
      }
    });
  };
  // 获取任务列表
  const getTableData = () => {};

  // 按钮点击事件
  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "pre":
        onChange(0);
        break;
      case "next":
        onChange(2);
        break;
      default:
        history.push("/curriculum-design/");
        break;
    }
  };

  useEffect(() => {
    setOperation(
      <ButtonGroup options={buttonOptions} onClick={handleBtnClick} />
    );
    getTreeData();
  }, []);

  const handleChange = (
    key: "add" | "del" | "up" | "down" | "save",
    treeItem: TreeItem
  ) => {
    if (!urlParams.id) {
      return;
    }
    let id = parseInt(urlParams.id);
    switch (key) {
      case "del":
        break;
      case "up":
        break;
      case "down":
        break;
      case "save":
        post("design/course/step/save", { ...treeItem, courseId: id }).then(
          (data) => {
            if (data) {
              setTree(data);
            }
          }
        );
        break;
      case "add":
      default:
        form.setFieldsValue(treeItem);
        break;
    }
  };

  const handleItemSelected = (treeItem: TreeItem) => {
    console.log(treeItem);
  };

  const handleMenuClick = (e?: any) => {
    setCurrent(e ? e.key : null);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">课件</Menu.Item>
      <Menu.Item key="2">考试</Menu.Item>
      <Menu.Item key="3">作业</Menu.Item>
      <Menu.Item key="4">心得体会</Menu.Item>
    </Menu>
  );

  const formOptions = getFormOptions();
  return (
    <div className="curriculum-content">
      <div className="cc-left">
        <OperationTree
          onSelected={handleItemSelected}
          dataSource={tree}
          onChange={handleChange}
        />
      </div>
      <div className="cc-right">
        <div className="cc-right-form">
          <Form
            form={form}
            options={formOptions}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            name="content"
            initialValues={{ courseName: "", courseDesc: "" }}
          >
            <AntdForm.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Dropdown overlay={menu}>
                <Button>
                  添加任务 <DownOutlined />
                </Button>
              </Dropdown>
            </AntdForm.Item>
          </Form>
        </div>
        <div className="cc-right-table">
          <Table columns={columns} dataSource={list} />
        </div>
      </div>
      <Courseware visible={current === "1"} onChange={handleMenuClick} />
      <Exam visible={current === "2"} onChange={handleMenuClick} />
      <HomeWork visible={current === "3"} onChange={handleMenuClick} />
      <Experience visible={current === "4"} onChange={handleMenuClick} />
    </div>
  );
};

export default Content;
