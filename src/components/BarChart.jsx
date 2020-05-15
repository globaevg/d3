import React, { useRef, useEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';
import { select, line, curveCardinal, scaleOrdinal, schemeSet1 } from 'd3';

// const data = [];
export const BarChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [data, setData] = useState([
    [25, 30, 45, 60, 20, 65, 75],
    [35, 38, 65, 70, 30, 75, 65],
  ]);

  // will be called each time if size changes
  useEffect(() => {
    // console.log(wrapperRef);
    // console.log(svgRef);

    // all changes put below
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal);

    const colorScale = scaleOrdinal(schemeSet1);

    console.log(data);
    svg
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('d', (value) => {
        console.log(value);
        return myLine(value);
      })
      .attr('fill', 'none')
      .attr('stroke', colorScale);
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
