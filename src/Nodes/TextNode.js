import React from 'react';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      {data.texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
};

export default TextNode;
