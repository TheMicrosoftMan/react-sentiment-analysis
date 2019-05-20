import { translateConstants } from "../_constants";
import { getTranslate } from "../_api/translate";
import { encode } from "../_helpers/encode";

export const translate = text => (dispatch, getState) => {
  dispatch({ type: translateConstants.GET_TRANSLATE_REQUEST });
  return getTranslate(encode(text))
    .then(data => {
      if (data) {
        dispatch({
          type: translateConstants.GET_TRANSLATE_SUCCES,
          payload: data.data.responseData.translatedText
        });
      } else {
        dispatch({ type: translateConstants.GET_TRANSLATE_ERROR });
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: translateConstants.GET_TRANSLATE_ERROR });
    });
};
