export interface Observer {
  update(shape: Shape): void;
}

export interface Observable {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

export abstract class Shape implements Observable {
  public readonly id: string;
  private observers: Observer[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  public notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public abstract toString(): string;
} 