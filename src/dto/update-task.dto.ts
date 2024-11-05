export class UpdateTaskDto {
  title?: string;
  description?: string;
  deadline?: Date;
  isCompleted?: boolean;
  assignedToId?: number;
}