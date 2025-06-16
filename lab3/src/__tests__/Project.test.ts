import { Project } from '../Project';
import { Task } from '../Task';
import { TaskStatus } from '../types';

describe('Project', () => {
    let project: Project;
    let task1: Task;
    let task2: Task;

    beforeEach(() => {
        project = new Project('P1', 'Test Project');
        task1 = new Task('T1', 'Task 1');
        task2 = new Task('T2', 'Task 2');
    });

    test('should create a project with default status New', () => {
        expect(project.status).toBe(TaskStatus.New);
    });

    test('should add and remove tasks', () => {
        project.addTask(task1);
        expect(project.getSummary()).toContain('Total Tasks: 1');

        project.addTask(task2);
        expect(project.getSummary()).toContain('Total Tasks: 2');

        project.removeTask(task1);
        expect(project.getSummary()).toContain('Total Tasks: 1');
    });

    test('should update project status and all tasks when marked as Done', () => {
        project.addTask(task1);
        project.addTask(task2);

        project.setStatus(TaskStatus.Done);
        
        expect(project.status).toBe(TaskStatus.Done);
        expect(task1.status).toBe(TaskStatus.Done);
        expect(task2.status).toBe(TaskStatus.Done);
    });

    test('should calculate correct progress percentage', () => {
        project.addTask(task1);
        project.addTask(task2);

        // Initially 0% done
        expect(project.getSummary()).toContain('Progress: 0%');

        // One task done = 50%
        task1.setStatus(TaskStatus.Done);
        expect(project.getSummary()).toContain('Progress: 50%');

        // Both tasks done = 100%
        task2.setStatus(TaskStatus.Done);
        expect(project.getSummary()).toContain('Progress: 100%');
    });

    test('should generate correct summary with status breakdown', () => {
        project.addTask(task1);
        project.addTask(task2);

        task1.setStatus(TaskStatus.InProgress);
        task2.setStatus(TaskStatus.Done);

        const summary = project.getSummary();
        expect(summary).toContain('Project: Test Project');
        expect(summary).toContain('Total Tasks: 2');
        expect(summary).toContain('Progress: 50%');
        expect(summary).toContain('- New: 0');
        expect(summary).toContain('- In Progress: 1');
        expect(summary).toContain('- Done: 1');
    });
}); 