import React from "react";
import { useHistory } from "react-router-dom";
import { Blocks, Block } from "@/components/BlockLayout";
import * as SVGComponent from "./imageList";

const Home = () => {
  let history = useHistory();
  return (
    <Blocks row={1} col={2}>
      <Block width={260} height={260} row={1} cell={1} title="课程设计">
        <SVGComponent.CurriculumDesign
          width={220}
          height={192}
          onClick={() => {
            history.push("/curriculum-design/");
          }}
        />
      </Block>
      <Block width={260} row={1} cell={1} title="考试设计">
        <SVGComponent.TestDesign
          width={220}
          height={192}
          onClick={() => {
            history.push("/test-paper-design/");
          }}
        />
      </Block>
    </Blocks>
  );
};

export default Home;
