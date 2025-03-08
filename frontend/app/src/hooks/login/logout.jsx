import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/login");
    }
  }, []);

};

export default useAuthRedirect;
