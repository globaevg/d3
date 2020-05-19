import React, { useRef, useEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';
import {
  select,
  line,
  curveCardinal,
  scaleOrdinal,
  schemeSet1,
  scaleBand,
  axisBottom,
  scaleLinear,
  axisRight,
  group,
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

console.log('sandbox data', data);

export const BarChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const svgLegend = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [legendHeight, setLegendHeight] = useState(null);

  // will be called each time if size changes
  useEffect(() => {
    // console.log(wrapperRef);
    // console.log(svgRef);
    const svg = select(svgRef.current);
    const svgLeg = select(svgLegend.current);

    if (!dimensions) return;
    // all changes put below

    // scales
    const xScale = scaleBand()
      .domain(groups)
      .range([0, dimensions.width]) // change
      .padding(0.2);

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yScale = scaleLinear()
      .domain([0, 150]) // todo
      .range([dimensions.height, 0]); // change

    // create y-axis
    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis);

    const xSubgroup = scaleBand()
      .domain(subgroups)
      .range([0, xScale.bandwidth()])
      .padding([0.05]);

    // color palette = one color per subgroup
    const color = scaleOrdinal().domain(subgroups).range(schemeSet1);

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d.name)},0)`)
      .selectAll('rect')
      .data((d) =>
        subgroups.map((key) => ({ key, value: d[key], name: d.name }))
      )
      .enter()
      .append('rect')
      .attr('x', (d) => xSubgroup(d.key))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xSubgroup.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join((enter) =>
            enter.append('text').attr('y', yScale(value.value) - 4)
          )
          .attr('class', 'tooltip')
          .text(value.value)
          .attr(
            'x',
            (d) => xScale(value.name) + xSubgroup.bandwidth() * 1.1 * index
          )
          .attr('text-anchor', 'right')
          .transition()
          .attr('y', yScale(value.value) - 8)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .attr('height', (d) => dimensions.height - yScale(d.value))
      .attr('fill', (d) => color(d.key));

    // set scroll if height legend more than container's hight
    if (subgroups.length * 25 > 150) {
      console.log(subgroups.length);
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
      .style('fill', color);

    svgLeg
      .selectAll('legendsNames')
      .data(subgroups)
      .enter()
      .append('text')
      .attr('x', 60)
      .attr('y', (d, i) => 25 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
      .style('fill', color)
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
          <svg style={{ overflow: 'visible', height: '400px' }} ref={svgRef}>
            <g className='x-axis' />
            <g className='y-axis' />
          </svg>
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
