'use client';
import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

// Multi-issue, multi-jurisdiction example data
const data = {
  nodes: [
    { name: "Donor 1 (CA)" },
    { name: "Donor 2 (TX)" },
    { name: "Donor 3 (NY)" },
    { name: "Donor 4 (IL)" },
    { name: "Donor 5 (WV)" },
    { name: "Donor 6 (CA)" },
    { name: "Universal Healthcare" },
    { name: "Renewable Energy (CA)" },
    { name: "School Choice (TX)" },
    { name: "Criminal Justice Reform (IL)" },
    { name: "Affordable Housing (NYC)" },
    { name: "Broadband Access (Appalachia)" },
    { name: "CA Candidate X" },
    { name: "CA Candidate Y" },
    { name: "TX Candidate A" },
    { name: "TX Candidate B" },
    { name: "TX Candidate C" },
    { name: "NYC Candidate D" },
    { name: "NYC Candidate E" },
    { name: "IL Candidate F" },
    { name: "WV Candidate G" },
    { name: "WV Candidate H" },
    { name: "Federal Candidate I" },
    { name: "Federal Candidate J" }
  ],
  links: [
    // Donors to Issues
    { source: 0, target: 7, value: 200, label: "Donor 1 → Renewable Energy ($200)" },
    { source: 0, target: 6, value: 100, label: "Donor 1 → Universal Healthcare ($100)" },
    { source: 1, target: 8, value: 150, label: "Donor 2 → School Choice ($150)" },
    { source: 1, target: 6, value: 50, label: "Donor 2 → Universal Healthcare ($50)" },
    { source: 2, target: 10, value: 300, label: "Donor 3 → Affordable Housing ($300)" },
    { source: 2, target: 6, value: 100, label: "Donor 3 → Universal Healthcare ($100)" },
    { source: 3, target: 9, value: 120, label: "Donor 4 → Criminal Justice Reform ($120)" },
    { source: 3, target: 6, value: 80, label: "Donor 4 → Universal Healthcare ($80)" },
    { source: 4, target: 11, value: 100, label: "Donor 5 → Broadband Access ($100)" },
    { source: 4, target: 6, value: 50, label: "Donor 5 → Universal Healthcare ($50)" },
    { source: 5, target: 7, value: 100, label: "Donor 6 → Renewable Energy ($100)" },
    { source: 5, target: 6, value: 50, label: "Donor 6 → Universal Healthcare ($50)" },
    // Issues to Candidates
    { source: 7, target: 12, value: 171, label: "Renewable Energy → CA Candidate X ($171)" },
    { source: 7, target: 13, value: 129, label: "Renewable Energy → CA Candidate Y ($129)" },
    { source: 8, target: 14, value: 68, label: "School Choice → TX Candidate A ($68)" },
    { source: 8, target: 15, value: 53, label: "School Choice → TX Candidate B ($53)" },
    { source: 8, target: 16, value: 29, label: "School Choice → TX Candidate C ($29)" },
    { source: 10, target: 17, value: 201, label: "Affordable Housing → NYC Candidate D ($201)" },
    { source: 10, target: 18, value: 99, label: "Affordable Housing → NYC Candidate E ($99)" },
    { source: 9, target: 19, value: 120, label: "Criminal Justice Reform → IL Candidate F ($120)" },
    { source: 11, target: 20, value: 70, label: "Broadband Access → WV Candidate G ($70)" },
    { source: 11, target: 21, value: 30, label: "Broadband Access → WV Candidate H ($30)" },
    { source: 6, target: 22, value: 250, label: "Universal Healthcare → Federal Candidate I ($250)" },
    { source: 6, target: 23, value: 180, label: "Universal Healthcare → Federal Candidate J ($180)" }
  ]
};

const linkColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FF69B4", "#A0522D", "#FFD700", "#20B2AA"];

// Calculate min and max link values for proportional thickness
const linkValues = data.links.map(link => link.value);
const minValue = Math.min(...linkValues);
const maxValue = Math.max(...linkValues);
const MIN_THICKNESS = 20; // px
const MAX_THICKNESS = 100; // px

function getProportionalWidth(value) {
  if (maxValue === minValue) return (MIN_THICKNESS + MAX_THICKNESS) / 2;
  // Linear scaling
  return (
    MIN_THICKNESS + ((value - minValue) / (maxValue - minValue)) * (MAX_THICKNESS - MIN_THICKNESS)
  );
}

function renderLink({ sourceX, targetX, sourceY, targetY, payload, index }) {
  const color = linkColors[index % linkColors.length];
  const path = `M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;
  // Defensive: fallback label if missing
  let label = payload && payload.label;
  if (!label && payload && typeof payload.source === 'number' && typeof payload.target === 'number') {
    // Try to use node names if available
    const sourceName = data.nodes[payload.source]?.name || payload.source;
    const targetName = data.nodes[payload.target]?.name || payload.target;
    label = `${sourceName} → ${targetName} ($${payload.value})`;
  }
  // Proportional width based on value
  const proportionalWidth = getProportionalWidth(payload.value);
  return (
    <g key={index}>
      <path d={path} stroke={color} strokeWidth={proportionalWidth} fill="none" opacity={0.6} />
      {label && (
        <text x={(sourceX + targetX) / 2} y={(sourceY + targetY) / 2 - 5} fontSize="11" fill="black" textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

export default function SankeyDiagramMultiIssue() {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer minHeight={1000}>
        <Sankey
          data={data}
          nodePadding={30}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          link={renderLink}
          node={{ cursor: "pointer" }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
      <p style={{ fontSize: "0.95em", marginTop: 10 }}>
        <strong>Figure:</strong>
        Multi-issue cash flow from donors to candidates via multiple issue pools. 
        Proportions reflect donor contributions and candidate ratings.
      </p>
    </div>
  );
}
