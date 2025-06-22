import { TaskBoard } from './components/TaskBoard';
import { TaskManager } from './managers/TaskManager';
import { ThemeManager } from './managers/ThemeManager';

document.addEventListener('DOMContentLoaded', () => {
    const taskBoard = new TaskBoard();
    const taskManager = TaskManager.getInstance();

    taskManager.attach(taskBoard);

    taskBoard.update();
}); 