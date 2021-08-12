import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Button, Table, Radio, Input } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";
import Filter from "@/components/Filter";
import { post } from "@/util/fetchUtil";
import { columns } from "./columnsOptions";

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
    setLoading(true);
    post("design/courses/list", query)
      .then(({ list }) => {
        setList(list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const onSearch = (value: any) => {
    setQuery({ ...query, keyWord: value });
  };

  const { courseStatus } = query;

  return (
    <Blocks row={2} loading={loading}>
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
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Block>
    </Blocks>
  );
};

export default List;
