import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
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
  max-width: 700px;
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
  padding: 16px 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;
  min-height: 24px;

  &:focus {
    outline: none;
    border-color: #e9ecef;
    box-shadow: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 24px;

  &:focus {
    outline: none;
    border-color: #e9ecef;
    box-shadow: none;
  }
`;

const GenderGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const GenderButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 16px 20px;
  border: 1px solid ${props => props.selected ? '#80CBC4' : '#e9ecef'};
  border-radius: 8px;
  background: ${props => props.selected ? '#E0F7FA' : 'white'};
  color: ${props => props.selected ? '#333' : '#666'};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 24px;

  &:hover {
    border-color: #80CBC4;
    background: #E0F7FA;
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

const DateInputWrapper = styled.div`
  position: relative;
  
  input[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
`;

const AddStudentPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId?: string }>();
  
  const [studentName, setStudentName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [studentClass, setStudentClass] = useState('');
  const [points, setPoints] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedStudentName, setLastAddedStudentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName.trim()) {
      alert('Пожалуйста, введите ФИО ученика');
      return;
    }

    if (!birthDate) {
      alert('Пожалуйста, выберите дату рождения');
      return;
    }

    if (!studentClass.trim()) {
      alert('Пожалуйста, выберите класс обучения');
      return;
    }

    const newStudent = {
      name: studentName.trim(),
      birthDate: birthDate,
      gender: gender,
      class: studentClass.trim(),
      points: points,
      groupId: groupId
    };

    appStore.addStudent(newStudent);
    
    // Сохраняем имя ученика перед очисткой
    setLastAddedStudentName(studentName.trim());
    setShowSuccess(true);
    
    // Очищаем форму
    setStudentName('');
    setBirthDate('');
    setGender('male');
    setStudentClass('');
    setPoints(0);
    
    // Автоматически скрываем сообщение через 3 секунды
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    if (groupId) {
      navigate(`/group/${groupId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <PageTitle>Новый ученик</PageTitle>
      
      {showSuccess && (
        <SuccessMessage>
          Ученик "{lastAddedStudentName}" успешно добавлен!
        </SuccessMessage>
      )}
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="studentName">ФИО*</Label>
            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="ФИО*"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="birthDate">Дата рождения*</Label>
            <DateInputWrapper>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </DateInputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Пол*</Label>
            <GenderGroup>
              <GenderButton
                type="button"
                selected={gender === 'male'}
                onClick={() => setGender('male')}
              >
                Мужской
              </GenderButton>
              <GenderButton
                type="button"
                selected={gender === 'female'}
                onClick={() => setGender('female')}
              >
                Женский
              </GenderButton>
            </GenderGroup>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="studentClass">Класс обучения*</Label>
            <Select
              id="studentClass"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
            >
              <option value="">Класс</option>
              <option value="6.1">6.1</option>
              <option value="6.2">6.2</option>
              <option value="7.1">7.1</option>
              <option value="7.2">7.2</option>
              <option value="8.1">8.1</option>
              <option value="8.2">8.2</option>
              <option value="9.1">9.1</option>
              <option value="9.2">9.2</option>
              <option value="10.1">10.1</option>
              <option value="10.2">10.2</option>
              <option value="11.1">11.1</option>
              <option value="11.2">11.2</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" variant="primary">
              Добавить ученика
            </Button>
            <Button type="button" onClick={handleCancel}>
              Отменить
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </PageContainer>
  );
});

export default AddStudentPage;
