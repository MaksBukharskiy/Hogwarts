import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import appStore from '../stores/AppStore';

const PageContainer = styled.div`
  margin-left: 280px;
  padding: 20px;
  min-height: 100vh;
  background: #ffffff;
  width: calc(100vw - 280px);
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: none;
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #e9ecef;
    box-shadow: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #e9ecef;
    box-shadow: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px 24px;
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

const CharacterCounter = styled.div`
  background: #f5f5f5;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;
  margin-left: auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const StudentsSection = styled.div`
  margin-top: 30px;
`;

const StudentsContainer = styled.div`
  border: 2px dashed #80CBC4;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4DB6AC;
    background: #f8f9fa;
  }
`;

const AddIcon = styled.div`
  font-size: 2rem;
  color: #80CBC4;
  margin-bottom: 10px;
`;

const AddText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #80CBC4;
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

const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const StudentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const StudentCheckbox = styled.input`
  margin-right: 12px;
  width: 16px;
  height: 16px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
`;

const StudentDetails = styled.div`
  font-size: 12px;
  color: #666;
`;

const SelectedStudentsCount = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const ModalTableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e9ecef;
  background: #f5f5f5;
`;

const ModalTableRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ModalTableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  color: #333;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
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

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
`;

const CreateGroupPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('Пуффендуй');
  const [groupDescription, setGroupDescription] = useState('Среди наших учеников царит дух трудолюбия и честности. Мы приветствуем самых терпеливых и верных к своей работе');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreatedStudentsCount, setLastCreatedStudentsCount] = useState(0);

  // Получаем всех учеников из store
  const allStudents = appStore.getAllStudents();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      alert('Пожалуйста, введите название группы');
      return;
    }

    // Получаем выбранных учеников
    const selectedStudentsData = allStudents.filter(student => 
      selectedStudents.includes(student.id)
    );

    const newGroup = {
      name: groupName.trim(),
      description: groupDescription.trim(),
      students: selectedStudentsData
    };

    appStore.addGroup(newGroup);
    
    // Сохраняем количество учеников перед очисткой
    setLastCreatedStudentsCount(selectedStudents.length);
    setShowSuccess(true);
    setSelectedStudents([]);
    
    // Автоматически скрываем сообщение об успехе через 3 секунды
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleAddStudents = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmStudents = () => {
    setShowModal(false);
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  return (
    <PageContainer>
      <PageTitle>Новая группа</PageTitle>
      
      {showSuccess && (
        <SuccessMessage>
          Группа "{groupName}" успешно создана! Добавлено учеников: {lastCreatedStudentsCount}
        </SuccessMessage>
      )}
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="groupName">Название</Label>
            <InputContainer>
              <Input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Название"
                maxLength={15}
                required
              />
              <CharacterCounter>{groupName.length}</CharacterCounter>
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="groupDescription">Описание группы</Label>
            <TextAreaContainer>
              <TextArea
                id="groupDescription"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Описание группы"
                maxLength={200}
              />
              <CharacterCounter>{groupDescription.split(' ').length}</CharacterCounter>
            </TextAreaContainer>
          </FormGroup>

          <StudentsSection>
            <Label>Ученики</Label>
            {selectedStudents.length === 0 ? (
              <StudentsContainer onClick={handleAddStudents}>
                <AddIcon>➕</AddIcon>
                <AddText>Добавить учеников</AddText>
              </StudentsContainer>
            ) : (
              <>
                <StudentList>
                  {allStudents.filter(student => selectedStudents.includes(student.id)).map(student => (
                    <StudentItem key={student.id}>
                      <StudentInfo>
                        <StudentName>{student.name}</StudentName>
                        <StudentDetails>
                          {student.class} | {student.points} баллов
                        </StudentDetails>
                      </StudentInfo>
                    </StudentItem>
                  ))}
                </StudentList>
                <SelectedStudentsCount>
                  Выбрано учеников: {selectedStudents.length}
                </SelectedStudentsCount>
                <AddStudentButton type="button" onClick={handleAddStudents}>
                  Изменить выбор
                </AddStudentButton>
              </>
            )}
          </StudentsSection>

          <ButtonGroup>
            <Button type="submit" variant="primary">
              Создать группу
            </Button>
            <Button type="button" onClick={handleCancel}>
              Отменить
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>

      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Добавить ученика</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            
            <ModalTable>
              <thead>
                <tr>
                  <ModalTableHeader>ФИО</ModalTableHeader>
                  <ModalTableHeader>Класс</ModalTableHeader>
                  <ModalTableHeader>Баллы</ModalTableHeader>
                </tr>
              </thead>
              <tbody>
                {allStudents.map(student => (
                  <ModalTableRow key={student.id}>
                    <ModalTableCell>
                      <StudentCheckbox
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelect(student.id)}
                      />
                      {student.name}
                    </ModalTableCell>
                    <ModalTableCell>{student.class}</ModalTableCell>
                    <ModalTableCell>{student.points}</ModalTableCell>
                  </ModalTableRow>
                ))}
              </tbody>
            </ModalTable>

            <ModalButtonGroup>
              <ModalButton type="button" onClick={handleCloseModal}>
                Отменить
              </ModalButton>
              <ModalButton type="button" variant="primary" onClick={handleConfirmStudents}>
                Добавить
              </ModalButton>
            </ModalButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
});

export default CreateGroupPage;