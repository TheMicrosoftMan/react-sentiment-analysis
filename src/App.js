import React from "react";
import { connect } from "react-redux";
import * as analysisActions from "./_actions/analysis.actions";
import { sentimentConstants } from "./_constants/";
import "./_styles/index.scss";
import { InputTextArea } from "./components/InputTextArea/";
import AnalyzeButton from "./components/AnalyzeButton";
import { ExampleCloud } from "./components/ExampleCloud";
import ResultCloud from "./components/ResultCloud";

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
    const analysResult = this.props.analysisText(this.props.text);
    let stateResults = this.state.resultsList;
    stateResults.push(analysResult);
    this.setState({ resultsList: stateResults });
  };

  getSticker = stickerType => {
    switch (stickerType) {
      case sentimentConstants.NEUTRAL:
        return "😐";
      case sentimentConstants.POSITIVE:
        return "😄";
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
        <div className="block">
          {this.state.resultsList.length > 0 &&
            this.state.resultsList.map((result, index) => {
              return (
                <ResultCloud
                  key={index}
                  text={result.text}
                  sticker={this.getSticker(result.sentimentSticker)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { text } = state;
  return text;
}

const mapDispatchToProps = {
  analysisText: analysisActions.analysis,
  training: analysisActions.training
};

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export { connectedApp as App };
