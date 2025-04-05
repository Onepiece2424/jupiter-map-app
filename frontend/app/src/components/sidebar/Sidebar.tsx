import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 80px; /* 小さな画面ではコンパクトに */
    padding: 10px;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #34495e;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Bullet = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex; /* Linkをflexアイテムとして表示 */
  align-items: center;
  text-decoration: none; /* デフォルトの下線を削除 */
  color: inherit; /* 親の色を継承 */
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>Menu</SidebarTitle>
      <MenuList>
        <MenuItem>
          <StyledLink to="/">
            <Bullet />
            <Label>Home</Label>
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/profile">
            <Bullet />
            <Label>Profile</Label>
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/friends">
            <Bullet />
            <Label>Friends list</Label>
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/settings">
            <Bullet />
            <Label>Settings</Label>
          </StyledLink>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
