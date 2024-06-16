import React from 'react';

const NodesPanel = () => {
  return (
    <div className="nodes-panel">
      <div className="node" draggable onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'textNode')}>
        Text Node
      </div>
    </div>
  );
};

export default NodesPanel;
