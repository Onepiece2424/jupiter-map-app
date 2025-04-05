import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";

const PrivateRoute = () => {
  const { isLoading } = useAuth();
  const isAuthenticated = useRecoilValue(authState);

  if (isLoading) {
    return null; // 認証状態が確定するまで何も表示しない（またはローディングUIを表示）
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
