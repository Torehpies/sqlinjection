import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminLanding from './pages/AdminLanding.jsx'
import UserLanding from './pages/UserLanding.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLanding />
            </AdminRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLanding />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App