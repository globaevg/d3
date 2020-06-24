import React from 'react';
import { Chart } from 'react-google-charts';

const fakeData = [
  ['data', 'data2', 'data3'],
  [1, 23, 43],
  [2, 53, 83],
  [3, 83, 93],
  [4, 13, 83],
  [5, 123, 143],
  [6, 28, 44],
  [7, 25, 143],
  [8, 23, 43],
];

export const GoogleChart = () => {
  return (
    <Chart
      width={'100%'}
      height={'500px'}
      chartType='Bar'
      loader={<div>Loading Chart</div>}
      data={fakeData}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};
