

import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState } from 'react-flow-renderer';
import TextNode from '../Nodes/TextNode';
import SettingsPanel from './SettingsPanel';
import { Button } from '@mui/material';

const nodeTypes = {
  textNode: TextNode,
};

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find(node => node.id === params.source);
    if (sourceNode && sourceNode.data && sourceNode.data.connected) {
      return;
    }

    setEdges((eds) => addEdge(params, eds));
    setNodes((nds) => nds.map(node => {
      if (node.id === params.source) {
        node.data = { ...node.data, connected: true };
      }
      return node;
    }));
  }, [nodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const updateNode = (newNode) => {
    setNodes((nds) => nds.map(node => (node.id === newNode.id ? newNode : node)));
    setSelectedNode(newNode);
  };

  const saveFlow = () => {
    const hasDisconnectedNodes = nodes.some(node => !node.data.connected);
    if (hasDisconnectedNodes) {
      alert('Some nodes are disconnected!');
      return;
    }

    const flowData = { nodes, edges };
    localStorage.setItem('chatbotFlow', JSON.stringify(flowData));
    alert('Flow saved successfully!');
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <ReactFlowProvider>
        <div style={{ height: '100%', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <SettingsPanel selectedNode={selectedNode} updateNode={updateNode} />
      </ReactFlowProvider>
      <Button variant="contained" color="primary" onClick={saveFlow}>Save Flow</Button>
    </div>
  );
};

export default FlowBuilder;
