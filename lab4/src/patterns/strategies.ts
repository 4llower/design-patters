import { Task, SortStrategy } from '../types';

export class AlphabeticalSortStrategy implements SortStrategy {
    sort(tasks: Task[]): Task[] {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    }
}

export class CreationTimeSortStrategy implements SortStrategy {
    sort(tasks: Task[]): Task[] {
        return [...tasks].sort((a, b) => {
            // Ensure we're working with Date objects
            const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
            const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
            
            // Sort in descending order (newest first)
            return dateB.getTime() - dateA.getTime();
        });
    }
} 