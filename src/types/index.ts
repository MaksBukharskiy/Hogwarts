export interface Student {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  class: string;
  points: number;
  groupId?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  students: Student[];
  totalPoints: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  groupId: string;
}

export interface GroupRating {
  place: number;
  groupName: string;
  points: number;
}

export interface StudentRating {
  place: number;
  studentName: string;
  points: number;
}
