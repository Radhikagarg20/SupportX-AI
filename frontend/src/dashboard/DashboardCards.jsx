import React from "react";

const DashboardCards = () => {

  const cards = [
    {
      title: "Total Queries",
      value: "12,540",
      color: "text-cyan-400"
    },
    {
      title: "Resolved Tickets",
      value: "10,230",
      color: "text-green-400"
    },
    {
      title: "AI Accuracy",
      value: "94%",
      color: "text-purple-400"
    },
    {
      title: "Active Users",
      value: "1,204",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
        >

          <p className="text-slate-400">
            {card.title}
          </p>

          <h2 className={`text-4xl font-bold mt-4 ${card.color}`}>
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
};

export default DashboardCards;