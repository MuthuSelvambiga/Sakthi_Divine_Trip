import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Tours from "./Pages/Tours";
import TourForm from "./Pages/TourForm";
import Bookings from "./Pages/Bookings";
import Experiences from "./Pages/Experiences";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLayout from "./Components/AdminLayout";
import "./App.css";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Tours />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours/add"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TourForm />
              </AdminLayout>
            </ProtectedRoute>
          }

        />
        <Route
          path="/tours/edit/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TourForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Bookings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiences"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Experiences />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>


    </BrowserRouter >
  );
}

export default App;