import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Correctly import all the necessary page components
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage'; 
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
