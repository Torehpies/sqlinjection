import { useNavigate } from 'react-router-dom'

function AdminLanding() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
          <h3 className="mb-3 text-xl font-semibold text-white">User Management</h3>
          <p className="text-gray-400">Manage system users and permissions</p>
        </div>
        
        <div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
          <h3 className="mb-3 text-xl font-semibold text-white">System Settings</h3>
          <p className="text-gray-400">Configure application settings</p>
        </div>
        
        <div className="group rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700 transition-all hover:bg-gray-750 hover:shadow-xl">
          <h3 className="mb-3 text-xl font-semibold text-white">Analytics</h3>
          <p className="text-gray-400">View system analytics and reports</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLanding