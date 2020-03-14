import React from "react";
import Instance from "../instances/Instance";
import InstanceForm from "../instances/InstanceForm";
import Navbar from "../layout/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid-2">
        <div>
          <InstanceForm />
        </div>
        <div>
          <Instance />
        </div>
      </div>
    </div>
  );
};

export default Home;
