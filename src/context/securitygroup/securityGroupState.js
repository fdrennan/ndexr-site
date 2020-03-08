import React, { useReducer } from "react";
import axios from "axios";
import securityGroupContext from "./securityGroupContext";
import securityGroupReducer from "./securityGroupReducer";
import { GET_SECURITY_GROUP } from "../types";

// BASE AMI: ami-0f75bb5fd5fa9f972
const R_HOST = "http://127.0.0.1";
const R_PORT = 7530;

const SecurityGroupState = props => {
  const initialState = {
    securityGroups: null
  };
  const [state, dispatch] = useReducer(securityGroupReducer, initialState);
  // Get Instance
  const getSecurityGroup = async () => {
    console.log("Hello");
    // dispatch({
    //   type: SET_LOADING,
    //   payload: true
    // });
    try {
      const res = await axios.get(`${R_HOST}:${R_PORT}/security_group_list`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      //
      const { data } = res.data;
      dispatch({
        type: GET_SECURITY_GROUP,
        payload: data
      });
    } catch (err) {
      console.error(err);
      console.log("getInstances");
    }
  };

  return (
    <securityGroupContext.Provider
      value={{
        securityGroups: state.securityGroups,
        getSecurityGroup
      }}
    >
      {props.children}
    </securityGroupContext.Provider>
  );
};

export default SecurityGroupState;
