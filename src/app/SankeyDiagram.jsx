'use client';
import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

// Example data: Donor -> Issue Pool -> Candidate
const data = {
  nodes: [
    { name: "Donor: Alice", label: "Alice" },
    { name: "Donor: Bob", label: "Bob" },
    { name: "Issue Pool: Constitutional Carry (WY)", label: "Constitutional Carry (WY)" },
    { name: "Candidate A", label: "Candidate A" },
    { name: "Candidate B", label: "Candidate B" }
  ],
  links: [
    { source: 0, target: 2, value: 300, label: "Alice → Issue Pool ($300)" }, // Alice to Issue Pool
    { source: 1, target: 2, value: 200, label: "Bob → Issue Pool ($200)" }, // Bob to Issue Pool
    { source: 2, target: 3, value: 350, label: "Pool → Candidate A ($350)" }, // Pool to Candidate A
    { source: 2, target: 4, value: 150, label: "Pool → Candidate B ($150)" }  // Pool to Candidate B
  ]
};

const linkColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F"];

// Calculate scaling for link thickness based on value
const minThickness = 50;
const maxThickness = 250;
const minValue = Math.min(...data.links.map(l => l.value));
const maxValue = Math.max(...data.links.map(l => l.value));
const scale = (value) => {
  if (maxValue === minValue) return (minThickness + maxThickness) / 2;
  return minThickness + ((value - minValue) / (maxValue - minValue)) * (maxThickness - minThickness);
};

function renderLink({ sourceX, targetX, sourceY, targetY, payload, index }) {
  const color = linkColors[index % linkColors.length];
  const path = `M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;
  // Defensive: fallback label if missing
  let label = payload && payload.label;
  if (!label && payload && typeof payload.source === 'number' && typeof payload.target === 'number') {
    const sourceName = data.nodes[payload.source]?.name || payload.source;
    const targetName = data.nodes[payload.target]?.name || payload.target;
    label = `${sourceName} → ${targetName} ($${payload.value})`;
  }
  // Use scaled thickness based on value
  const scaledWidth = scale(payload.value);
  return (
    <g key={index}>
      <path d={path} stroke={color} strokeWidth={scaledWidth} fill="none" opacity={0.6} />
      {label && (
        <text x={(sourceX + targetX) / 2} y={(sourceY + targetY) / 2 - 5} fontSize="12" fill="black" textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

// Custom node renderer to add labels
function renderNode({ x, y, width, height, index, payload }) {
  const node = data.nodes[index];
  const label = node.label || node.name; // Use label if available, fallback to name
  return (
    <g key={index}>
      <rect x={x} y={y} width={width} height={height} fill="#8884d8" fillOpacity={0.3} rx={5} ry={5} />
      <text
        x={x + width / 2}
        y={y + height + 20} // Place label below the node
        fontSize="14"
        fill="#333"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  );
}

export default function SankeyDiagram() {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer minHeight={500}>
        <Sankey
          data={data}
          nodePadding={30}
          margin={{ top: 20, bottom: 50, left: 20, right: 50 }}
          link={renderLink}
          node={renderNode} // Use custom node renderer
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
      <p style={{ fontSize: "0.95em", marginTop: 10, minHeight: "50px" }}>
        <strong>Figure:</strong>
        Example cash flow from donors to candidates via an issue pool.
        Proportions reflect donor contributions and candidate ratings.
      </p>
    </div>
  );
}