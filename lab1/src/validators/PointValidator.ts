import { Point } from '../entities/Point';
import { COORDINATE_REGEX } from '../constants/Constants';
import { InvalidPointException, ValidationException } from '../exceptions/GeometryException';

export class PointValidator {
  public static validateCoordinates(x: number, y: number, z: number = 0): void {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      throw new InvalidPointException('Coordinates must be finite numbers');
    }
  }

  public static validatePointData(data: string): boolean {
    const parts = data.trim().split(/\s+/);
    
    if (parts.length < 2 || parts.length > 3) {
      return false;
    }

    for (const part of parts) {
      if (!COORDINATE_REGEX.test(part)) {
        return false;
      }
    }

    return true;
  }

  public static parsePointData(data: string, id: string): Point {
    if (!this.validatePointData(data)) {
      throw new ValidationException(`Invalid point data format: ${data}`);
    }

    const parts = data.trim().split(/\s+/);
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    const z = parts.length === 3 ? parseFloat(parts[2]) : 0;

    this.validateCoordinates(x, y, z);

    return new Point(id, x, y, z);
  }
} 