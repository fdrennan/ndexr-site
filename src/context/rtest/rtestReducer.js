import { INSTANCE_DATA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case INSTANCE_DATA:
      return {
        ...state,
        instanceInformation: action.payload
      };
    default:
      return state;
  }
};
