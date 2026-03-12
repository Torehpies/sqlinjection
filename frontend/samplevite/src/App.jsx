import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminLanding from './AdminLanding'
import UserLanding from './UserLanding'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLanding />} />
        <Route path="/user" element={<UserLanding />} />
      </Routes>
    </Router>
  )
}

export default App