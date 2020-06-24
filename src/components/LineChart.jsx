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
  schemeSet1,
  schemeSet2,
  schemeSet3,
  line,
  curveCardinal,
} from 'd3';

import './chartsStyle.scss';

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
const subgroups = Object.keys(data[0]).slice(3);
console.log('subgroups', subgroups);

console.log('sandbox data', data);

export const LineChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const svgLegend = useRef();

  const [legendHeight, setLegendHeight] = useState(null);

  // will be called each time if size changes
  useEffect(() => {
    const svg = select(svgRef.current);
    const svgLeg = select(svgLegend.current);

    if (!dimensions) return;

    // scale X
    const xScale = scalePoint()
      .domain(data.map((dat) => dat.name))
      .range([0, dimensions.width]); // change
    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.append('g').call(xAxis);

    svg.style('transform', `translateY(${dimensions.height}px)`);

    const minValueY = min(values);
    const maxValueY = max(values);
    const maxMinDif = maxValueY - minValueY;
    const minValue =
      minValueY > 0 && minValueY - maxMinDif * 0.1 < 0
        ? 0
        : minValueY - maxMinDif * 0.1;
    const maxValue = maxValueY + maxMinDif * 0.1;
    // scale Y
    const yScale = scaleLinear()
      .domain([minValue, maxValue]) // todo
      .range([dimensions.height, 0]); // change

    // create y-axis
    const yAxis = axisRight(yScale);
    svg.append('g').call(yAxis);

    svg.style('transform', `translateX(${dimensions.width}px)`);

    const schemeSet = [...schemeSet1, ...schemeSet2, ...schemeSet3];

    const myLine = line()
      .x((value) => xScale(value[0]))
      .y((value) => dimensions.height - yScale(value[1]))
      .curve(curveCardinal);

    const lineData = subgroups.map((key) =>
      data.map((arr) => [arr.name, arr[key]])
    );
    // console.log(lineData);

    svg
      .selectAll('path.line')
      .data(lineData)
      .enter()
      .append('path')
      .attr('d', (d) => myLine(d))
      .attr('stroke', (d, i) => schemeSet[i])
      .transition()
      .attr('stroke-width', 2)
      .attr('d', (d) => myLine(d))
      .attr('fill', 'none');

    svg
      .selectAll('myDots')
      .data(lineData)
      .enter()
      .append('g')
      .style('fill', (d, i) => schemeSet[i])
      .selectAll('myPoints')
      .data([(d) => d])
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => dimensions.height - yScale(d[1]))
      .attr('r', 3);

    // set scroll if height legend more than container's hight
    if (subgroups.length * 25 > 150) {
      // console.log(subgroups.length);
      setLegendHeight(subgroups.length * 25 + 25);
    }

    // Add one dot in the legend for each name.
    svgLeg
      .selectAll('legendsDots')
      .data(subgroups)
      .enter()
      .append('circle')
      .attr('cx', 40)
      .attr('cy', (d, i) => {
        return 25 + i * 25;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr('r', 7)
      .style('fill', (d, i) => schemeSet[i]);

    svgLeg
      .selectAll('legendsNames')
      .data(subgroups)
      .enter()
      .append('text')
      .attr('x', 60)
      .attr('y', (d, i) => 25 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
      .style('fill', (d, i) => schemeSet[i])
      .text((d) => d)
      .style('alignment-baseline', 'middle');

    // //
  }, [data, dimensions]);

  return (
    <div>
      <h2>I'm barChart component</h2>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          style={{
            margin: '40px',
            height: '100%',
            minHeight: '400px',
            flexGrow: '1',
            textAlign: 'left',
          }}
          ref={wrapperRef}
        >
          <svg
            style={{ overflow: 'visible', height: '400px' }}
            ref={svgRef}
          ></svg>
        </div>
        <div
          className='chart-legend'
          style={{
            minWidth: '200px',
            overflow: 'auto',
            padding: '20px 0',
            boxSizing: 'border-box',
            maxHeight: '450px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <svg
            ref={svgLegend}
            style={{
              minHeight: legendHeight ? `${legendHeight}px` : 'auto',
              width: '200px',
            }}
          ></svg>
        </div>
      </div>
      <hr color='red' />
    </div>
  );
};
