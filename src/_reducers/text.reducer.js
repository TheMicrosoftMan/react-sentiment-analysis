import { textConstants } from "../_constants";

const initialState = {
  text: ""
};

export function text(state = initialState, action) {
  switch (action.type) {
    case textConstants.TEXT_ENTER:
      return {
        text: action.payload
      };
    default:
      return {
        ...initialState
      };
  }
}
