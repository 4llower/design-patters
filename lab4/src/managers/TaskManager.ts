import { Task, TaskStatus, BoardState, Subject, Observer } from '../types';
import { BoardCaretaker, BoardMemento } from '../patterns/memento';

export class TaskManager implements Subject {
    private static instance: TaskManager;
    private tasks: Task[] = [];
    private observers: Observer[] = [];
    private boardCaretaker: BoardCaretaker;

    private constructor() {
        this.boardCaretaker = new BoardCaretaker();
        this.loadInitialState();
    }

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    private loadInitialState(): void {
        const memento = this.boardCaretaker.getCurrentState();
        if (memento) {
            this.tasks = memento.getState().tasks;
            this.notify();
        }
    }

    public addTask(title: string): void {
        const task: Task = {
            id: crypto.randomUUID(),
            title,
            status: 'todo',
            createdAt: new Date()
        };
        this.tasks.push(task);
        this.saveState();
        this.notify();
    }

    public moveTask(taskId: string, newStatus: TaskStatus): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveState();
            this.notify();
        }
    }

    public deleteTask(taskId: string): void {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveState();
        this.notify();
    }

    public getTasks(): Task[] {
        return [...this.tasks];
    }

    public getTasksByStatus(status: TaskStatus): Task[] {
        return this.tasks.filter(task => task.status === status);
    }

    public undo(): void {
        const memento = this.boardCaretaker.undo();
        if (memento) {
            this.tasks = memento.getState().tasks;
            this.notify();
        }
    }

    public redo(): void {
        const memento = this.boardCaretaker.redo();
        if (memento) {
            this.tasks = memento.getState().tasks;
            this.notify();
        }
    }

    private saveState(): void {
        this.boardCaretaker.save(new BoardMemento(this.tasks));
    }

    // Observer pattern implementation
    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notify(): void {
        this.observers.forEach(observer => observer.update());
    }
} 