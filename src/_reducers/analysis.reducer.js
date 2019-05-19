import { analysisConstants, sentimentConstants } from "../_constants";

const initialState = {
  text: "",
  sentimentalScore: 0,
  sentimentSticker: sentimentConstants.NEUTRAL
};

export function analysis(state = initialState, action) {
  switch (action.type) {
    case analysisConstants.START_SENTIMENT_ANALYSIS:
      return {
        ...initialState
      };
    case analysisConstants.SENTIMENT_ANALYSIS_SUCCESS:
      return {
        text: action.payload.text,
        sentimentalScore: action.payload.sentimentalScore,
        sentimentSticker: action.payload.sentimentSticker
      };
    case analysisConstants.SENTIMENT_ANALYSIS_ERROR:
      return {
        ...initialState
      };
    default:
      return {
        ...initialState
      };
  }
}
