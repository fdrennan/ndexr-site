import React from "react";
import Instance from "../instances/Instance";
import InstanceForm from "../instances/InstanceForm";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <InstanceForm />
      </div>
      <div>
        <Instance />
      </div>
    </div>
  );
};

export default Home;
