import { TaskComponent, TaskObserver } from './types';

export class Developer implements TaskObserver {
    constructor(private name: string) {}

    update(task: TaskComponent): void {
        if (task.assignee !== this.name) {
            return;
        }

        console.log(`[${this.name}] Task "${task.title}" has been updated to ${task.status}`);
    }
} 