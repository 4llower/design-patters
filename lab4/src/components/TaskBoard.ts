import { Observer, Task, TaskStatus } from '../types';
import { TaskManager } from '../managers/TaskManager';
import { ThemeManager } from '../managers/ThemeManager';
import { AddTaskCommand, MoveTaskCommand, DeleteTaskCommand } from '../patterns/commands';
import { AlphabeticalSortStrategy, CreationTimeSortStrategy } from '../patterns/strategies';
import { BoardMemento, BoardCaretaker } from '../patterns/memento';
import { SortStrategy } from '../types';

export class TaskBoard implements Observer {
    private taskManager: TaskManager;
    private themeManager: ThemeManager;
    private boardCaretaker: BoardCaretaker;
    private currentSortStrategy: SortStrategy = new CreationTimeSortStrategy();

    constructor() {
        this.taskManager = TaskManager.getInstance();
        this.themeManager = ThemeManager.getInstance();
        this.boardCaretaker = new BoardCaretaker();
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        const addTodoBtn = document.getElementById('addTodo');
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        const themeToggle = document.getElementById('themeToggle');
        const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;

        addTodoBtn?.addEventListener('click', () => {
            const title = prompt('Enter task title:');
            if (title) {
                const command = new AddTaskCommand(title);
                command.execute();
                this.showNotification('Task added successfully', 'success');
            }
        });

        undoBtn?.addEventListener('click', () => {
            this.taskManager.undo();
            this.showNotification('Undo completed', 'success');
        });

        redoBtn?.addEventListener('click', () => {
            this.taskManager.redo();
            this.showNotification('Redo completed', 'success');
        });

        themeToggle?.addEventListener('click', () => {
            this.themeManager.toggleTheme();
        });

        sortSelect?.addEventListener('change', () => {
            this.setSortStrategy(sortSelect.value);
            this.update();
        });

        this.initializeDragAndDrop();
    }

    private setSortStrategy(strategy: string): void {
        switch (strategy) {
            case 'alphabetical':
                this.currentSortStrategy = new AlphabeticalSortStrategy();
                break;
            case 'creationTime':
            default:
                this.currentSortStrategy = new CreationTimeSortStrategy();
                break;
        }
    }

    private initializeDragAndDrop(): void {
        const columns = document.querySelectorAll('[data-column]');
        
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggingElement = document.querySelector('.dragging');
                if (draggingElement) {
                    column.appendChild(draggingElement);
                }
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const taskId = (e as DragEvent).dataTransfer?.getData('text/plain');
                const newStatus = column.getAttribute('data-column') as TaskStatus;
                
                if (taskId && newStatus) {
                    const command = new MoveTaskCommand(taskId, newStatus);
                    command.execute();
                    this.showNotification('Task moved successfully', 'success');
                }
            });
        });
    }

    private createTaskElement(task: Task): HTMLElement {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        taskElement.draggable = true;
        taskElement.setAttribute('data-task-id', task.id);

        taskElement.innerHTML = `
            <div class="flex justify-between items-center">
                <h3 class="text-gray-800 dark:text-white">${task.title}</h3>
                <button class="delete-task text-red-500 hover:text-red-700">×</button>
            </div>
        `;

        taskElement.addEventListener('dragstart', (e) => {
            taskElement.classList.add('dragging');
            e.dataTransfer?.setData('text/plain', task.id);
        });

        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
        });

        const deleteBtn = taskElement.querySelector('.delete-task');
        deleteBtn?.addEventListener('click', () => {
            const command = new DeleteTaskCommand(task.id);
            command.execute();
            this.showNotification('Task deleted successfully', 'success');
        });

        return taskElement;
    }

    private showNotification(message: string, type: 'success' | 'error'): void {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }
    }

    public update(): void {
        const columns = {
            todo: document.getElementById('todo'),
            inProgress: document.getElementById('inProgress'),
            done: document.getElementById('done')
        };

        Object.values(columns).forEach(column => {
            if (column) column.innerHTML = '';
        });

        const sortedTasks = this.currentSortStrategy.sort(this.taskManager.getTasks());

        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            const column = columns[task.status];
            if (column) column.appendChild(taskElement);
        });
    }
} 