import { TaskComponent, TaskObserver, TaskStatus } from './types';

export class Task implements TaskComponent {
    private observers: TaskObserver[] = [];
    
    constructor(
        public id: string,
        public title: string,
        public status: TaskStatus = TaskStatus.New,
        public assignee?: string
    ) {}

    addObserver(observer: TaskObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: TaskObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this));
    }

    setStatus(status: TaskStatus): void {
        this.status = status;
        this.notifyObservers();
    }

    setAssignee(assignee: string): void {
        this.assignee = assignee;
        this.setStatus(TaskStatus.Assigned);
    }

    getSummary(): string {
        return `Task: ${this.title} (${this.status})${this.assignee ? ` - Assigned to: ${this.assignee}` : ''}`;
    }
}