import React from 'react';

class InputTextArea extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      value: props.text  
    }
  }

  inputHandler = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <textarea name="textBox" id="textBox" placeholder="Введіть текст..." value={this.state.value} onChange={this.inputHandler}></textarea>
    );
  }
}

export default InputTextArea;