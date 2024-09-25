import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; // assuming you're using react-router-dom v6

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
