import { Shape } from '../entities/Shape';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { Point } from '../entities/Point';
import { TriangleValidator } from '../validators/TriangleValidator';
import { SphereValidator } from '../validators/SphereValidator';
import { PointValidator } from '../validators/PointValidator';
import { ValidationException } from '../exceptions/GeometryException';

export abstract class ShapeFactory {
  public abstract createShape(data: string, id: string): Shape;
}

export class TriangleFactory extends ShapeFactory {
  public createShape(data: string, id: string): Triangle {
    try {
      const triangle = TriangleValidator.parseTriangleData(data, id);
      TriangleValidator.validateTriangle(triangle);
      return triangle;
    } catch (error) {
      throw new ValidationException(`Failed to create triangle: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export class SphereFactory extends ShapeFactory {
  public createShape(data: string, id: string): Sphere {
    try {
      const sphere = SphereValidator.parseSphereData(data, id);
      SphereValidator.validateSphere(sphere);
      return sphere;
    } catch (error) {
      throw new ValidationException(`Failed to create sphere: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export class PointFactory extends ShapeFactory {
  public createShape(data: string, id: string): Point {
    try {
      const point = PointValidator.parsePointData(data, id);
      return point;
    } catch (error) {
      throw new ValidationException(`Failed to create point: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 