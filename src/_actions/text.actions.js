import { textConstants } from "../_constants";

export const textChange = text => (dispatch, getState) => {
  dispatch({ type: textConstants.TEXT_ENTER, payload: text });
};
