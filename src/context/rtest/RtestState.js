import React, { useReducer } from "react";
import axios from "axios";
import RtestContext from "./rtestContext";
import rtestReducer from "./rtestReducer";
import setAuthToken from "../../utils/setAuthToken";
import * as RNLocalize from "react-native-localize";


import { INSTANCE_DATA } from "../types";
const HOST = `http://127.0.0.1:5452`;
const RtestState = props => {
  const initialState = {
    instanceInformation: null
  };

  const [state, dispatch] = useReducer(rtestReducer, initialState);

  const getdata = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`${HOST}/create_instance`, {
        params: { user_token: localStorage.token, tz: RNLocalize.getTimeZone(), instance_type: 't2.small', key_name: 'Shiny'}
      });

      dispatch({
        type: INSTANCE_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RtestContext.Provider
      value={{
        instanceInformation: state.instanceInformation,
        getdata
      }}
    >
      {props.children}
    </RtestContext.Provider>
  );
};

export default RtestState;
