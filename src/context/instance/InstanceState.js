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

const InstanceState = props => {
  const initialState = {
    instances: null,
    instance: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(instanceReducer, initialState);

  // Get Instance
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_INSTANCES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Contact
  const addInstance = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_INSTANCE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_INSTANCE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: INSTANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const updateInstance = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
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
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT_INSTANCE, payload: contact });
  };

  // Clear Current Contact
  const clearCurrentInstance = () => {
    dispatch({ type: CLEAR_CURRENT_INSTANCE });
  };

  // Filter Instance
  const filterContacts = text => {
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
        deleteContact,
        setCurrent,
        clearCurrentInstance,
        updateInstance,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </InstanceContext.Provider>
  );
};

export default InstanceState;
