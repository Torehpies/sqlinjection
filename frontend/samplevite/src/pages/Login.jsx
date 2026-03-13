import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';


function Login() {
  const { user, role, login } = useAuth();
  const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

  // Redirect away from login if already logged in
  useEffect(() => {
    if (user && role === "admin") {
      navigate("/admin", { replace: true });
    } else if (user && role === "user") {
      navigate("/user", { replace: true });
    }
  }, [user, role, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        // store role and user info using AuthContext
        login(data.user);
        // redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Network or server error.");
    }
    setLoading(false);
  };
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 from-30% to-red-900 to-70% p-4">
			<div className="w-full max-w-md">
				<div className="mb-8 flex flex-col items-center">
					<div className="ml-3 text-4xl text-red-600 font-google self-start">CYBER</div>
					<h1 className="m-0 text-8xl font-bold tracking-[6px] bg-gradient-to-t from-red-400 to-red-700 bg-clip-text text-transparent font-google">
						Lockdown
					</h1>
				</div>
				<form onSubmit={handleLogin} className="rounded-2xl bg-gray-800 p-8 shadow-2xl ring-1 ring-gray-700">
					<h2 className="mb-8 text-center text-3xl font-bold text-white">Login</h2>
					<div className="space-y-6">
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-300">Username:</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-3 text-white transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-300">Password:</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-3 pr-12 text-white transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-400"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					{error && <div className="text-red-500 mt-5">{error}</div>}
				</form>
			</div>
		</div>
	);
}
export default Login;
