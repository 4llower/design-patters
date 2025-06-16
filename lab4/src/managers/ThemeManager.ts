import { Subject, Observer } from '../types';

export class ThemeManager implements Subject {
    private static instance: ThemeManager;
    private observers: Observer[] = [];
    private isDarkMode: boolean = false;

    private constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.applyTheme();
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    public toggleTheme(): void {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode.toString());
        this.applyTheme();
        this.notify();
    }

    public isDark(): boolean {
        return this.isDarkMode;
    }

    private applyTheme(): void {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    // Observer pattern implementation
    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notify(): void {
        this.observers.forEach(observer => observer.update());
    }
} 