export enum TaskStatus {
    New = 'New',
    Assigned = 'Assigned',
    InProgress = 'In Progress',
    Done = 'Done'
}

export interface TaskObserver {
    update(task: TaskComponent): void;
}

export interface TaskComponent {
    id: string;
    title: string;
    status: TaskStatus;
    assignee?: string;

    addObserver(observer: TaskObserver): void;
    removeObserver(observer: TaskObserver): void;
    notifyObservers(): void;
    
    setStatus(status: TaskStatus): void;
    setAssignee(assignee: string): void;
    getSummary(): string;
} 