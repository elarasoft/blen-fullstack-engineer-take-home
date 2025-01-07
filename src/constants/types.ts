export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
