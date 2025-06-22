import { Sphere } from '../entities/Sphere';
import { COORDINATE_PLANES, EPSILON } from '../constants/Constants';
import { SphereValidator } from '../validators/SphereValidator';

export class SphereCalculator {
  public static calculateSurfaceArea(sphere: Sphere): number {
    SphereValidator.validateSphere(sphere);
    
    return 4 * Math.PI * sphere.radius * sphere.radius;
  }

  public static calculateVolume(sphere: Sphere): number {
    SphereValidator.validateSphere(sphere);
    
    return (4 / 3) * Math.PI * sphere.radius * sphere.radius * sphere.radius;
  }

  public static calculateVolumeRatio(sphere: Sphere, plane: string): number {
    SphereValidator.validateSphere(sphere);
    
    const { center, radius } = sphere;
    let distance = 0;
    
    switch (plane) {
      case COORDINATE_PLANES.XY:
        distance = Math.abs(center.z);
        break;
      case COORDINATE_PLANES.XZ:
        distance = Math.abs(center.y);
        break;
      case COORDINATE_PLANES.YZ:
        distance = Math.abs(center.x);
        break;
      default:
        throw new Error(`Invalid coordinate plane: ${plane}`);
    }
    
    if (distance >= radius) {
      return 0; // Plane doesn't intersect sphere
    }
    
    // Calculate volume of spherical cap
    const height = radius - distance;
    const capVolume = (Math.PI * height * height * (3 * radius - height)) / 3;
    
    // Calculate total volume
    const totalVolume = this.calculateVolume(sphere);
    
    // Return ratio of smaller part to total volume
    const smallerVolume = Math.min(capVolume, totalVolume - capVolume);
    return smallerVolume / totalVolume;
  }

  public static isSphere(sphere: Sphere): boolean {
    try {
      SphereValidator.validateSphere(sphere);
      return true;
    } catch {
      return false;
    }
  }

  public static touchesCoordinatePlane(sphere: Sphere, plane: string): boolean {
    SphereValidator.validateSphere(sphere);
    
    const { center, radius } = sphere;
    let distance = 0;
    
    switch (plane) {
      case COORDINATE_PLANES.XY:
        distance = Math.abs(center.z);
        break;
      case COORDINATE_PLANES.XZ:
        distance = Math.abs(center.y);
        break;
      case COORDINATE_PLANES.YZ:
        distance = Math.abs(center.x);
        break;
      default:
        throw new Error(`Invalid coordinate plane: ${plane}`);
    }
    
    return Math.abs(distance - radius) < EPSILON;
  }

  public static touchesAnyCoordinatePlane(sphere: Sphere): boolean {
    SphereValidator.validateSphere(sphere);
    
    return this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XY) ||
           this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XZ) ||
           this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.YZ);
  }

  public static getIntersectionPlanes(sphere: Sphere): string[] {
    SphereValidator.validateSphere(sphere);
    
    const touchingPlanes: string[] = [];
    
    if (this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XY)) {
      touchingPlanes.push(COORDINATE_PLANES.XY);
    }
    
    if (this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XZ)) {
      touchingPlanes.push(COORDINATE_PLANES.XZ);
    }
    
    if (this.touchesCoordinatePlane(sphere, COORDINATE_PLANES.YZ)) {
      touchingPlanes.push(COORDINATE_PLANES.YZ);
    }
    
    return touchingPlanes;
  }
} 