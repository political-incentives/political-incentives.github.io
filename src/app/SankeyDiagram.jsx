'use client';
import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

// Example data: Donor -> Issue Pool -> Candidate
const data = {
  nodes: [
    { name: "Donor: Alice" },
    { name: "Donor: Bob" },
    { name: "Issue Pool: Constitutional Carry (WY)" },
    { name: "Candidate A" },
    { name: "Candidate B" }
  ],
  links: [
    { source: 0, target: 2, value: 300 }, // Alice to Issue Pool
    { source: 1, target: 2, value: 200 }, // Bob to Issue Pool
    { source: 2, target: 3, value: 350 }, // Pool to Candidate A
    { source: 2, target: 4, value: 150 }  // Pool to Candidate B
  ]
};

export default function SankeyDiagram() {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer>
        <Sankey
          data={data}
          nodePadding={30}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          link={{ stroke: "#8884d8" }}
          node={{ cursor: "pointer" }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
      <p style={{ fontSize: "0.95em", marginTop: 10 }}>
        <strong>Figure:</strong>
        Example cash flow from donors to candidates via an issue pool.
        Proportions reflect donor contributions and candidate ratings.
      </p>
      <p></p>
    </div>
  );
}
