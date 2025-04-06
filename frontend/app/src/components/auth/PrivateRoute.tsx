import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";
import Sidebar from "../sidebar/Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 1200px; /* コンテンツが広がりすぎないようにする */
  margin: 0 auto; /* 中央揃え */
  padding: 24px;
  overflow-y: auto;
`;

const StyledSidebar = styled(Sidebar)`
  width: 280px;
  flex-shrink: 0;
  background-color: #fff;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* 右側に影をつける */
  border-left: 1px solid #ddd;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;
`;


const PrivateRoute = () => {
  const { isLoading } = useAuth();
  const isAuthenticated = useRecoilValue(authState);

  if (isLoading) {
    return null; // 認証状態が確定するまで何も表示しない（またはローディングUIを表示）
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <StyledSidebar />
    </Container>
  );
};

export default PrivateRoute;
