import React, { useRef, useEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';
import {
  select,
  scalePoint,
  axisBottom,
  scaleLinear,
  min,
  max,
  axisRight,
  scaleOrdinal,
  schemeSet2,
  line,
  curveCardinal,
} from 'd3';

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
    data2: 23,
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
    data2: 92,
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
const subgroups = Object.keys(data[0]).slice(3);
console.log('subgroups', subgroups);

console.log('sandbox data', data);

export const LineChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // will be called each time if size changes
  useEffect(() => {
    console.log('dimensions', dimensions);
    console.log(svgRef);
    const svg = select(svgRef.current);

    if (!dimensions) return;

    // all changes put below
    console.log('width', dimensions.width);

    // scale X
    const xScale = scalePoint()
      .domain(data.map((dat) => dat.name))
      .range([0, dimensions.width])
      .padding(0.5); // change

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.append('g').call(xAxis);

    console.log(min(values));
    console.log(max(values));

    // scale Y
    const yScale = scaleLinear()
      .domain([0, 150]) // todo
      .range([dimensions.height, 0]); // change

    // create y-axis
    const yAxis = axisRight(yScale);
    svg.select('.y-axis').call(yAxis);

    const colorScale = scaleOrdinal(schemeSet2);

    const myLine = line()
      .x((value) => xScale(value[0]))
      .y((value) => dimensions.height - yScale(value[1]))
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data(data)
      .join('path')
      .attr(
        'd',
        subgroups.map((key) =>
          myLine(
            data.map((arr) => {
              console.log([arr.name, arr[key]]);
              return [arr.name, arr[key]];
            })
          )
        )
      )
      .attr('stroke', colorScale)
      .attr('fill', 'none');

    // //
  }, [data, dimensions]);

  return (
    <div>
      <h2>I'm barChart component</h2>
      <div
        style={{ margin: '40px', height: '100%', minHeight: '200px' }}
        ref={wrapperRef}
      >
        <svg style={{ width: '100%', overflow: 'visible' }} ref={svgRef}></svg>
      </div>
      <hr color='red' />
    </div>
  );
};
