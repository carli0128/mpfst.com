import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Meter({ mfrac, conflict }: { mfrac: number; conflict: number }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    const width = 300,
      height = 160;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const color = d3.scaleSequential(d3.interpolateRdYlGn).domain([1, 0]);
    const border =
      conflict < 0.01
        ? "gray"
        : conflict < 0.05
        ? "#fb923c"
        : "#dc2626";

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color(mfrac))
      .attr("stroke", border)
      .attr("stroke-width", 4);

    svg.append("text")
      .attr("x", width/2)
      .attr("y", height/2 + 10)
      .attr("text-anchor", "middle")
      .attr("font-size", 48)
      .attr("fill", "#000")
      .text(mfrac.toFixed(2));
  }, [mfrac, conflict]);

  return <svg ref={ref} width={300} height={160}></svg>;
}
