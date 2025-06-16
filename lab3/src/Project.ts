import { TaskComponent, TaskStatus } from './types';
import { Task } from './Task';

export class Project extends Task {
    private tasks: TaskComponent[] = [];

    constructor(id: string, title: string) {
        super(id, title);
    }

    addTask(task: TaskComponent): void {
        this.tasks.push(task);
    }

    removeTask(task: TaskComponent): void {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    setStatus(status: TaskStatus): void {
        super.setStatus(status);
        if (status === TaskStatus.Done) {
            this.tasks.forEach(task => task.setStatus(TaskStatus.Done));
        }
    }

    getSummary(): string {
        const statusCounts = {
            [TaskStatus.New]: 0,
            [TaskStatus.Assigned]: 0,
            [TaskStatus.InProgress]: 0,
            [TaskStatus.Done]: 0
        };

        this.tasks.forEach(task => {
            statusCounts[task.status]++;
        });

        const totalTasks = this.tasks.length;
        const progress = totalTasks > 0 
            ? Math.round((statusCounts[TaskStatus.Done] / totalTasks) * 100)
            : 0;

        return `
Project: ${this.title}
Total Tasks: ${totalTasks}
Progress: ${progress}%
Status Breakdown:
- New: ${statusCounts[TaskStatus.New]}
- Assigned: ${statusCounts[TaskStatus.Assigned]}
- In Progress: ${statusCounts[TaskStatus.InProgress]}
- Done: ${statusCounts[TaskStatus.Done]}
`;
    }
} 