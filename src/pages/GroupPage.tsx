import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddStudentModal from '../components/AddStudentModal';
import appStore from '../stores/AppStore';

const PageContainer = styled.div`
  margin-left: 280px;
  padding: 20px;
  min-height: 100vh;
  background: #ffffff;
  width: calc(100vw - 280px);
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const GroupIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #80CBC4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  margin-right: 15px;
`;

const GroupName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    color: #333;
    background-color: #f0f0f0;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TasksSection = styled.div`
  margin-bottom: 40px;
`;

const TasksCarousel = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TasksContainer = styled.div<{ translateX: number }>`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.translateX}px);
  animation: autoScroll 20s linear infinite;
  
  @keyframes autoScroll {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-${props => props.translateX || 0}px);
    }
  }
`;

const TaskCard = styled.div<{ completed: boolean }>`
  background: ${props => props.completed ? '#E0F7FA' : '#E0F7FA'};
  border-radius: 12px;
  padding: 20px;
  min-width: 300px;
  flex-shrink: 0;
  border: 1px solid #B2EBF2;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.completed ? '#4CAF50' : '#80CBC4'};
  }
`;


const TaskTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const TaskDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TaskLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TaskStatus = styled.button<{ completed: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.completed ? '#4CAF50' : '#80CBC4'};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const RatingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: none;
`;

const RatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #80CBC4;
  }
`;

const AddStudentButton = styled.button`
  background: #80CBC4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4DB6AC;
  }
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

const PlaceCell = styled.td<{ place: number }>`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  color: ${props => props.place <= 3 ? '#FF9800' : '#333'};
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

const LightningIcon = styled.span`
  color: #4CAF50;
  font-size: 16px;
`;

const GroupPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const group = appStore.groups.find(g => g.id === id);
  const groupTasks = group ? appStore.getGroupTasks(group.id) : [];
  const studentRating = group ? appStore.getStudentRating(group.id) : [];

  // Добавляем тестовые задания для демонстрации
  const mockTasks = [
    {
      id: '1',
      title: 'Организация школьного спектакля',
      startDate: '2024-04-12',
      endDate: '2024-04-26',
      level: 'Школьный уровень',
      completed: false
    },
    {
      id: '2',
      title: 'Принять участие в викторине',
      startDate: '2024-04-10',
      endDate: '2024-04-17',
      level: 'Муниципальный уровень',
      completed: false
    },
    {
      id: '3',
      title: 'Поучаствовать во ВКОШП',
      startDate: '2024-04-10',
      endDate: '2024-04-17',
      level: 'Всероссийский уровень',
      completed: true
    }
  ];

  const handleAddStudent = (student: any) => {
    if (group) {
      appStore.addStudent({
        ...student,
        groupId: group.id
      });
      setShowAddStudent(false);
    }
  };

  const existingStudentIds = group ? group.students.map(s => s.id) : [];

  if (!group) {
    return (
      <PageContainer>
        <div>Группа не найдена</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <GroupHeader>
        <GroupIcon>🦁</GroupIcon>
        <GroupName>
          {group.name}
          <EditButton>✏️</EditButton>
        </GroupName>
      </GroupHeader>

      <Description>{group.description}</Description>

      <TasksSection>
        <SectionTitle>
          Задания группы
          <EditButton>✏️</EditButton>
        </SectionTitle>
        <TasksCarousel>
          <TasksContainer translateX={mockTasks.length * 320}>
            {mockTasks.map(task => (
              <TaskCard key={task.id} completed={task.completed}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskInfo>
                  <TaskDate>
                    📅 {task.startDate} - {task.endDate}
                  </TaskDate>
                  <TaskLevel>
                    ⭐ {task.level}
                  </TaskLevel>
                </TaskInfo>
                <TaskStatus completed={task.completed}>
                  {task.completed ? 'Выполнено' : 'Не выполнено'}
                </TaskStatus>
              </TaskCard>
            ))}
            {/* Дублируем карточки для бесшовной прокрутки */}
            {mockTasks.map(task => (
              <TaskCard key={`duplicate-${task.id}`} completed={task.completed}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskInfo>
                  <TaskDate>
                    📅 {task.startDate} - {task.endDate}
                  </TaskDate>
                  <TaskLevel>
                    ⭐ {task.level}
                  </TaskLevel>
                </TaskInfo>
                <TaskStatus completed={task.completed}>
                  {task.completed ? 'Выполнено' : 'Не выполнено'}
                </TaskStatus>
              </TaskCard>
            ))}
          </TasksContainer>
        </TasksCarousel>
      </TasksSection>

      <RatingSection>
        <RatingHeader>
          <SectionTitle>Рейтинг</SectionTitle>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Найти по ФИО..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddStudentButton onClick={() => setShowAddStudent(true)}>
              Добавить ученика
            </AddStudentButton>
          </SearchContainer>
        </RatingHeader>
        
        <RatingTable>
          <thead>
            <tr>
              <TableHeader>Место</TableHeader>
              <TableHeader>ФИО</TableHeader>
              <TableHeader>Класс</TableHeader>
              <TableHeader>Количество баллов</TableHeader>
            </tr>
          </thead>
          <tbody>
            {studentRating
              .filter(student => 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
              <TableRow key={index}>
                <PlaceCell place={item.place}>{item.place}</PlaceCell>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>10.2</TableCell>
                <PointsCell>
                  {item.points}
                  <LightningIcon>⚡</LightningIcon>
                </PointsCell>
              </TableRow>
            ))}
          </tbody>
        </RatingTable>
      </RatingSection>

      <AddStudentModal
        isOpen={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        onAddStudent={handleAddStudent}
        existingStudentIds={existingStudentIds}
      />
    </PageContainer>
  );
});

export default GroupPage;
