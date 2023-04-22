import App from '@/App'
import About from '@/views/About/About'
import Home from '@/views/Home/Home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// history -> BrowserRouter
// hash -> HashRouter

const baseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to={'/home'} />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default baseRouter
