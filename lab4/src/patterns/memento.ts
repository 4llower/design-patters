import { BoardState, Memento, Task } from '../types';

const STORAGE_KEY = 'task-board-state';
const MAX_HISTORY = 50; // Maximum number of states to keep in history

export class BoardMemento implements Memento {
    private state: BoardState;

    constructor(tasks: Task[]) {
        this.state = {
            tasks: tasks.map(task => ({ ...task }))
        };
    }

    getState(): BoardState {
        return {
            tasks: this.state.tasks.map(task => ({ ...task }))
        };
    }
}

export class BoardCaretaker {
    private mementos: BoardMemento[] = [];
    private currentIndex: number = -1;

    constructor() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                this.mementos = parsedState.mementos.map((memento: any) => {
                    const tasks = memento.state.tasks.map((task: any) => ({
                        ...task,
                        createdAt: new Date(task.createdAt)
                    }));
                    return new BoardMemento(tasks);
                });
                this.currentIndex = parsedState.currentIndex;
            }
        } catch (error) {
            console.error('Error loading state from localStorage:', error);
            this.mementos = [];
            this.currentIndex = -1;
        }
    }

    private saveToStorage(): void {
        try {
            const stateToSave = {
                mementos: this.mementos.map(memento => ({
                    state: memento.getState()
                })),
                currentIndex: this.currentIndex
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Error saving state to localStorage:', error);
        }
    }

    public getCurrentState(): BoardMemento | null {
        if (this.currentIndex >= 0 && this.currentIndex < this.mementos.length) {
            return this.mementos[this.currentIndex];
        }
        return null;
    }

    public save(memento: BoardMemento): void {
        // Remove any future states if we're not at the end
        this.mementos = this.mementos.slice(0, this.currentIndex + 1);
        
        // Add new state
        this.mementos.push(memento);
        this.currentIndex++;

        // Limit history size
        if (this.mementos.length > MAX_HISTORY) {
            this.mementos = this.mementos.slice(-MAX_HISTORY);
            this.currentIndex = this.mementos.length - 1;
        }

        this.saveToStorage();
    }

    public undo(): BoardMemento | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.saveToStorage();
            return this.mementos[this.currentIndex];
        }
        return null;
    }

    public redo(): BoardMemento | null {
        if (this.currentIndex < this.mementos.length - 1) {
            this.currentIndex++;
            this.saveToStorage();
            return this.mementos[this.currentIndex];
        }
        return null;
    }

    public clearHistory(): void {
        this.mementos = [];
        this.currentIndex = -1;
        localStorage.removeItem(STORAGE_KEY);
    }
} 