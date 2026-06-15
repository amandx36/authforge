export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center text-white shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome Admin 
        </h1>

        <p className="text-lg opacity-90">
          Manage users, products, and orders from your dashboard.
        </p>

        <button className="mt-8 px-8 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:scale-105 transition">
          Open Dashboard
        </button>
      </div>
    </div>
  );
}