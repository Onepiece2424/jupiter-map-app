import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Jupiter Map</h1>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #333;
  color: white;
`

export default Header;
