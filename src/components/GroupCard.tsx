import React from 'react';
import styled from 'styled-components';
import { Group } from '../types';

const CardContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(1.02);
  }
`;

const CardHeader = styled.div<{ houseColor: string }>`
  background: linear-gradient(135deg, ${props => props.houseColor} 0%, ${props => props.houseColor}dd 100%);
  padding: 25px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.9;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 1;
`;

const CardBody = styled.div`
  padding: 25px;
  position: relative;
  z-index: 1;
`;

const StudentCount = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;
  position: relative;
`;

const AddCardContainer = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
  border: 3px dashed rgba(255,255,255,0.8);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(255,255,255,1);
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%);
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const GroupName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
  position: relative;
`;

const GroupPoints = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 8px;
`;

const GroupDescription = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.4;
`;

const AddIcon = styled.div`
  font-size: 4rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 20px;
  transition: all 0.3s ease;
`;

const AddText = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

interface GroupCardProps {
  group?: Group;
  isAddCard?: boolean;
  onClick?: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, isAddCard, onClick }) => {
  if (isAddCard) {
    return (
      <AddCardContainer onClick={onClick}>
        <AddIcon>+</AddIcon>
        <AddText>Добавить группу</AddText>
      </AddCardContainer>
    );
  }

  if (!group) return null;

  const getHouseColor = (houseName: string) => {
    switch (houseName.toLowerCase()) {
      case 'гриффиндор':
        return '#d2691e';
      case 'слизерин':
        return '#20b2aa';
      case 'когтевран':
        return '#4169e1';
      case 'пуффендуй':
        return '#daa520';
      default:
        return '#6c757d';
    }
  };

  const getHouseIcon = (houseName: string) => {
    switch (houseName.toLowerCase()) {
      case 'гриффиндор':
        return '🛡️';
      case 'слизерин':
        return '📱';
      case 'когтевран':
        return '📄';
      case 'пуффендуй':
        return '🌻';
      default:
        return '🏠';
    }
  };

  return (
    <CardContainer onClick={onClick}>
      <CardHeader houseColor={getHouseColor(group.name)}>
        <div>
          <GroupName>{group.name}</GroupName>
          <StudentCount>{group.students.length} учеников</StudentCount>
        </div>
        <CardIcon>{getHouseIcon(group.name)}</CardIcon>
      </CardHeader>
      <CardBody>
        <GroupDescription>{group.description}</GroupDescription>
      </CardBody>
    </CardContainer>
  );
};

export default GroupCard;
