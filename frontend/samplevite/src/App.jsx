import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminLanding from './AdminLanding'
import UserLanding from './UserLanding'
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
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