import Link from "next/link";

export default function HomePage() {
  return (
    <>
         <style>{`
         .bg-dark {
          background-color: #0d0d0d ;
        }

         .hero-box {
          background: #161616;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 56px 48px;
          max-width: 480px;
          width: 100%;
        }

        .lock-icon {
          font-size: 36px;
          margin-bottom: 16px;
          display: block;
        }

         h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #84ff00;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        p.lead {
          color: #fcf8f8;
          font-size: 14px;
          margin-bottom: 32px;
        }

          .btn-primary {
          background-color: #00e5f5;
          border: none;
          color: #0d0d0d;
          font-weight: 700;
          padding: 12px 30px;
          border-radius: 7px;
          font-size: 15px;
        }

        .btn-primary:hover {
          background-color: #a2d339;
          color: #0d0d0d;
        }

        .btn-success {
          background-color: transparent;
          border: 1px solid #22c55e;
          color: #22c55e;
            font-weight: 600;
          padding: 12px 30px;
          border-radius: 7px;
          font-size: 15px;
        }

        .btn-success:hover {
          background-color: #22c55e;
          color: #0d0d0d;
        }

        .footer-text {
          margin-top: 28px;
          font-size: 11px;
          color: #d3cecf;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-text span {
          color: #f5c800;
        }
      `}</style>

      <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
         <div className="text-center hero-box">

           <span className="lock-icon"></span>

          <h1 className="display-3 fw-bold mb-4">
              <u>Authentication System</u>
          </h1>
          <p className="lead mb-5">
            Secure Login and Signup using Next.js
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link href="/login">
              <button className="btn btn-primary btn-lg">
                Login
              </button>
            </Link>
             <Link href="/signup">
              <button className="btn btn-success btn-lg">
                Signup
               </button>
            </Link>
            </div>

          <p className="footer-text">Built with <span>Next.js</span> · JWT · Bcrypt</p>

        </div>
           </div>
    </>
  );
}