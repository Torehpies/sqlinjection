import { useState } from 'react';
function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setUser(null);
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
				// store role and user info in localStorage
				localStorage.setItem("role", data.user.role);
				localStorage.setItem("user", JSON.stringify(data.user));
				// redirect based on role
				if (data.user.role === "admin") {
					window.location.href = "/admin";
				} else {
					window.location.href = "/user";
				}
			} else {
				setError(data.message || "Login failed");
			}

		} catch (err) {
			setError("Network or server error.");
		}
		setLoading(false);
	};
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
			<div className="w-full max-w-md">
				<div className="mb-8 flex flex-col items-center">
					<div className="text-4xl text-purple-600 font-google self-start">
						CYBER
					</div>
					<h1 className="m-0 text-8xl font-bold tracking-[0.1em] bg-gradient-to-t from-purple-400 to-purple-700 bg-clip-text text-transparent font-google">
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
								className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-3 text-white transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-300">Password:</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-3 text-white transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
							/>
						</div>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="mt-8 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
