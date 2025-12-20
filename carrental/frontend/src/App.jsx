import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllCars from './pages/AllCars';
import Register from './pages/Register';
import Login from './pages/Login';
import AddCar from './pages/AddCar';
import Navbar from './pages/Navbar';
import LandingPage from './pages/Home';
import ContactPage from './pages/Contact';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import ProtectedRoute from './component/ProtectRoute';
import AboutPage from './pages/About';

import Confirmation from './pages/Confirmation';

function App() {
  const { carToken } = useContext(AppContext);

  return (
    <BrowserRouter>
      {carToken && <Navbar />} {/* ⬅️ Show Navbar only when logged in */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <AllCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
