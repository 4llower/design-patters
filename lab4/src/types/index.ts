export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
}

export interface BoardState {
    tasks: Task[];
}

export interface Command {
    execute(): void;
    undo(): void;
}

export interface Observer {
    update(): void;
}

export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

export interface SortStrategy {
    sort(tasks: Task[]): Task[];
}

export interface Memento {
    getState(): BoardState;
} 