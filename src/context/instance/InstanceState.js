import React, { useReducer } from "react";
import axios from "axios";
import InstanceContext from "./instanceContext";
import instanceReducer from "./instanceReducer";
import {
  GET_INSTANCES,
  SET_CURRENT_INSTANCE,
  CLEAR_CURRENT_INSTANCE,
  UPDATE_INSTANCE,
  FILTER_INSTANCES,
  CLEAR_INSTANCES,
  CLEAR_INSTANCE_FILTER,
  INSTANCE_ERROR
} from "../types";

// BASE AMI: ami-0f75bb5fd5fa9f972
const R_HOST = process.env.R_HOST;
const R_PORT = process.env.R_PORT;
const InstanceState = props => {
  const initialState = {
    instances: null,
    instance: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(instanceReducer, initialState);

  // Get Instance
  const getInstances = async () => {
    try {
      const res = await axios.get(`${R_HOST}:${R_PORT}/instance_data`, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          user_token: localStorage.token
        }
      });

      const { data } = res.data;
      dispatch({
        type: GET_INSTANCES,
        payload: data
      });
    } catch (err) {
      console.error(err);
      console.log("getInstances");
    }
  };

  // Add Contact
  const addInstance = async instance => {
    try {
      const {
        instanceType,
        pemKey,
        instanceStorage,
        imageId,
        securityGroupName
      } = instance;
      await axios.get(`${R_HOST}:${R_PORT}/create_instance`, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          instance_type: instanceType,
          key_name: pemKey,
          instance_storage: instanceStorage,
          image_id: imageId,
          user_token: localStorage.token,
          security_group_name: securityGroupName
        }
      });
    } catch (err) {
      console.log("addInstance");
      console.error(err);
    }
  };

  // Delete Contact
  const modifyInstance = async (id, modify, instanceType = "") => {
    try {
      await axios.get(`${R_HOST}:${R_PORT}/instance_modify`, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          user_token: localStorage.token,
          id,
          method: modify,
          instance_type: instanceType
        }
      });
    } catch (err) {
      console.error(err);
      console.log("deleteInstance");
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.message
      });
    }
  };

  // Update Contact
  const updateInstance = async instance => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${instance._id}`,
        instance,
        config
      );

      dispatch({
        type: UPDATE_INSTANCE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Instance
  const clearContacts = () => {
    dispatch({ type: CLEAR_INSTANCES });
  };

  // Set Current Contact
  const setInstance = instance => {
    dispatch({ type: SET_CURRENT_INSTANCE, payload: instance });
  };

  // Clear Current Contact
  const clearCurrentInstance = () => {
    dispatch({ type: CLEAR_CURRENT_INSTANCE });
  };

  // Filter Instance
  const filterInstances = text => {
    dispatch({ type: FILTER_INSTANCES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_INSTANCE_FILTER });
  };

  return (
    <InstanceContext.Provider
      value={{
        instances: state.instances,
        instance: state.instance,
        filtered: state.filtered,
        error: state.error,
        addInstance,
        modifyInstance,
        setInstance,
        clearCurrentInstance,
        updateInstance,
        filterInstances,
        clearFilter,
        getInstances,
        clearContacts
      }}
    >
      {props.children}
    </InstanceContext.Provider>
  );
};

export default InstanceState;
