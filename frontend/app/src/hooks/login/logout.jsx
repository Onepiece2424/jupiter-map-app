import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ログイン不要なページのリスト
export const publicPaths = ["/sign_up", "/login"];

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("access-token") && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

};

export default useAuthRedirect;
