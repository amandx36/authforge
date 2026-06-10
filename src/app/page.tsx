import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3 fw-bold mb-4">
          Authentication System
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
      </div>
    </div>
  );
}