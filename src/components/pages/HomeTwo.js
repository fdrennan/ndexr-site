import React from "react";
import Instance from "../instances/Instance";
import InstanceForm from "../instances/InstanceForm";
import InstanceFilter from "../instances/InstanceFilter";

const HomeTwo = () => {
  return (
    <div className="grid-2">
      <div>
        <InstanceForm />
      </div>
      <div>
        <InstanceFilter />
        <Instance />
      </div>
    </div>
  );
};

export default HomeTwo;
