import 'antd/dist/antd.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import Login from './views/login'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
