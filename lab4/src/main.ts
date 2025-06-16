import { TaskBoard } from './components/TaskBoard';
import { TaskManager } from './managers/TaskManager';
import { ThemeManager } from './managers/ThemeManager';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const taskBoard = new TaskBoard();
    const taskManager = TaskManager.getInstance();
    const _themeManager = ThemeManager.getInstance();

    // Attach the TaskBoard as an observer
    taskManager.attach(taskBoard);

    // Initial render
    taskBoard.update();
}); 