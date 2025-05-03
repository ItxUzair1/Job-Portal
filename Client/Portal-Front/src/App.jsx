import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import JobListingPage from "./pages/JobListing";
import JobDetailsPage from "./pages/JobDetailPage";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/allJobs" element={<JobListingPage/>} />
        <Route path="/job/:id" element={<JobDetailsPage/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
