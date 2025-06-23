import { Observer } from '../entities/Shape';
import { Shape } from '../entities/Shape';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { TriangleCalculator } from './TriangleCalculator';
import { SphereCalculator } from './SphereCalculator';

interface ShapeMetrics {
  area?: number;
  perimeter?: number;
  volume?: number;
}

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private metrics: Map<string, ShapeMetrics> = new Map();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public update(shape: Shape): void {
    this.recalculate(shape);
  }

  public recalculate(shape: Shape): void {
    if (shape instanceof Triangle) {
      const area = TriangleCalculator.calculateArea(shape);
      const perimeter = TriangleCalculator.calculatePerimeter(shape);
      this.metrics.set(shape.id, { area, perimeter });
    } else if (shape instanceof Sphere) {
      const area = SphereCalculator.calculateSurfaceArea(shape);
      const volume = SphereCalculator.calculateVolume(shape);
      this.metrics.set(shape.id, { area, volume });
    }
  }

  public getMetrics(id: string): ShapeMetrics | undefined {
    return this.metrics.get(id);
  }

  public setMetrics(id: string, metrics: ShapeMetrics): void {
    this.metrics.set(id, metrics);
  }

  public remove(id: string): void {
    this.metrics.delete(id);
  }
} 