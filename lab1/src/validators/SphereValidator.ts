import { Sphere } from '../entities/Sphere';
import { Point } from '../entities/Point';
import { COORDINATE_REGEX, DEFAULT_RADIUS } from '../constants/Constants';
import { InvalidSphereException, ValidationException } from '../exceptions/GeometryException';
import { PointValidator } from './PointValidator';

export class SphereValidator {
  public static validateSphereData(data: string): boolean {
    const parts = data.trim().split(/\s+/);
    
    if (parts.length < 3 || parts.length > 4) {
      return false;
    }

    for (const part of parts) {
      if (!COORDINATE_REGEX.test(part)) {
        return false;
      }
    }

    return true;
  }

  public static parseSphereData(data: string, id: string): Sphere {
    if (!this.validateSphereData(data)) {
      throw new ValidationException(`Invalid sphere data format: ${data}`);
    }

    const parts = data.trim().split(/\s+/);
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    const z = parts.length >= 3 ? parseFloat(parts[2]) : 0;
    const radius = parts.length === 4 ? parseFloat(parts[3]) : DEFAULT_RADIUS;

    const center = new Point(`${id}_center`, x, y, z);
    return new Sphere(id, center, radius);
  }

  public static validateSphere(sphere: Sphere): void {
    if (sphere.radius <= 0) {
      throw new InvalidSphereException('Sphere radius must be positive');
    }

    if (!Number.isFinite(sphere.radius)) {
      throw new InvalidSphereException('Sphere radius must be a finite number');
    }

    PointValidator.validateCoordinates(sphere.center.x, sphere.center.y, sphere.center.z);
  }
} 