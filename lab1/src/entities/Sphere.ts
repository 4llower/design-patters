import { Shape } from './Shape';
import { Point } from './Point';

export class Sphere extends Shape {
  public readonly center: Point;
  public readonly radius: number;

  constructor(id: string, center: Point, radius: number) {
    super(id);
    this.center = center;
    this.radius = radius;
  }

  public toString(): string {
    return `Sphere(${this.id}): center=${this.center.toString()}, radius=${this.radius}`;
  }
} 