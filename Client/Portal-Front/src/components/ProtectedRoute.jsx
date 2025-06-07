import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function ProtectedRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  return auth.token ? children : <Navigate to="/login" />;
}
