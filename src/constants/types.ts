export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
