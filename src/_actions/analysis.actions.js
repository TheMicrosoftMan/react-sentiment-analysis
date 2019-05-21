import { analysisConstants, sentimentConstants, languagesConstants } from "../_constants";
import ukPositiveWords from "../datasets/ukr.posistive";
import ukNegativeWords from "../datasets/ukr.negative";
import Sentiment from "sentiment";
const sentiment = new Sentiment();

export const analysis = textArray => (dispatch, getState) => {
  dispatch({ type: analysisConstants.START_SENTIMENT_ANALYSIS });
  try {
    let analyzeResults = [];
    textArray.forEach(sentence => {
      if (sentence.length > 0) {
        let analyzeResult = sentiment.analyze(sentence, {
          language: languagesConstants.EN
        });
        let sticker = sentimentConstants.NEUTRAL;
        if (analyzeResult.score > 0) {
          sticker = sentimentConstants.POSITIVE;
        } else if (analyzeResult.score < 0) {
          sticker = sentimentConstants.NEGATIVE;
        }
        analyzeResults.push({
          text: sentence,
          score: analyzeResult.score,
          sticker
        });
      }      
    });
    dispatch({
      type: analysisConstants.SENTIMENT_ANALYSIS_SUCCESS,
      payload: {
        analyzeResults
      }
    });
    return {
      analyzeResults
    };
  } catch (error) {
    console.error(error);
    dispatch({ type: analysisConstants.SENTIMENT_ANALYSIS_ERROR });
  }
};

export const training = () => (dispatch, getState) => {
  dispatch({ type: analysisConstants.ANALISATOR_START_TRAINING });
  let ukDataset = { ...ukPositiveWords, ...ukNegativeWords };
  let ukLanguage = {
    labels: ukDataset
  };
  sentiment.registerLanguage(languagesConstants.UK, ukLanguage);
  dispatch({ type: analysisConstants.ANALISATOR_END_TRAINING });
};
