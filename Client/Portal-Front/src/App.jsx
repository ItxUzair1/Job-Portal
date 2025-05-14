import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import JobListingPage from "./pages/JobListing";
import JobDetailsPage from "./pages/JobDetailPage";
import Layout from "./layout/Layout";
import BookmarkedJobsPage from "./pages/BookmarkedJobs";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="allJobs" element={<JobListingPage />} />
            <Route path="job/:id" element={<JobDetailsPage />} />
            <Route path="bookmarkedJobs" element={<BookmarkedJobsPage/>}/>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
