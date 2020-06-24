import React from 'react';
import { Chart } from 'react-google-charts';

const newData = [
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

const data = [
  {
    name: 'asdf',
    location: 'city',
    surname: 'fdas',
    data: 123,
    data2: 32,
    data3: 55,
  },
  {
    name: 'asdf2',
    location: 'city2',
    surname: 'fdas2',
    data: 111,
    data2: 65,
    data3: 77,
  },
  {
    name: 'asdf3',
    location: 'city3',
    surname: 'fdas3',
    data: 87,
    data2: 87,
    data3: 35,
  },
  {
    name: 'asdf4',
    location: 'city4',
    surname: 'fdas4',
    data: 18,
    data2: 130,
    data3: 75,
  },
  {
    name: 'asdf5',
    location: 'city5',
    surname: 'fdas5',
    data: 98,
    data2: 67,
    data3: 88,
  },
  {
    name: 'asdf6',
    location: 'city6',
    surname: 'fdas6',
    data: 28,
    data2: 20,
    data3: 85,
  },
  {
    name: 'asdf7',
    location: 'city7',
    surname: 'fdas7',
    data: 89,
    data2: 45,
    data3: 35,
  },
  {
    name: 'asdf8',
    location: 'city8',
    surname: 'fdas8',
    data: 135,
    data2: 132,
    data3: 98,
  },
  {
    name: 'asdf9',
    location: 'city9',
    surname: 'fdas9',
    data: 87,
    data2: 94,
    data3: 76,
  },
  {
    name: 'asdf10',
    location: 'city10',
    surname: 'fdas10',
    data: 59,
    data2: 86,
    data3: 9,
  },
];

var values = [];

data.forEach((item) => {
  values = [...values, item.data, item.data2, item.data3];
});
const groups = data.map((data) => data.name);
const subgroups = Object.keys(data[0]).slice(3);
// console.log('subgroups', subgroups);

// console.log('sandbox data', data);

export const GoogleChart = () => {
  return (
    <Chart
      width={'100%'}
      height={'500px'}
      chartType='Bar'
      loader={<div>Loading Chart</div>}
      data={newData}
      options={
        {
          // Material design options
        }
      }
      rootProps={{ 'data-testid': '1' }}
    />
  );
};
