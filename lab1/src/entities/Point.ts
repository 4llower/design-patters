export class Point {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(id: string, x: number, y: number, z: number = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public toString(): string {
    return `Point(${this.x}, ${this.y}, ${this.z})`;
  }
} 