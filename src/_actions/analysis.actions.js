import { analysisConstants, sentimentConstants, languagesConstants } from "../_constants";
import ukPositiveWords from "../datasets/ukr.posistive";
import ukNegativeWords from "../datasets/ukr.negative";
import { isCyrillic } from "../_helpers/isCyrillic";
import Sentiment from "sentiment";
const sentiment = new Sentiment();

export const analysis = text => (dispatch, getState) => {
  dispatch({ type: analysisConstants.START_SENTIMENT_ANALYSIS });
  try {
    let analyzeResult;
    if (isCyrillic(text)) {
      analyzeResult = sentiment.analyze(text, { language: languagesConstants.UK });
    } else {
      analyzeResult = sentiment.analyze(text, { language: languagesConstants.EN });
    }
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

export const training = () => (dispatch, getState) => {
  dispatch({ type: analysisConstants.ANALISATOR_START_TRAINING });
  let ukDataset = {...ukPositiveWords, ...ukNegativeWords};
  let ukLanguage = {
    labels: ukDataset
  };
  sentiment.registerLanguage(languagesConstants.UK, ukLanguage);
  dispatch({ type: analysisConstants.ANALISATOR_END_TRAINING });
};
