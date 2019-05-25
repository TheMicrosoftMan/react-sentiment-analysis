import React from "react";
import { connect } from "react-redux";
import * as analysisActions from "./_actions/analysis.actions";
import * as translateActions from "./_actions/translate.actions";
import { sentimentConstants } from "./_constants/";
import "./_styles/index.scss";
import { InputTextArea } from "./components/InputTextArea/";
import AnalyzeButton from "./components/AnalyzeButton";
import { ExampleCloud } from "./components/ExampleCloud";
import ResultCloud from "./components/ResultCloud";
import { isCyrillic } from "./_helpers/isCyrillic";

const examples = [
  "Cats are stupid.",
  "Cats are not stupid.",
  "the world is cold ❄️ my cat is warm 🔥",
  "We’ll be back next week with a new episode! In the meantime, may your cats be merry and bright! 😺🎄",
  "Electricity is only responsible 25% of greenhouse gas emissions each year. To prevent the worst effects of climate change, we have to address the other 75%:",
  "I recently visited a high school that has gone from one of Chicago’s worst to one of its best.",
  "I had a great time chatting with a fellow tech enthusiast, @MKBHD. We talked about electric cars, AI, and how tech can give back."
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      resultsList: []
    };

    this.props.training();
  }

  analysisText = () => {
    let textArray = this.props.text.split(".");
    if (isCyrillic(this.props.text)) {
      this.props.translateText(this.props.text).then(() => {
        let translateTextArray = this.props.translate.split(".");
        const {analyzeResults} = this.props.analysisText(translateTextArray);
        let stateResults = this.state.resultsList;        
        let sentenceResultsArr = analyzeResults.map((sentence, index) => {
          return `${this.getSticker(sentence.sticker)} ${textArray[index]}.`
        });
        stateResults.push(sentenceResultsArr);
        stateResults.reverse();
        this.setState({ resultsList: stateResults });
      });
    } else {      
      const {analyzeResults} = this.props.analysisText(textArray);
      let stateResults = this.state.resultsList;
      let sentenceResultsArr = analyzeResults.map(sentence => {
        return `${this.getSticker(sentence.sticker)} ${sentence.text}.`
      });
      stateResults.push(sentenceResultsArr);
      stateResults.reverse();
      this.setState({ resultsList: stateResults });
    }
  };

  getSticker = stickerType => {
    switch (stickerType) {
      case sentimentConstants.NEUTRAL:
        return "😐";
      case sentimentConstants.POSITIVE:
        return "😊";
      case sentimentConstants.NEGATIVE:
        return "😔";
      default:
        return "😐";
    }
  };

  render() {
    return (
      <div className="app">
        <div className="block">
          <InputTextArea text={this.state.text} />
          <AnalyzeButton
            text={this.state.text}
            analysisText={this.analysisText}
          />
          <div className="examples-list">
            {examples.map((example, index) => {
              return <ExampleCloud key={index} text={example} />;
            })}
          </div>
        </div>
        <div className="block result-list-block">
          {this.state.resultsList.length > 0 &&
            this.state.resultsList.map((result, index) => {
              let text = result.map((sent, index) => {
                return (
                  <React.Fragment key={index}>
                    {sent}
                    <br></br>
                  </React.Fragment>
                )
              });
              return (
                <ResultCloud
                  key={index}
                  text={text}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { text, translate } = state;
  return {
    text: text.text,
    translate: translate.translatedText
  };
}

const mapDispatchToProps = {
  analysisText: analysisActions.analysis,
  training: analysisActions.training,
  translateText: translateActions.translate
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export { connectedApp as App };
