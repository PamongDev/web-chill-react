import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Home from "./pages/home/Home.jsx";

function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-in" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
            
      </Routes>
    </BrowserRouter>
  )
}

export default App;