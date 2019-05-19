import { analysisConstants, sentimentConstants } from "../_constants";

const initialState = {
  training: false,
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

export function training(state = initialState, action) {
  switch (action.type) {
    case analysisConstants.ANALISATOR_START_TRAINING:
      return {
        training: true
      }
    case analysisConstants.ANALISATOR_END_TRAINING:
      return {
        training: false
      }
    default:
      return {
        training: false
      }
  }
}