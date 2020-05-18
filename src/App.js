import React from 'react';

import './App.css';
import { BarChart } from './components/BarChart';
import { LineChart } from './components/LineChart';
import { Example } from './components/Example';

function App() {
  return (
    <div className='App'>
      {/* <BarChart /> */}
      <LineChart />
      {/* <Example /> */}
    </div>
  );
}

export default App;
