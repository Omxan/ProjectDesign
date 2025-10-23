import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        <p className="text-sm text-center">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
