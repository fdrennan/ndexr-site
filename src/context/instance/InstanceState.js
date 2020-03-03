import React, { useReducer } from "react";
import axios from "axios";
import InstanceContext from "./instanceContext";
import instanceReducer from "./instanceReducer";
import {
  GET_INSTANCES,
  ADD_INSTANCE,
  DELETE_INSTANCE,
  SET_CURRENT_INSTANCE,
  CLEAR_CURRENT_INSTANCE,
  UPDATE_INSTANCE,
  FILTER_INSTANCES,
  CLEAR_INSTANCES,
  CLEAR_INSTANCE_FILTER,
  INSTANCE_ERROR
} from "../types";

const rHost = "http://127.0.0.1";
const rPort = 5452;
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
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_INSTANCES,
        payload: res.data
      });
    } catch (err) {
      // console.error(err);
      console.log("getInstances");
      // dispatch({
      //   type: INSTANCE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  // Add Contact
  const addInstance = async instance => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", instance, config);

      dispatch({
        type: ADD_INSTANCE,
        payload: res.data
      });

      // const { instanceType, pemKey } = instance;
      // const resTwo = await axios.get(`${rHost}:${rPort}/create_instance`, {
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   params: {
      //     instance_type: instanceType,
      //     key_name: pemKey,
      //     user_token: localStorage.token
      //   }
      // });
      // localStorage.token
      // const { data } = resTwo;
      // console.log(data);
    } catch (err) {
      console.log("addInstance");
      console.error(err);
      // dispatch({
      //   type: INSTANCE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  // Delete Contact
  const deleteInstance = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_INSTANCE,
        payload: id
      });
    } catch (err) {
      console.log("deleteInstance");
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.msg
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
        deleteInstance,
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
