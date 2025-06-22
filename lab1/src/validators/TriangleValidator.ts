import { Triangle } from '../entities/Triangle';
import { Point } from '../entities/Point';
import { COORDINATE_REGEX } from '../constants/Constants';
import { InvalidTriangleException, ValidationException } from '../exceptions/GeometryException';
import { PointValidator } from './PointValidator';

export class TriangleValidator {
  public static validateTriangleData(data: string): boolean {
    const lines = data.trim().split('\n');
    
    if (lines.length < 3) {
      return false;
    }

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine === '') {
        continue;
      }
      
      const parts = trimmedLine.split(/\s+/);
      if (parts.length < 2 || parts.length > 3) {
        return false;
      }

      for (const part of parts) {
        if (!COORDINATE_REGEX.test(part)) {
          return false;
        }
      }
    }

    return true;
  }

  public static parseTriangleData(data: string, id: string): Triangle {
    if (!this.validateTriangleData(data)) {
      throw new ValidationException(`Invalid triangle data format: ${data}`);
    }

    const lines = data.trim().split('\n');
    const pointA = PointValidator.parsePointData(lines[0], `${id}_A`);
    const pointB = PointValidator.parsePointData(lines[1], `${id}_B`);
    const pointC = PointValidator.parsePointData(lines[2], `${id}_C`);

    return new Triangle(id, pointA, pointB, pointC);
  }

  public static validateTriangle(triangle: Triangle): void {
    const { pointA, pointB, pointC } = triangle;
    
    // Check if points are distinct
    if (this.arePointsEqual(pointA, pointB) || 
        this.arePointsEqual(pointB, pointC) || 
        this.arePointsEqual(pointA, pointC)) {
      throw new InvalidTriangleException('Triangle points must be distinct');
    }

    // Check if points form a valid triangle (not collinear)
    if (this.arePointsCollinear(pointA, pointB, pointC)) {
      throw new InvalidTriangleException('Triangle points must not be collinear');
    }
  }

  private static arePointsEqual(point1: Point, point2: Point): boolean {
    return point1.x === point2.x && point1.y === point2.y && point1.z === point2.z;
  }

  private static arePointsCollinear(pointA: Point, pointB: Point, pointC: Point): boolean {
    // Calculate area using cross product
    const area = Math.abs(
      (pointB.x - pointA.x) * (pointC.y - pointA.y) - 
      (pointC.x - pointA.x) * (pointB.y - pointA.y)
    ) / 2;
    
    return area === 0;
  }
} 