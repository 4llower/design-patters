import { Task } from '../Task';
import { TaskStatus } from '../types';
import { Developer } from '../Developer';


describe('Task', () => {
    let task: Task;
    let developer: Developer;

    beforeEach(() => {
        task = new Task('T1', 'Test Task');
        developer = new Developer('John');
    });

    test('should create a task with default status New', () => {
        expect(task.status).toBe(TaskStatus.New);
    });

    test('should set task status', () => {
        task.setStatus(TaskStatus.InProgress);
        expect(task.status).toBe(TaskStatus.InProgress);
    });

    test('should set task assignee and status to Assigned', () => {
        task.setAssignee('John');
        expect(task.assignee).toBe('John');
        expect(task.status).toBe(TaskStatus.Assigned);
    });

    test('should notify observer when status changes', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        task.addObserver(developer);
        task.setAssignee('John');
        task.setStatus(TaskStatus.InProgress);

        console.log(consoleSpy.mock.calls[0]);
        
        expect(consoleSpy).toHaveBeenCalledWith(`[John] Task "Test Task" has been updated to In Progress`);
        
        consoleSpy.mockRestore();
    });

    test('should notify observer when assignee changes', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        task.addObserver(developer);
        task.setAssignee('John');
        
        expect(consoleSpy).toHaveBeenCalledWith(`[John] Task "Test Task" has been updated to Assigned`);
        
        consoleSpy.mockRestore();
    });

    test('should remove observer', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        task.addObserver(developer);
        task.removeObserver(developer);
        task.setStatus(TaskStatus.InProgress);
        
        expect(consoleSpy).not.toHaveBeenCalled();
        
        consoleSpy.mockRestore();
    });

    test('should generate correct summary', () => {
        task.setAssignee('John');
        task.setStatus(TaskStatus.InProgress);
        
        const expectedSummary = `Task: Test Task (In Progress) - Assigned to: John`;
        expect(task.getSummary()).toBe(expectedSummary);
    });
}); 