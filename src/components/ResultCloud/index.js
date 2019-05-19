import React from "react";

const ResultCloud = props => {
  return (
    <div className="result-item">
      <span className="result-item_sticker">{props.sticker}</span>
      <div className="result-item_text">{props.text}</div>
    </div>
  );
};

export default ResultCloud;
