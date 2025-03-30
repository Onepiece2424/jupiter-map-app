import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUserState } from '../../atoms/user';
import { useRecoilState } from 'recoil';

// ログイン不要なページのリスト
export const publicPaths = ["/sign_up", "/login"];

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser,] = useRecoilState(loginUserState);

  useEffect(() => {
    if (!loginUser.signed_in && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, loginUser.signed_in, location.pathname]);

};

export default useAuthRedirect;
