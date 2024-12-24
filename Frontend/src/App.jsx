import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import LogIn from './Components/LogIn/LogIn';
import './App.css';
import Register from "./Components/Register/Register";
import FormDashboard from "./Components/FormDashboard/FormDashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/form-dashboard" element={<FormDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1 className="not-found" >404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
