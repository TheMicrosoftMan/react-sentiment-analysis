import React from "react";
import { connect } from "react-redux";
import * as textActions from "../../_actions/text.actions";

class InputTextArea extends React.Component {
  render() {
    return (
      <textarea
        name="textBox"
        id="textBox"
        placeholder="Введіть текст..."
        value={this.props.text}
        onChange={e => this.props.textChange(e.target.value)}
      />
    );
  }
}

function mapStateToProps(state) {
  const { text } = state;
  return text;
}

const mapDispatchToProps = {
  textChange: textActions.textChange
};

const connectedInputTextArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputTextArea);
export { connectedInputTextArea as InputTextArea };
