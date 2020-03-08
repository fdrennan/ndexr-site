import React, { useState } from "react";

const SecurityGroupForm = () => {
  const [currentSg, setSg] = useState({
    sgName: "testr"
  });

  const { sgName } = currentSg;

  const onChange = e =>
    setSg({ ...currentSg, [e.target.name]: e.target.value });

  const onSubmit = () => {
    console.log(currentSg);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Security Group</h2>
      <input
        type="text"
        placeholder="Instance Type: t2.nano"
        name="instanceType"
        value={sgName}
        onChange={onChange}
      />
    </form>
  );
};

export default SecurityGroupForm;
