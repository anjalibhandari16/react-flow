import React from 'react';
import FlowBuilder from './Components/FlowBuilder';
import NodesPanel from './Components/NodesPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <NodesPanel />
      <FlowBuilder />
    </div>
  );
}

export default App;

