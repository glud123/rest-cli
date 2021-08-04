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

  const [query, setQuery] = useState<{ [k: string]: string }>();
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
    setQuery({ keyword: value });
  };

  return (
    <Blocks row={2} loading={loading}>
      <Block row={1}>
        <Filter>
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">不限</Radio.Button>
            <Radio.Button value="b">已发布</Radio.Button>
            <Radio.Button value="c">未发布</Radio.Button>
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
