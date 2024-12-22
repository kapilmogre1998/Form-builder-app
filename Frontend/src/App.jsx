import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import LogIn from './Components/LogIn/LogIn';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
