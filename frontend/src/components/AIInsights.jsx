import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function AIInsights() {

  const data = [

    { day: "Mon", chats: 4 },

    { day: "Tue", chats: 8 },

    { day: "Wed", chats: 12 },

    { day: "Thu", chats: 7 },

    { day: "Fri", chats: 16 },

    { day: "Sat", chats: 10 },

    { day: "Sun", chats: 18 }

  ];

  return (

    <div className="module-container">

      <div className="module-header">

        <h1>AI Insights</h1>

        <p>
          Analytics Dashboard
        </p>

      </div>

      <div className="chart-box">

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart data={data}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="chats"
              stroke="#22d3ee"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AIInsights;