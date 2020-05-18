import React, { useRef, useEffect } from 'react';
import useResizeObserver from './useResizeObserver';
import {
  select,
  line,
  curveCardinal,
  scaleOrdinal,
  schemeSet1,
  scalePoint,
  axisBottom,
} from 'd3';

const data = [1, 3, 5];
export const Example = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called each time if size changes
  useEffect(() => {
    console.log(wrapperRef);
    console.log(svgRef);
    const svg = select(svgRef.current);

    if (!dimensions) return;

    // Bind D3 data
    const update = svg.append('g').selectAll('text').data(data);

    const xScale = scalePoint()
      .domain(['one', 'two', 'three'])
      .range([0, dimensions.width]); // change
    // create x-axis

    xScale.range([0, dimensions.width]);
    const xAxis = axisBottom(xScale).ticks(data.length);
    const xasdf = svg.append('g');
    xasdf
      .enter()
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);
    xasdf.style('transform', `translateY(${dimensions.height}px)`).call(xAxis);
    xasdf.exit().remove();

    // Enter new D3 elements
    update
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 25)
      .attr('y', 40)
      .style('font-size', 24)
      .text((d: number) => d);

    // Update existing D3 elements
    update.attr('x', (d, i) => i * 40).text((d: number) => d);

    // Remove old D3 elements
    update.exit().remove();
    // all changes put below
  }, [data, dimensions]);
  return (
    <div>
      <h2>I'm Example component</h2>
      <div
        style={{ margin: '40px', height: '100%', minHeight: '400px' }}
        ref={wrapperRef}
      >
        <svg style={{ width: '100%', overflow: 'visible' }} ref={svgRef}></svg>
      </div>
      <hr color='red' />
    </div>
  );
};
