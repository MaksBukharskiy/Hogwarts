import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
    background-color: #f0f0f0;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 15px;
  font-weight: 600;
  color: #333;
`;

const StudentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 25px;
`;

const StudentItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#E0F7FA' : 'transparent'};

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Checkbox = styled.input`
  margin-right: 15px;
  transform: scale(1.2);
  accent-color: #80CBC4;
`;

const StudentInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StudentName = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const StudentClass = styled.div`
  color: #666;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' ? `
    background: #80CBC4;
    color: white;
    
    &:hover {
      background: #4DB6AC;
    }
  ` : `
    background: white;
    color: #333;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #f8f9fa;
      border-color: #80CBC4;
    }
  `}
`;

interface Student {
  id: string;
  name: string;
  points: number;
  class: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
  existingStudentIds: string[];
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  existingStudentIds
}) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // Демо-данные доступных студентов как в дизайне
  const availableStudents: Student[] = [
    { id: '6', name: 'Харитонов Андрей Романович', points: 215, class: '10.2' },
    { id: '7', name: 'Бондаренко Алексей Игоревич', points: 200, class: '10.2' },
    { id: '8', name: 'Пашкина Лариса Николаевна', points: 190, class: '10.2' },
    { id: '9', name: 'Алексеева Кристина Аркадьевна', points: 180, class: '10.2' },
    { id: '10', name: 'Елизаров Даниил Александрович', points: 170, class: '10.2' }
  ];

  const filteredStudents = availableStudents.filter(student => {
    const notAlreadyAdded = !existingStudentIds.includes(student.id);
    return notAlreadyAdded;
  });

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAddSelected = () => {
    const studentsToAdd = filteredStudents.filter(student => 
      selectedStudents.includes(student.id)
    );
    
    studentsToAdd.forEach(student => onAddStudent(student));
    setSelectedStudents([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedStudents([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Добавить ученика</ModalTitle>
          <CloseButton onClick={handleCancel}>×</CloseButton>
        </ModalHeader>

        <TableHeader>
          <div>ФИО</div>
          <div>Класс</div>
        </TableHeader>

        <StudentList>
          {filteredStudents.map(student => (
            <StudentItem key={student.id} selected={selectedStudents.includes(student.id)}>
              <Checkbox
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={() => handleStudentSelect(student.id)}
              />
              <StudentInfo>
                <StudentName>{student.name}</StudentName>
                <StudentClass>{student.class}</StudentClass>
              </StudentInfo>
            </StudentItem>
          ))}
          {filteredStudents.length === 0 && (
            <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              Все доступные ученики уже добавлены в группу
            </div>
          )}
        </StudentList>

        <ButtonGroup>
          <Button onClick={handleCancel}>
            Отменить
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddSelected}
            disabled={selectedStudents.length === 0}
          >
            Добавить
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddStudentModal;
