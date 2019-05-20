import { translateConstants } from "../_constants";

const initialState = {
    translatedText: ""
};

export function translate(state = initialState, action) {
  switch (action.type) {
    case translateConstants.GET_TRANSLATE_REQUEST:
      return {
        ...state
      };
    case translateConstants.GET_TRANSLATE_SUCCES:
      return {
        ...state,
        translatedText: action.payload,
      };
    case translateConstants.GET_TRANSLATE_ERROR:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
}