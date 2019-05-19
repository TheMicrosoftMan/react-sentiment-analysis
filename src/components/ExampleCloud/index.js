import React from "react";
import { connect } from "react-redux";
import * as textActions from "../../_actions/text.actions";

class ExampleCloud extends React.Component {
  render() {
    return (
      <div
        className="example-cloud"
        onClick={() => this.props.textChange(this.props.text)}
      >
        {this.props.text}
      </div>
    );
  }
}

const mapDispatchToProps = {
  textChange: textActions.textChange
};

const connectedExampleCloud = connect(
  null,
  mapDispatchToProps
)(ExampleCloud);
export { connectedExampleCloud as ExampleCloud };
