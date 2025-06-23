import { Shape } from './Shape';

export class Point extends Shape {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(id: string, x: number, y: number, z: number = 0) {
    super(id);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public toString(): string {
    return `Point(${this.x}, ${this.y}, ${this.z})`;
  }
} 