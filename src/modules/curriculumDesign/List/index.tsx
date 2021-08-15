import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Button, Table, Radio, Input } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";
import Filter from "@/components/Filter";
import Message from "@/components/Message";
import Confirm from "@/components/Confirm";
import { post } from "@/util/fetchUtil";
import { getColumns } from "./columnsOptions";

const List = () => {
  let history = useHistory();

  const [query, setQuery] = useState<{ [k: string]: any }>({
    keyWord: null,
    courseType: 1,
    courseStatus: 1,
  });
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>();

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const queryData = () => {
    setLoading(true);
    post("design/courses/list", query)
      .then(({ list }) => {
        setList(list);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBtnClick = (type: string, record: any) => {
    const { id, courseName } = record;
    switch (type) {
      case "del":
        Confirm.open(`确认要删除【${courseName}】吗`).then(() => {
          post("design/coursebase/delete", { courseId: id }).then((data) => {
            if (data) {
              Message.success("删除成功！");
              queryData();
            }
          });
        });
        break;
      case "edit":
      default:
        history.push(`/curriculum-design/details?id=${id}&step=0`);
        break;
    }
  };

  const columns = getColumns(handleBtnClick);

  useEffect(() => {
    setOperation(
      <Button
        type="primary"
        onClick={() => {
          history.push("/curriculum-design/details");
        }}
      >
        新增
      </Button>
    );
  }, []);

  useEffect(() => {
    queryData();
  }, [query]);

  const onSearch = (value: any) => {
    setQuery({ ...query, keyWord: value });
  };

  const { courseStatus } = query;

  return (
    <Blocks row={2} >
      <Block row={1}>
        <Filter>
          <Radio.Group
            defaultValue={courseStatus}
            buttonStyle="solid"
            onChange={({ target }) => {
              setQuery({ ...query, courseStatus: target.value });
            }}
          >
            <Radio.Button value={1}>不限</Radio.Button>
            <Radio.Button value={2}>已发布</Radio.Button>
            <Radio.Button value={3}>未发布</Radio.Button>
          </Radio.Group>
          <div>
            <Input.Search
              placeholder="课程名称"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </div>
        </Filter>
      </Block>
      <Block row={2}>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={list}
        />
      </Block>
    </Blocks>
  );
};

export default List;
