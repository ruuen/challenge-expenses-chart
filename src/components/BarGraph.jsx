import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./BarGraph.scss";

function BarGraph({ graphData }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const xAxisLabelRef = useRef(null);

  // TODO:  move this from state to prop.
  //        the data will get fetched elsewhere)
  const [data, setData] = useState([
    {
      day: "mon",
      amount: 17.45,
    },
    {
      day: "tue",
      amount: 34.91,
    },
    {
      day: "wed",
      amount: 52.36,
    },
    {
      day: "thu",
      amount: 31.07,
    },
    {
      day: "fri",
      amount: 23.39,
    },
    {
      day: "sat",
      amount: 43.28,
    },
    {
      day: "sun",
      amount: 25.48,
    },
  ]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  function setGraphContainerSize() {
    setContainerWidth(containerRef.current.clientWidth);
    setContainerHeight(containerRef.current.clientHeight);
  }

  // On mount & when window is resized, get the new width & height of the svg container element
  useEffect(() => {
    setGraphContainerSize();
    window.addEventListener("resize", setGraphContainerSize);

    return () => window.removeEventListener("resize", setGraphContainerSize);
  }, []);

  // On mount & when the svg container's height or width changes, render the graph
  useEffect(() => {
    if (containerHeight === 0 || containerWidth === 0) return;

    const xAxisLabelHeight = 15;
    const currentWeekdayName = new Date()
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .substring(0, 3)
      .toLowerCase();

    const dimensions = {
      width: containerWidth,
      height: containerHeight,
      xAxisStartHeight: containerHeight - xAxisLabelHeight * 2,
      xAxisCenterHeight: containerHeight - xAxisLabelHeight,
    };

    // Select the svg element from ref
    // Set width, height & viewbox of svg to match container
    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewbox", `0 0 ${dimensions.width} ${dimensions.height}`);

    // Select xAxis label from ref
    const xAxis = d3.select(xAxisLabelRef.current);

    // Define X & Y scales from data
    const scaleX = d3
      .scaleBand()
      .domain(data.map((x) => x.day))
      .range([0, dimensions.width])
      .padding(0.2);
    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.amount)])
      .range([dimensions.xAxisStartHeight, 0]);

    // Append data bars to svg
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .classed("spending__graph-item", true)
      // If datum's day value matches today, add modifier class to handle fill colour change
      .classed(
        "spending__graph-item--today",
        (d) => d.day === currentWeekdayName
      )
      .attr("rx", 5)
      .attr("ry", 5)
      // Add tabindex attr to make each bar in graph keyboard-navigable
      // TODO:  Will have aria-items that announce day & value when these are read by SR or navigated through.
      //        I'll add these when I do the other assorted accessibility items
      .attr("tabindex", "0")
      .attr("x", (d) => scaleX(d.day))
      .attr("y", (d) => scaleY(d.amount))
      .attr("width", scaleX.bandwidth())
      .attr("height", (d) => dimensions.xAxisStartHeight - scaleY(d.amount));

    xAxis
      .attr("transform", `translate(0,${dimensions.xAxisCenterHeight})`)
      .call(d3.axisBottom(scaleX).tickSize(0))
      .select(".domain")
      .attr("stroke-width", 0);

    // TODO:  Add cleanup function return to yeet the graph on unmount
  }, [containerWidth, containerHeight, data]);

  return (
    <div className="spending__graph-group">
      <h2 className="spending__heading">Spending - last 7 days</h2>
      {/* TODO: This graph wrapper needs to announce an accessible description to SRs */}
      <div ref={containerRef} className="spending__graph-wrapper">
        <svg ref={svgRef} className="spending__graph">
          <g
            ref={xAxisLabelRef}
            className="spending__graph-axis"
            aria-hidden
          ></g>
        </svg>
      </div>
    </div>
  );
}

export default BarGraph;
