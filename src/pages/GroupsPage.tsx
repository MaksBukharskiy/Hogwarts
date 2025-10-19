import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import appStore from '../stores/AppStore';

const PageContainer = styled.div`
  margin-left: 280px;
  padding: 20px;
  min-height: 100vh;
  background: #ffffff;
  max-width: none;
  width: calc(100vw - 280px);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
`;

const GroupsSection = styled.div`
  margin-bottom: 50px;
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  max-width: 100%;
`;

const GroupCard = styled.div<{ isAddCard?: boolean }>`
  background: white;
  border-radius: 12px;
  box-shadow: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.isAddCard ? '2px dashed #80CBC4' : '1px solid #e9ecef'};
  display: flex;
  flex-direction: column;
  min-height: 220px;
  overflow: hidden;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const GroupHeader = styled.div<{ color: string }>`
  height: 80px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
`;

const GroupContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const GroupName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupStudents = styled.p`
  font-size: 0.9rem;
  color: #80CBC4;
`;

const AddGroupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #80CBC4;
  font-size: 3rem;
  flex: 1;
  padding: 20px;
`;

const AddGroupText = styled.p`
  font-size: 1rem;
  color: #80CBC4;
  margin-top: 15px;
  text-align: center;
`;

const RatingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: none;
  width: 100%;
`;

const RatingTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const RatingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e9ecef;
  background: white;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: white;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  color: #333;
`;

const PlaceCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  color: #FF9800;
  font-weight: 600;
`;

const PointsCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GroupsPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleGroupClick = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  const handleAddGroupClick = () => {
    navigate('/create-group');
  };

  // Данные рейтинга из стора (динамически)
  const groupRatingData = appStore.getGroupRating();

  const groupColors: Record<string, string> = {
    'Гриффиндор': '#FF6B35',
    'Слизерин': '#4ECDC4',
    'Когтевран': '#6A5ACD',
    'Пуффендуй': '#96CEB4'
  };

  const groupIcons: Record<string, string> = {
    'Гриффиндор': '🛡️',
    'Слизерин': '📱',
    'Когтевран': '📄',
    'Пуффендуй': '🦡'
  };

  const groupStudentsCount = {
    'Гриффиндор': 200,
    'Слизерин': 180,
    'Когтевран': 120,
    'Пуффендуй': 0
  };

  return (
    <PageContainer>
      <GroupsSection>
        <PageTitle>Группы</PageTitle>
        
        <GroupsGrid>
          {appStore.groups.map(group => (
            <GroupCard key={group.id} onClick={() => handleGroupClick(group.id)}>
              <GroupHeader color={groupColors[group.name] || '#80CBC4'}>
                {groupIcons[group.name] || '🏫'}
              </GroupHeader>
              <GroupContent>
                <GroupName>
                  <span>⬜</span>
                  {group.name}
                </GroupName>
                <GroupStudents>{group.students.length} учеников</GroupStudents>
              </GroupContent>
            </GroupCard>
          ))}

          <GroupCard isAddCard onClick={handleAddGroupClick}>
            <AddGroupCard>
              ➕
              <AddGroupText>Добавить группу</AddGroupText>
            </AddGroupCard>
          </GroupCard>
        </GroupsGrid>
      </GroupsSection>

      <RatingSection>
        <RatingTitle>Рейтинг групп</RatingTitle>
        <RatingTable>
          <thead>
            <tr>
              <TableHeader>Место</TableHeader>
              <TableHeader>Название группы</TableHeader>
              <TableHeader>Количество баллов</TableHeader>
            </tr>
          </thead>
          <tbody>
            {groupRatingData.map((item) => (
              <TableRow key={item.place}>
                <PlaceCell>{item.place}</PlaceCell>
                <TableCell>{item.groupName}</TableCell>
                <PointsCell>
                  {item.points}
                </PointsCell>
              </TableRow>
            ))}
          </tbody>
        </RatingTable>
      </RatingSection>
    </PageContainer>
  );
});

export default GroupsPage;