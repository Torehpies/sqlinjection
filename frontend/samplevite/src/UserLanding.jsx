import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth';

function UserLanding() {
	const navigate = useNavigate()


	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
		navigate('/');
	}

	return (
		<div className="min-h-screen bg-gray-900 p-8">
			<header className="mb-8 flex items-center justify-between">
				<h1 className="text-4xl font-bold text-white">Welcome, User!</h1>
				<button
					onClick={handleLogout}
					className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					Logout
				</button>
			</header>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
					<h3 className="mb-3 text-xl font-semibold text-white">My Profile</h3>
					<p className="text-gray-400">View and edit your profile information</p>
				</div>

				<div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
					<h3 className="mb-3 text-xl font-semibold text-white">My Dashboard</h3>
					<p className="text-gray-400">Access your personal dashboard</p>
				</div>

				<div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
					<h3 className="mb-3 text-xl font-semibold text-white">Settings</h3>
					<p className="text-gray-400">Manage your account settings</p>
				</div>
			</div>
		</div>
	)
}

export default UserLanding
