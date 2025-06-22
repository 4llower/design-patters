import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {
  public readonly pointA: Point;
  public readonly pointB: Point;
  public readonly pointC: Point;

  constructor(id: string, pointA: Point, pointB: Point, pointC: Point) {
    super(id);
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
  }

  public toString(): string {
    return `Triangle(${this.id}): ${this.pointA.toString()}, ${this.pointB.toString()}, ${this.pointC.toString()}`;
  }
} 