import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { Task, Exam, HomeWork, Experience } from "./component";
import { getButtonOptions } from "./buttonOptions";

import type { TreeItem } from "@/components/OperationTree";
interface ContentPropsInterface {
  onChange: (key: number) => void;
}
const Content: FC<ContentPropsInterface> = (props) => {
  const { onChange } = props;
  let history = useHistory();
  const [form] = useForm();
  const setOperation = useSetRecoilState(Store.platform.operationState);
  const [list, setList] = useState();

  const buttonOptions = getButtonOptions();

  const [current, setCurrent] = useState();

  // 按钮点击事件
  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "pre":
        break;
      case "next":
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
  }, []);

  const handleChange = (
    type: "add" | "del" | "up" | "down",
    treeItem: TreeItem
  ) => {
    console.log(type, treeItem);
  };

  const handleItemSelected = (treeItem: TreeItem) => {
    console.log(treeItem);
  };

  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">任务资源</Menu.Item>
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
          dataSource={[
            {
              id: 11,
              stepName: "111",
              stepDesc: "111",
              level: 1,
              parentId: null,
              leaf: 0,
              sort: 0,
              subList: [
                {
                  id: 1101,
                  stepName: "1101",
                  stepDesc: "1101",
                  level: 2,
                  parentId: 11,
                  leaf: 1,
                  sort: 0,
                  subList: undefined,
                },
                {
                  id: 1102,
                  stepName: "1102",
                  stepDesc: "1102",
                  level: 2,
                  parentId: 11,
                  leaf: 1,
                  sort: 1,
                  subList: undefined,
                },
              ],
            },
            {
              id: 12,
              stepName: "12",
              stepDesc: "12",
              level: 1,
              parentId: null,
              leaf: 0,
              sort: 1,
              subList: [
                {
                  id: 1201,
                  stepName: "1201",
                  stepDesc: "1201",
                  level: 2,
                  parentId: 12,
                  leaf: 1,
                  sort: 0,
                  subList: undefined,
                },
                {
                  id: 1202,
                  stepName: "1202",
                  stepDesc: "1202",
                  level: 2,
                  parentId: 12,
                  leaf: 1,
                  sort: 1,
                  subList: undefined,
                },
              ],
            },
          ]}
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
      <Task visible={current === "1"} />
      <Exam visible={current === "2"} />
      <HomeWork visible={current === "3"} />
      <Experience visible={current === "4"} />
    </div>
  );
};

export default Content;
