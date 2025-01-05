import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage.tsx'
import RegistrationPage from './pages/RegistrationPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegistrationPage/>}></Route>

    </Routes>
  </BrowserRouter>
)
