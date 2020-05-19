import React, { useRef, useEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';
import {
  select,
  arc,
  pie,
  scaleOrdinal,
  schemeSet1,
  interpolate,
  tooltip,
} from 'd3';

const innerData = [
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
const data = innerData.map((item) => ({ name: item.name, value: item.data }));

data.forEach((item) => {
  values = [...values, item.data];
});
// const groups = data.map((data) => data.name);
const subgroups = data.map((data) => data.name);
// console.log('subgroups', subgroups);

// console.log('sandbox data', data);

export const PieChart = () => {
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

    // arc takes instructions (objects with special properties, like startAngle, endAngle, etc.)
    // and transforms them into "d" attributes for path elements
    const radius = 200;
    const arcGenerator = arc().innerRadius(0).outerRadius(150);

    // pie will transform data to instructions for arcGenerator
    const pieGenerator = pie()
      .value((d) => d.value)
      .sort(null); // makes sure data doesn't get sorted

    // now transform data to instructions for arc()
    const instructions = pieGenerator(data);

    console.log('prepare data in chart 1', instructions);

    // generate colorScale
    // https://github.com/d3/d3-scale-chromatic
    const color = scaleOrdinal(schemeSet1);

    // render slices (instructions)
    svg
      .selectAll('.slice')
      .data(instructions)
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (d, i) => {
        // console.log(d);
        return color(i);
      })
      .style(
        'transform',
        `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`
      )
      .transition()
      .attrTween('d', function (nextInstruction, index) {
        // animation when changing data
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return (t) => arcGenerator(interpolator(t));
      });

    // The arc generator
    var arcs = arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Add the polylines vetween chart and labels:
    svg
      .selectAll('allPolylines')
      .data(instructions)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .style(
        'transform',
        `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`
      )
      .attr('points', function (d) {
        var posA = arcs.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .style(
        'transform',
        `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`
      )
      .data(instructions)
      .enter()
      .append('text')
      .text(function (d) {
        // console.log(d.data.name);
        return d.data.name;
      })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });

    // set scroll if height legend more than container's hight
    if (subgroups.length * 25 + 25 > 150) {
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
      .attr('cy', (d, i) => 25 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
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
      <h2>I'm PieChart component</h2>
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
