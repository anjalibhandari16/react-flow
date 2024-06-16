import React from 'react';

const SettingsPanel = ({ selectedNode, updateNode }) => {
  if (!selectedNode) return null;

  const handleChange = (event) => {
    const newNode = { ...selectedNode, data: { ...selectedNode.data, texts: event.target.value.split('\n') } };
    updateNode(newNode);
  };

  return (
    <div className="settings-panel">
      <textarea value={selectedNode.data.texts.join('\n')} onChange={handleChange} />
    </div>
  );
};

export default SettingsPanel;
