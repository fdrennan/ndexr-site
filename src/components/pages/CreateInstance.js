import React from "react";
import Instance from "../instances/Instance";
import InstanceForm from "../instances/InstanceForm";
import Navbar from "../layout/Navbar";
import useStyles from "../../Theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

const CreateInstance = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid
        justify="center"
        container
        component="main"
        className={classes.root}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} className={classes.card}>
          <InstanceForm />
        </Grid>
        <Grid item xs={12} sm={8} md={5} className={classes.card}>
          <Instance />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateInstance;
