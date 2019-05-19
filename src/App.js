import React from 'react';
import './_styles/index.scss';
import InputTextArea from './components/InputTextArea/';
import AnalyzeButton from './components/AnalyzeButton';
import ExampleCloud from './components/ExampleCloud';
import ResultCloud from './components/ResultCloud';

class App extends React.Component {
  state = {
    text: "",
    examples: [
      "Cats are stupid.",
      "Cats are not stupid.",
      "the world is cold ❄️ my cat is warm 🔥",
      "We’ll be back next week with a new episode! In the meantime, may your cats be merry and bright! 😺🎄",
      "Electricity is only responsible 25% of greenhouse gas emissions each year. To prevent the worst effects of climate change, we have to address the other 75%:",
      "I recently visited a high school that has gone from one of Chicago’s worst to one of its best.",
      "I had a great time chatting with a fellow tech enthusiast, @MKBHD. We talked about electric cars, AI, and how tech can give back.",
    ]
  };

  toTextArea = text => {
    console.log(text);
  }

  render() {
    return (
      <div className="app">
        <div className="block">
          <InputTextArea text={this.state.text} />
          <AnalyzeButton toTextArea={this.toTextArea} />
          <div className="examples-list">
            {
              this.state.examples.map((example, index) => {
                return <ExampleCloud key={index} text={example} />
              })
            }
          </div>
        </div>
        <div className="block">
          <ResultCloud text="dasda" />  
          <ResultCloud text="dasda" />  
          <ResultCloud text="dasda" />  
          <ResultCloud text="dasda" />  
        </div>        
      </div>
    );
  }
}

export default App;