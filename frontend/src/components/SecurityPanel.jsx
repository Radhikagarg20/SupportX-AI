import React from "react";

function SecurityPanel() {

  return (

    <div className="module-container">

      <div className="module-header">

        <h1>Security Center</h1>

        <p>
          JWT + Firebase Authentication
        </p>

      </div>

      <div className="panel-grid">

        <div className="panel-card">

          <h3>
            JWT Auth
          </h3>

          <p>
            Enabled
          </p>

        </div>

        <div className="panel-card">

          <h3>
            Firebase Security
          </h3>

          <p>
            Connected
          </p>

        </div>

      </div>

    </div>

  );

}

export default SecurityPanel;