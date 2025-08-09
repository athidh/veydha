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
          {/* STEP 1: The root path "/" now shows the HomePage.
            This is the first page the user will see.
          */}
          <Route path="/" element={<HomePage />} />

          {/* STEP 2: The "/login" path shows the LoginPage.
            Your HomePage should have a <Link to="/login"> button.
          */}
          <Route path="/login" element={<LoginPage />} />

          {/* STEP 3: The "/dashboard" path shows the DashboardPage.
            Your LoginPage will navigate here after a successful login.
          */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* It's also good practice to handle pages that don't exist.
            You can add a "Not Found" page later if you like.
            Example: <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
