import React from "react";

function LiveActivity() {

  const logs = [

    "User connected",

    "AI generated response",

    "Voice recognition started",

    "Database synced",

    "Live escalation activated"

  ];

  return (

    <div className="module-container">

      <div className="module-header">

        <h1>Live Activity</h1>

        <p>
          Realtime Monitoring System
        </p>

      </div>

      <div className="activity-container">

        {logs.map(
          (log, index) => (

            <div
              key={index}
              className="activity-log"
            >

              ⚡ {log}

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default LiveActivity;