'use client';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

interface NodeData {
  name: string;
  children?: NodeData[];
}

const DendrogramContainer = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  // align-items: center; // Center vertically if needed
  height: 100% ; // Adjust this as needed
  // margin:0% auto;
`;

const Dendrogram: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data: NodeData = {
      name: "root",
      children: [
        {
          name: "1",
          children: [
            { name: "2" },
            { name: "10" },
          ],
        },
        {
          name: "3",
          children: [
            { name: "4" },
            { name: "6" },
            { name: "7" },
          ],
        },
        {
          name: "5",
          children: [
            { name: "8" },
            { name: "9" },
          ],
        },
      ],
    };

    const width = 500; // Adjusted for visibility
    const height = 320;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(40,0)');

    const cluster = d3.cluster<NodeData>()
      .size([height, width - 160]);

    const root = d3.hierarchy(data);

    cluster(root);

    const link = svg.selectAll('.link')
      .data(root.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => `
        M${d.y},${d.x}
        C${(d.parent?.y ?? 0) + 100},${d.x}
         ${(d.parent?.y ?? 0) + 100},${d.parent?.x ?? 0}
         ${d.parent?.y ?? 0},${d.parent?.x ?? 0}
      `)
      .attr('stroke', 'blue')
      .attr('fill', 'none');

    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', d => `node${d.children ? ' node--internal' : ' node--leaf'}`)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 2.5)
      .attr('stroke', 'blue');

    node.append('text')
      .attr('dy', 3)
      .attr('x', d => d.children ? -8 : 8)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);
  }, []);

  return (
    <DendrogramContainer>
      <svg ref={ref}></svg>
    </DendrogramContainer>
  );
};

export default Dendrogram;
