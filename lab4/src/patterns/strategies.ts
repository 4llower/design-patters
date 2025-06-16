import { Task, SortStrategy } from '../types';

export class AlphabeticalSortStrategy implements SortStrategy {
    sort(tasks: Task[]): Task[] {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    }
}

export class CreationTimeSortStrategy implements SortStrategy {
    sort(tasks: Task[]): Task[] {
        return [...tasks].sort((a, b) => {
            const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
            const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
            
            return dateB.getTime() - dateA.getTime();
        });
    }
}