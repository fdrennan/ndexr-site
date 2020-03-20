import React, { useState, useContext, useEffect } from "react";
import InstanceContext from "../../context/instance/instanceContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../Theme";
import Box from "@material-ui/core/Box";

const InstanceForm = () => {
  const classes = useStyles();
  const instanceContext = useContext(InstanceContext);

  const {
    addInstance,
    updateInstance,
    clearCurrentInstance,
    instance,
    getInstances
  } = instanceContext;

  useEffect(() => {
    if (instance !== null) {
      setInstance(instance);
    } else {
      setInstance({
        instanceStorage: "60",
        instanceType: "t2.xlarge",
        pemKey: "ndexr",
        imageId: "ami-0f75bb5fd5fa9f972",
        securityGroupName: "ndexr"
      });
    }
  }, [instanceContext, instance]);

  const [currentInstance, setInstance] = useState({
    instanceStorage: "60",
    instanceType: "t2.xlarge",
    pemKey: "ndexr",
    imageId: "ami-0f75bb5fd5fa9f972",
    securityGroupName: "ndexr"
  });

  const {
    instanceType,
    pemKey,
    instanceStorage,
    imageId,
    securityGroupName
  } = currentInstance;

  const onChange = e =>
    setInstance({ ...currentInstance, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (instance === null) {
      addInstance(currentInstance);
      getInstances();
    } else {
      updateInstance(currentInstance);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentInstance();
  };

  return (
    <Box m={2} p={2} border={1} borderRadius={16}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div>
          <Typography>
            <h1>Create Server</h1>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="instanceType"
            label="Instance Type"
            autoComplete="email"
            autoFocus
            type="text"
            placeholder="Instance Type: t2.nano"
            name="instanceType"
            value={instanceType}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="imageId"
            label="Image ID"
            autoComplete="email"
            autoFocus
            type="text"
            placeholder="Image ID: ami-0fc20dd1da406780b"
            name="imageId"
            value={imageId}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="instanceStorage"
            label="Instance Storage (GB)"
            autoComplete="instanceStorage"
            autoFocus
            type="text"
            placeholder="Instance Storage: 50"
            name="instanceStorage"
            value={instanceStorage}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pemKey"
            label="PEM Key Name"
            autoComplete="pemKey"
            autoFocus
            type="pemKey"
            placeholder="random.pem but, without .pem - random"
            name="pemKey"
            value={pemKey}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="securityGroupName"
            label="Security Group Name"
            autoComplete="securityGroupName"
            autoFocus
            type="text"
            placeholder="Security Group Name"
            name="securityGroupName"
            value={securityGroupName}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            value={instance ? "Update Contact" : "Start Server"}
          >
            Start Server
          </Button>
        </div>

        <div>
          {instance && (
            <div>
              <button onClick={clearAll}>Clear</button>
            </div>
          )}
        </div>
      </form>
    </Box>
  );
};

export default InstanceForm;
