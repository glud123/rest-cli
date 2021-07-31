import React, { FC, useState } from "react";
import { Drawer, List, Avatar } from "antd";
import { AppstoreFilled, UserOutlined } from "@ant-design/icons";
import ThemePicker from "@/components/ThemePicker";
import "./index.less";

interface SettingPropsInterface {}

const Setting: FC<SettingPropsInterface> = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <AppstoreFilled onClick={showDrawer} />
      <Drawer
        placement="right"
        width={400}
        contentWrapperStyle={{
          marginTop: "48px",
          height: "calc( 100% - 48px )",
          borderRadius: "4px 0 0 4px",
        }}
        visible={visible}
        onClose={closeDrawer}
      >
        <div className="setting-wrapper">
          <div className="setting-user-info">
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <List>
            <List.Item actions={[<ThemePicker />]}>
              <List.Item.Meta title="主题选择" />
            </List.Item>
            <List.Item actions={[<a href="#">修改</a>]}>
              <List.Item.Meta title="账号设置" />
            </List.Item>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Setting;
