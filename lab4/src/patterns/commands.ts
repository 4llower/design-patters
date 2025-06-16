import { Command, Task, TaskStatus } from '../types';
import { TaskManager } from '../managers/TaskManager';

export class AddTaskCommand implements Command {
    private taskManager: TaskManager;
    private taskTitle: string;
    private addedTaskId?: string;

    constructor(taskTitle: string) {
        this.taskManager = TaskManager.getInstance();
        this.taskTitle = taskTitle;
    }

    execute(): void {
        this.taskManager.addTask(this.taskTitle);
        const tasks = this.taskManager.getTasks();
        this.addedTaskId = tasks[tasks.length - 1].id;
    }

    undo(): void {
        if (this.addedTaskId) {
            this.taskManager.deleteTask(this.addedTaskId);
        }
    }
}

export class MoveTaskCommand implements Command {
    private taskManager: TaskManager;
    private taskId: string;
    private oldStatus: TaskStatus;
    private newStatus: TaskStatus;

    constructor(taskId: string, newStatus: TaskStatus) {
        this.taskManager = TaskManager.getInstance();
        this.taskId = taskId;
        const task = this.taskManager.getTasks().find(t => t.id === taskId);
        this.oldStatus = task?.status || 'todo';
        this.newStatus = newStatus;
    }

    execute(): void {
        this.taskManager.moveTask(this.taskId, this.newStatus);
    }

    undo(): void {
        this.taskManager.moveTask(this.taskId, this.oldStatus);
    }
}

export class DeleteTaskCommand implements Command {
    private taskManager: TaskManager;
    private taskId: string;
    private deletedTask?: Task;

    constructor(taskId: string) {
        this.taskManager = TaskManager.getInstance();
        this.taskId = taskId;
    }

    execute(): void {
        const task = this.taskManager.getTasks().find(t => t.id === this.taskId);
        if (task) {
            this.deletedTask = { ...task };
            this.taskManager.deleteTask(this.taskId);
        }
    }

    undo(): void {
        if (this.deletedTask) {
            this.taskManager.addTask(this.deletedTask.title);
            const tasks = this.taskManager.getTasks();
            const newTask = tasks[tasks.length - 1];
            this.taskManager.moveTask(newTask.id, this.deletedTask.status);
        }
    }
} 