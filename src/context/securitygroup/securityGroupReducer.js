import { GET_SECURITY_GROUP } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SECURITY_GROUP:
      console.log("GET_INSTANCES");
      console.log(action.payload);
      return {
        ...state,
        securityGroups: action.payload
      };
    default:
      return state;
  }
};
