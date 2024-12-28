import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import LogIn from './components/LogIn/LogIn';
import FormDashboard from "./components/FormDashboard/FormDashboard";
import Register from "./components/Register/Register";
import Settings from "./components/Settings/Settings";
import Workspace from "./components/Workspace/Workspace";
import './App.css';

function App() {
  // https://iili.io/2e4fj29.png
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/form-dashboard" element={<FormDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/workspace/:formId" element={<Workspace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1 className="not-found" >404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
