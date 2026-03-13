import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminLanding from './AdminLanding'
import UserLanding from './UserLanding'
import GuestLanding from './GuestLanding'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/admin" element={localStorage.getItem('role') === 'admin' ? <AdminLanding /> : <Login />} />
         <Route path="/user" element={localStorage.getItem('role') === 'user' ? <UserLanding /> : <Login />} />
         <Route path="/guest" element={<GuestLanding />} />
      </Routes>
    </Router>
  )
}

export default App