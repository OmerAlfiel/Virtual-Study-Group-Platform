export class CreateTaskDto {
  title: string;
  description: string;
  deadline: Date;
  groupId: number;
  assignedToId: number;
}