import { makeAutoObservable } from 'mobx';
import { Group, Student, Task } from '../types';

class AppStore {
  groups: Group[] = this.loadFromLocalStorage();

  private loadFromLocalStorage(): Group[] {
    try {
      const saved = localStorage.getItem('hogwarts-groups');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error);
    }
    
    // Возвращаем данные по умолчанию
    return [
      {
        id: '1',
        name: 'Гриффиндор',
        description: 'Среди наших учеников царит дух смелости и отваги. Мы приветствуем инициативу и поощряем самых ярких и активных.',
        students: [
          {
            id: '1',
            name: 'Гришенкин Александр Олегович',
            birthDate: '2005-03-15',
            gender: 'male',
            class: '11.2',
            points: 215,
            groupId: '1'
          },
          {
            id: '2',
            name: 'Харитонова Ксения Андреевна',
            birthDate: '2005-07-22',
            gender: 'female',
            class: '10.2',
            points: 200,
            groupId: '1'
          },
          {
            id: '3',
            name: 'Михальчук Олеся Алексеевна',
            birthDate: '2007-11-08',
            gender: 'female',
            class: '8.1',
            points: 190,
            groupId: '1'
          },
          {
            id: '4',
            name: 'Андреев Николай Александрович',
            birthDate: '2005-01-14',
            gender: 'male',
            class: '10.2',
            points: 160,
            groupId: '1'
          },
          {
            id: '5',
            name: 'Михальчук Игорь Алексеевич',
            birthDate: '2004-09-30',
            gender: 'male',
            class: '11.2',
            points: 130,
            groupId: '1'
          }
        ],
        totalPoints: 895
      },
      {
        id: '2',
        name: 'Слизерин',
        description: 'Дом амбициозности, хитрости и решимости. Студенты Слизерина ценят честолюбие и стремление к власти.',
        students: [
          {
            id: '6',
            name: 'Драко Малфой',
            birthDate: '2005-06-05',
            gender: 'male',
            class: '10.2',
            points: 180,
            groupId: '2'
          },
          {
            id: '7',
            name: 'Блейз Забини',
            birthDate: '2005-04-12',
            gender: 'male',
            class: '10.2',
            points: 160,
            groupId: '2'
          }
        ],
        totalPoints: 340
      },
      {
        id: '3',
        name: 'Когтевран',
        description: 'Дом мудрости, интеллекта и творчества. Студенты Когтеврана ценят знания и стремятся к учебе.',
        students: [
          {
            id: '8',
            name: 'Луна Лавгуд',
            birthDate: '2006-02-13',
            gender: 'female',
            class: '9.1',
            points: 170,
            groupId: '3'
          },
          {
            id: '9',
            name: 'Чо Чанг',
            birthDate: '2005-09-15',
            gender: 'female',
            class: '10.2',
            points: 160,
            groupId: '3'
          }
        ],
        totalPoints: 330
      },
      {
        id: '4',
        name: 'Пуффендуй',
        description: 'Среди наших учеников царит дух трудолюбия и честности. Мы приветствуем самых терпеливых и верных к своей работе.',
        students: [
          {
            id: '10',
            name: 'Седрик Диггори',
            birthDate: '2004-09-20',
            gender: 'male',
            class: '11.2',
            points: 190,
            groupId: '4'
          },
          {
            id: '11',
            name: 'Ньют Саламандер',
            birthDate: '2005-02-24',
            gender: 'male',
            class: '10.2',
            points: 180,
            groupId: '4'
          }
        ],
        totalPoints: 370
      }
    ];
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('hogwarts-groups', JSON.stringify(this.groups));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  }

  tasks: Task[] = [
    {
      id: '1',
      title: 'Изучение зельеварения',
      description: 'Освоить основы приготовления зелий',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      completed: true,
      groupId: '1'
    },
    {
      id: '2',
      title: 'Защита от темных искусств',
      description: 'Изучить защитные заклинания',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      completed: false,
      groupId: '1'
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addGroup(group: Omit<Group, 'id' | 'totalPoints'>) {
    const newGroup: Group = {
      ...group,
      id: Date.now().toString(),
      totalPoints: group.students.reduce((sum, student) => sum + student.points, 0)
    };
    this.groups.push(newGroup);
    this.saveToLocalStorage();
  }

  addStudent(student: Omit<Student, 'id'>) {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString()
    };
    
    if (student.groupId) {
      const group = this.groups.find(g => g.id === student.groupId);
      if (group) {
        group.students.push(newStudent);
        group.totalPoints += newStudent.points;
        this.saveToLocalStorage();
      }
    }
  }

  removeStudent(studentId: string) {
    this.groups.forEach(group => {
      const studentIndex = group.students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        const student = group.students[studentIndex];
        group.students.splice(studentIndex, 1);
        group.totalPoints -= student.points;
        this.saveToLocalStorage();
      }
    });
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    this.tasks.push(newTask);
  }

  getGroupRating(): Array<{ place: number; groupName: string; points: number }> {
    return this.groups
      .map(group => ({
        place: 0,
        groupName: group.name,
        points: group.totalPoints
      }))
      .sort((a, b) => b.points - a.points)
      .map((group, index) => ({
        ...group,
        place: index + 1
      }));
  }

  getStudentRating(groupId: string): Array<{ place: number; studentName: string; points: number }> {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return [];

    return group.students
      .map(student => ({
        place: 0,
        studentName: student.name,
        points: student.points
      }))
      .sort((a, b) => b.points - a.points)
      .map((student, index) => ({
        ...student,
        place: index + 1
      }));
  }

  getGroupTasks(groupId: string): Task[] {
    return this.tasks.filter(task => task.groupId === groupId);
  }

  getAllStudents(): Student[] {
    return this.groups.flatMap(group => group.students);
  }

  getStudentsWithoutGroup(): Student[] {
    return this.getAllStudents().filter(student => !student.groupId);
  }
}

const appStore = new AppStore();
export default appStore;
