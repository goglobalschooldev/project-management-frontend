import React from "react";
import "./pieChart.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const PieCharts = () => {
  return (
    <div className="pieChart">
      <p className="title">Task status chart</p>
      <div className="notes">
        <div className="note">
          <div className="box-color"></div>
          <div className="value">Complete</div>
        </div>
        <div className="note">
          <div className="box-color"></div>
          <div className="value">Complete</div>
        </div>
        <div className="note">
          <div className="box-color"></div>
          <div className="value">Complete</div>
        </div>
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={125}
            // outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
