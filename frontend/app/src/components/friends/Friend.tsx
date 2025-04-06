import styled from 'styled-components'
import { FriendType } from '../../types/types'

interface FriendProps {
  friend: FriendType;
}

const Friend = ({ friend }: FriendProps) => {
  return (
    <Card>
      <Header>
        <Name>{friend.firstname} {friend.lastname}</Name>
        <Gender>{friend.gender}</Gender>
      </Header>
      <Details>
        <p><strong>Age:</strong> {friend.age}</p>
        <p><strong>Email:</strong> {friend.email}</p>
      </Details>
    </Card>
  )
}

export default Friend

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const Gender = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: #444;

  p {
    margin: 5px 0;
  }

  strong {
    color: #333;
  }
`;
