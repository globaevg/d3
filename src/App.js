import React from 'react';

import './App.css';
import { BarChart } from './components/BarChart';
import { LineChart } from './components/LineChart';
import { Example } from './components/Example';
import { PieChart } from './components/PieChart';
import { PieChart2 } from './components/PieChart2';

function App() {
  return (
    <div className='App'>
      {/* <BarChart /> */}
      {/* <LineChart /> */}
      {/* <Example /> */}
      <PieChart2 />
      {/* <PieChart /> */}
    </div>
  );
}

export default App;
