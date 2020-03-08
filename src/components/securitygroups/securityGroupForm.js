import React, { useState, useContext, useEffect } from "react";
import SecurityGroupContext from "../../context/securitygroup/securityGroupContext";

const SecurityGroupForm = () => {
  const [currentSg, setSg] = useState({
    sgName: "testr"
  });

  const securityGroupContext = useContext(SecurityGroupContext);
  const { getSecurityGroup, securityGroups } = securityGroupContext;

  const { sgName } = currentSg;

  useEffect(() => {
    getSecurityGroup();
  }, []);

  const onChange = e => {
    setSg({ ...currentSg, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log(currentSg);
  };

  return (
    <form onSubmit={onSubmit}>
      {securityGroups &&
        securityGroups.map(x => (
          <div className="container" key={x.group_name}>
            <h1>{x.group_name}</h1>
            <h2>{x.group_id}</h2>
          </div>
        ))}
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
