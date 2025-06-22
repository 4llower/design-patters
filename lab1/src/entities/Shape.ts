export abstract class Shape {
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  public abstract toString(): string;
} 