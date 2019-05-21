import { analysisConstants } from "../_constants";

const initialState = {
  training: false,
  analyzeResults: []
};

export function analysis(state = initialState, action) {
  switch (action.type) {
    case analysisConstants.START_SENTIMENT_ANALYSIS:
      return {
        ...state
      };
    case analysisConstants.SENTIMENT_ANALYSIS_SUCCESS:
      return {
        analyzeResults: action.analyzeResults
      };
    case analysisConstants.SENTIMENT_ANALYSIS_ERROR:
      return {
        ...state
      };
    default:
      return {
        ...state
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