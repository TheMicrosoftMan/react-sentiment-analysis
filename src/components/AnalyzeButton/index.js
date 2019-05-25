import React from "react";

const AnalyzeButton = props => {
  return (
    <button
      className="analyze-button"
      onClick={props.analysisText}
    >
      Аналізувати
    </button>
  );
};

export default AnalyzeButton;
