import React, { useState, useContext, useEffect } from "react";
import SecurityGroupContext from "../../context/securitygroup/securityGroupContext";
import useStyles from "../../Theme";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const SecurityGroupForm = () => {
  const [currentSg, setSg] = useState({
    sgName: "testr"
  });

  const securityGroupContext = useContext(SecurityGroupContext);
  const { getSecurityGroup, securityGroups } = securityGroupContext;

  const { sgName } = currentSg;

  useEffect(() => {
    getSecurityGroup();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setSg({ ...currentSg, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log("submitted");
  };

  const classes = useStyles();

  return (
    <Grid justify="center" container component="main" className={classes.root}>
      <form onSubmit={onSubmit}>
        {securityGroups &&
          JSON.parse(securityGroups).map(x => {
            console.log(x);
            console.log(x.data);
            const dataMap = x.data.map(x => {
              return (
                <tr>
                  <td>{x.ip_ranges}</td>
                  <td>{x.from_port}</td>
                  <td>{x.to_port}</td>
                </tr>
              );
            });
            return (
              <div className="container">
                <div key={x.group_name}>
                  <h2 key={x.group_name}>{x.group_name}</h2>
                  <h3 key={x.group_id}>{x.group_id}</h3>
                </div>
                {
                  <table>
                    <tbody>
                      <tr key={"tbody"}>
                        <td key={0}>Ip Address</td>
                        <td key={1}>From Port</td>
                        <td key={2}>To Port</td>
                      </tr>
                      {dataMap}
                    </tbody>
                  </table>
                }
              </div>
            );
          })}
        <h2 className="text-primary">Add Security Group</h2>
        <input
          type="text"
          placeholder="Instance Type: t2.nano"
          name="instanceType"
          value={sgName}
          onChange={onChange}
        />
      </form>
    </Grid>
  );
};

export default SecurityGroupForm;
