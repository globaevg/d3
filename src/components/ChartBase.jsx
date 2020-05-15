import React, { useRef, useEffect } from 'react';
import useResizeObserver from './useResizeObserver';
import { select, line, curveCardinal, scaleOrdinal, schemeSet1 } from 'd3';

const data = [];
export const BarChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called each time if size changes
  useEffect(() => {
    console.log(wrapperRef);
    console.log(svgRef);
    const svg = select(svgRef.current);

    if (!dimensions) return;
    // all changes put below
  }, [data, dimensions]);
  return (
    <div>
      <h2>I'm barChart component</h2>
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
