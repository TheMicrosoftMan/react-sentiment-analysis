import { analysisConstants, sentimentConstants } from "../_constants";
import Sentiment from "sentiment";

export const analysis = text => (dispatch, getState) => {
  dispatch({ type: analysisConstants.START_SENTIMENT_ANALYSIS });
  try {
    const sentiment = new Sentiment();
    const analyzeResult = sentiment.analyze(text);
    let sticker = sentimentConstants.NEUTRAL;
    if (analyzeResult.score > 0) {
      sticker = sentimentConstants.POSITIVE;
    } else if (analyzeResult.score < 0) {
      sticker = sentimentConstants.NEGATIVE;
    }
    dispatch({
      type: analysisConstants.SENTIMENT_ANALYSIS_SUCCESS,
      payload: {
        text: text,
        sentimentalScore: analyzeResult.score,
        sentimentSticker: sticker
      }
    });
    return {
      text: text,
      sentimentalScore: analyzeResult.score,
      sentimentSticker: sticker
    };
  } catch (error) {
    console.error(error);
    dispatch({ type: analysisConstants.SENTIMENT_ANALYSIS_ERROR });
  }
};
