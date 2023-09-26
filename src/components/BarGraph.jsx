import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./BarGraph.scss";

function BarGraph({ graphData }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const xAxisLabelRef = useRef(null);
  const tooltipRef = useRef(null);

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
  useLayoutEffect(() => {
    if (containerHeight === 0 || containerWidth === 0) return;

    const xAxisLabelHeight = 15;
    const currentWeekdayName = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

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
    // Select tooltip from ref
    const tooltip = d3.select(tooltipRef.current);

    // Define X & Y scales from data
    const scaleX = d3
      .scaleBand()
      .domain(graphData.map((d) => getShortDayName(d.day)))
      .range([0, dimensions.width])
      .padding(0.2);
    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(graphData, (d) => d.amount)])
      .range([dimensions.xAxisStartHeight, 0]);

    // Append data bars to svg
    svg
      .selectAll("rect")
      .data(graphData)
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
      .attr("tabindex", "0")
      // Add aria-labels to bar items so that day name and dollar values are read out by SR
      // TODO:  Review aria roles after adding these labels
      //        Getting message in lighthouse audit: [aria-*] attributes do not match their roles
      //        Flagged for the bar graph itself as well as the items
      .attr("aria-label", (d) => `${d.day}, $${d.amount}`)
      .attr("x", (d) => scaleX(getShortDayName(d.day)))
      .attr("y", (d) => scaleY(d.amount))
      .attr("width", scaleX.bandwidth())
      .attr("height", (d) => dimensions.xAxisStartHeight - scaleY(d.amount))
      // On bar mouseover, show the tooltip
      .on("mouseover", function (e, d) {
        const targetBar = d3.select(this);

        tooltip
          .text(`$${d.amount}`)
          .style("opacity", 1)
          // Place tooltip vertically above trigger bar's height
          .style("top", `${parseInt(targetBar.attr("y")) - 40}px`);

        // Place tooltip horizontally in center of trigger bar with overlapping edges
        const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
        const barWidth = parseInt(targetBar.attr("width"));
        const targetBarPosition = parseInt(targetBar.attr("x"));
        const tooltipPosition = Math.ceil(
          targetBarPosition - (tooltipWidth - barWidth) / 2
        );

        tooltip.style("left", `${tooltipPosition}px`);
      })
      // On bar mouseout, hide tooltip
      .on("mouseout", function (e, d) {
        tooltip.style("opacity", 0);
      });

    // Append x axis label to graph
    xAxis
      .attr("transform", `translate(0,${dimensions.xAxisCenterHeight})`)
      .call(d3.axisBottom(scaleX).tickSize(0))
      .select(".domain")
      .attr("stroke-width", 0);
  }, [containerWidth, containerHeight, graphData]);

  return (
    <div className="spending__graph-group">
      <h2 className="spending__heading">Spending - last 7 days</h2>
      <div
        ref={containerRef}
        className="spending__graph-wrapper"
        aria-label="A navigable bar graph of expenses for each weekday from Monday to Sunday"
      >
        <span
          ref={tooltipRef}
          className="spending__graph-tooltip"
          aria-hidden
        />
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

function getShortDayName(fullDayName) {
  return fullDayName.substring(0, 3).toLowerCase();
}

export default BarGraph;
