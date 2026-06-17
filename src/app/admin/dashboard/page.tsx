export default function AdminDashboard() {
  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 48px 40px;
          width: 100%;
          max-width: 480px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: #1a1200;
          color: #f5c800;
          border: 1px solid #3a2e00;
          border-radius: 4px;
          padding: 4px 12px;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .card-icon {
          font-size: 36px;
          display: block;
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .card-title span {
          color: #f5c800;
        }

        .card-sub {
          font-size: 13px;
          color: #555;
          line-height: 1.7;
          margin-bottom: 36px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 32px;
        }

        .stat-box {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 8px;
          padding: 14px 8px;
        }

        .stat-num {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: #f5c800;
          font-family: 'Courier New', monospace;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 10px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .btn-dashboard {
          width: 100%;
          background: #f5c800;
          color: #0d0d0d;
          border: none;
          border-radius: 7px;
          padding: 13px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
          margin-bottom: 10px;
        }

        .btn-dashboard:hover {
          background: #e0b800;
        }

        .divider {
          height: 1px;
          background: #1e1e1e;
          margin: 28px 0;
        }

        .quick-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn-quick {
          background: #1a1a1a;
          color: #888;
          border: 1px solid #222;
          border-radius: 7px;
          padding: 10px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }

        .btn-quick:hover {
          border-color: #f5c800;
          color: #f5c800;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <span className="badge">Admin Access</span>

          
          <p className="card-title">Welcome, <span>Admin</span></p>
          <p className="card-sub">
            Manage users, products, and orders from your dashboard.
          </p>

          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-num">—</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">—</span>
              <span className="stat-label">Orders</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">—</span>
              <span className="stat-label">Products</span>
            </div>
          </div>

          <button className="btn-dashboard">
            Open Dashboard
          </button>

          <div className="divider" />

          <div className="quick-links">
            <button className="btn-quick">Manage Users</button>
            <button className="btn-quick">View Orders</button>
            <button className="btn-quick">Products</button>
            <button className="btn-quick">Settings</button>
          </div>

        </div>
      </div>
    </>
  );
}