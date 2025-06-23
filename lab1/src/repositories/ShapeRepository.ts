import { Shape } from '../entities/Shape';

export interface Comparator<T> {
  compare(a: T, b: T): number;
}

export class ShapeRepository {
  private shapes: Map<string, Shape> = new Map();

  public add(shape: Shape): void {
    this.shapes.set(shape.id, shape);
  }

  public remove(id: string): void {
    this.shapes.delete(id);
  }

  public findById(id: string): Shape | undefined {
    return this.shapes.get(id);
  }

  public findByName(name: string): Shape[] {
    return Array.from(this.shapes.values()).filter(s => (s as any).name === name);
  }

  public findByCoordinates(predicate: (shape: Shape) => boolean): Shape[] {
    return Array.from(this.shapes.values()).filter(predicate);
  }

  public findByMetricsRange(metric: 'area' | 'volume' | 'perimeter', min: number, max: number, getMetrics: (id: string) => any): Shape[] {
    return Array.from(this.shapes.values()).filter(s => {
      const metrics = getMetrics(s.id);
      return metrics && metrics[metric] !== undefined && metrics[metric] >= min && metrics[metric] <= max;
    });
  }

  public findByDistanceFromOrigin(min: number, max: number, getDistance: (shape: Shape) => number): Shape[] {
    return Array.from(this.shapes.values()).filter(s => {
      const dist = getDistance(s);
      return dist >= min && dist <= max;
    });
  }

  public sort(comparator: Comparator<Shape>): Shape[] {
    return Array.from(this.shapes.values()).sort((a, b) => comparator.compare(a, b));
  }
}

// Сравнение по id
export class IdComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}

// Примеры спецификаций поиска:

// Поиск всех фигур, у которых первая точка (или центр) в первом квадранте
export function isInFirstQuadrant(shape: Shape): boolean {
  const x = (shape as any).pointA?.x ?? (shape as any).center?.x ?? 0;
  const y = (shape as any).pointA?.y ?? (shape as any).center?.y ?? 0;
  return x > 0 && y > 0;
}

// Поиск фигур по диапазону площади
export function areaInRange(min: number, max: number, getMetrics: (id: string) => any) {
  return (shape: Shape) => {
    const metrics = getMetrics(shape.id);
    return metrics && metrics.area !== undefined && metrics.area >= min && metrics.area <= max;
  };
}

// Поиск фигур по диапазону объема
export function volumeInRange(min: number, max: number, getMetrics: (id: string) => any) {
  return (shape: Shape) => {
    const metrics = getMetrics(shape.id);
    return metrics && metrics.volume !== undefined && metrics.volume >= min && metrics.volume <= max;
  };
}

// Поиск фигур по расстоянию от начала координат
export function distanceFromOriginInRange(min: number, max: number) {
  return (shape: Shape) => {
    const x = (shape as any).pointA?.x ?? (shape as any).center?.x ?? 0;
    const y = (shape as any).pointA?.y ?? (shape as any).center?.y ?? 0;
    const z = (shape as any).pointA?.z ?? (shape as any).center?.z ?? 0;
    const dist = Math.sqrt(x * x + y * y + z * z);
    return dist >= min && dist <= max;
  };
} 