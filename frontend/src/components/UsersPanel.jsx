function UsersPanel() {

  return (

    <div className="page">

      <h1 className="page-title">
        Users Panel
      </h1>

      <p className="page-subtitle">
        Active Customer Sessions
      </p>

      <div className="cards">

        <div className="card">
          <h3>Online Users</h3>
          <h1>245</h1>
        </div>

        <div className="card">
          <h3>Resolved Tickets</h3>
          <h1>91%</h1>
        </div>

      </div>

    </div>

  );
}

export default UsersPanel;