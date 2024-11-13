import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BatteryChartD3 = ({ voltage, time }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;

    svg.attr("width", width).attr("height", height);

    const xScale = d3.scaleLinear().domain([0, d3.max(time)]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(voltage)]).range([height, 0]);

    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d.toFixed(0)));

    svg.append("g").call(d3.axisLeft(yScale));

    const line = d3
      .line()
      .x((d, i) => xScale(time[i]))
      .y((d) => yScale(d));

    svg
      .append("path")
      .datum(voltage)
      .attr("fill", "none")
      .attr("stroke", "teal")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [voltage, time]);

  return <svg ref={svgRef}></svg>;
};

export default BatteryChartD3;