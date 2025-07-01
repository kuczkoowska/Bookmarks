import TilePage from "./pages/TilePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<TilePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </>
  )
}

export default App
