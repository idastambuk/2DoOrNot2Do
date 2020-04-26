export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  dueDate: number;
  created: number;
}
