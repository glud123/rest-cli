import React from "react";

const Home = () => {
  const handleChange = () => {
    (window as any).less
      .modifyVars({
        "@primary-color": "#0035ff",
      })
      .then(() => {
        console.log("Success ");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      home
      <button onClick={handleChange}>变更颜色</button>
    </div>
  );
};

export default Home;
