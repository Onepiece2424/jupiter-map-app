import { createContext, ReactNode, useEffect, useState } from "react";
import { loginUserState } from '../../atoms/user';
import { useRecoilState } from 'recoil';
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import { authState } from "../../atoms/auth";
import { AuthContextType } from "../../types/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setLoginUser] = useRecoilState(loginUserState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 初期状態はロード中

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/me`, { withCredentials: true });
        setLoginUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching User Data:", error);
      } finally {
        setIsLoading(false); // 認証状態の取得が完了
      }
    };

    fetchLoginUser();
  }, [setIsAuthenticated, setLoginUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
