import { SphereCalculator } from '../services/SphereCalculator';
import { Sphere } from '../entities/Sphere';
import { Point } from '../entities/Point';
import { InvalidSphereException } from '../exceptions/GeometryException';
import { COORDINATE_PLANES } from '../constants/Constants';

describe('SphereCalculator', () => {
  describe('calculateSurfaceArea', () => {
    it('should calculate surface area of a sphere correctly', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When
      const surfaceArea = SphereCalculator.calculateSurfaceArea(sphere);

      // Then
      expect(surfaceArea).toBeCloseTo(314.16, 2);
      expect(surfaceArea).toBeGreaterThan(0);
      expect(typeof surfaceArea).toBe('number');
    });

    it('should calculate surface area of a unit sphere correctly', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 1);

      // When
      const surfaceArea = SphereCalculator.calculateSurfaceArea(sphere);

      // Then
      expect(surfaceArea).toBeCloseTo(12.57, 2);
      expect(surfaceArea).toBeGreaterThan(0);
      expect(surfaceArea).toBeLessThan(13);
    });

    it('should throw exception for invalid sphere with negative radius', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, -1);

      // When & Then
      expect(() => SphereCalculator.calculateSurfaceArea(sphere)).toThrow(InvalidSphereException);
      expect(() => SphereCalculator.calculateSurfaceArea(sphere)).toThrow('Sphere radius must be positive');
    });
  });

  describe('calculateVolume', () => {
    it('should calculate volume of a sphere correctly', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When
      const volume = SphereCalculator.calculateVolume(sphere);

      // Then
      expect(volume).toBeCloseTo(523.60, 2);
      expect(volume).toBeGreaterThan(0);
      expect(typeof volume).toBe('number');
    });

    it('should calculate volume of a unit sphere correctly', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 1);

      // When
      const volume = SphereCalculator.calculateVolume(sphere);

      // Then
      expect(volume).toBeCloseTo(4.19, 2);
      expect(volume).toBeGreaterThan(0);
      expect(volume).toBeLessThan(5);
    });
  });

  describe('calculateVolumeRatio', () => {
    it('should calculate volume ratio for XY plane intersection', () => {
      // Given
      const center = new Point('center', 0, 0, 2);
      const sphere = new Sphere('test', center, 5);

      // When
      const ratio = SphereCalculator.calculateVolumeRatio(sphere, COORDINATE_PLANES.XY);

      // Then
      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThan(1);
      expect(typeof ratio).toBe('number');
    });

    it('should return 0 when plane does not intersect sphere', () => {
      // Given
      const center = new Point('center', 0, 0, 10);
      const sphere = new Sphere('test', center, 5);

      // When
      const ratio = SphereCalculator.calculateVolumeRatio(sphere, COORDINATE_PLANES.XY);

      // Then
      expect(ratio).toBe(0);
      expect(typeof ratio).toBe('number');
    });

    it('should throw error for invalid plane', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When & Then
      expect(() => SphereCalculator.calculateVolumeRatio(sphere, 'invalid')).toThrow('Invalid coordinate plane');
    });
  });

  describe('isSphere', () => {
    it('should return true for valid sphere', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When
      const isValid = SphereCalculator.isSphere(sphere);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for invalid sphere with negative radius', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, -1);

      // When
      const isValid = SphereCalculator.isSphere(sphere);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('touchesCoordinatePlane', () => {
    it('should return true when sphere touches XY plane', () => {
      // Given
      const center = new Point('center', 0, 0, 5);
      const sphere = new Sphere('test', center, 5);

      // When
      const touches = SphereCalculator.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XY);

      // Then
      expect(touches).toBe(true);
      expect(typeof touches).toBe('boolean');
    });

    it('should return false when sphere does not touch XY plane', () => {
      // Given
      const center = new Point('center', 0, 0, 10);
      const sphere = new Sphere('test', center, 5);

      // When
      const touches = SphereCalculator.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XY);

      // Then
      expect(touches).toBe(false);
      expect(typeof touches).toBe('boolean');
    });

    it('should return true when sphere touches XZ plane', () => {
      // Given
      const center = new Point('center', 0, 5, 0);
      const sphere = new Sphere('test', center, 5);

      // When
      const touches = SphereCalculator.touchesCoordinatePlane(sphere, COORDINATE_PLANES.XZ);

      // Then
      expect(touches).toBe(true);
      expect(typeof touches).toBe('boolean');
    });

    it('should return true when sphere touches YZ plane', () => {
      // Given
      const center = new Point('center', 5, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When
      const touches = SphereCalculator.touchesCoordinatePlane(sphere, COORDINATE_PLANES.YZ);

      // Then
      expect(touches).toBe(true);
      expect(typeof touches).toBe('boolean');
    });
  });

  describe('touchesAnyCoordinatePlane', () => {
    it('should return true when sphere touches any coordinate plane', () => {
      // Given
      const center = new Point('center', 0, 0, 5);
      const sphere = new Sphere('test', center, 5);

      // When
      const touchesAny = SphereCalculator.touchesAnyCoordinatePlane(sphere);

      // Then
      expect(touchesAny).toBe(true);
      expect(typeof touchesAny).toBe('boolean');
    });

    it('should return false when sphere does not touch any coordinate plane', () => {
      // Given
      const center = new Point('center', 10, 10, 10);
      const sphere = new Sphere('test', center, 5);

      // When
      const touchesAny = SphereCalculator.touchesAnyCoordinatePlane(sphere);

      // Then
      expect(touchesAny).toBe(false);
      expect(typeof touchesAny).toBe('boolean');
    });
  });

  describe('getIntersectionPlanes', () => {
    it('should return array of planes that sphere touches', () => {
      // Given
      const center = new Point('center', 0, 0, 5);
      const sphere = new Sphere('test', center, 5);

      // When
      const planes = SphereCalculator.getIntersectionPlanes(sphere);

      // Then
      expect(planes).toContain(COORDINATE_PLANES.XY);
      expect(Array.isArray(planes)).toBe(true);
      expect(planes.length).toBeGreaterThan(0);
      expect(planes.length).toBeLessThanOrEqual(3);
    });

    it('should return empty array when sphere does not touch any plane', () => {
      // Given
      const center = new Point('center', 10, 10, 10);
      const sphere = new Sphere('test', center, 5);

      // When
      const planes = SphereCalculator.getIntersectionPlanes(sphere);

      // Then
      expect(planes).toEqual([]);
      expect(Array.isArray(planes)).toBe(true);
      expect(planes.length).toBe(0);
    });

    it('should return multiple planes when sphere touches multiple planes', () => {
      // Given
      const center = new Point('center', 5, 5, 5);
      const sphere = new Sphere('test', center, 5);

      // When
      const planes = SphereCalculator.getIntersectionPlanes(sphere);

      // Then
      expect(planes).toContain(COORDINATE_PLANES.XY);
      expect(planes).toContain(COORDINATE_PLANES.XZ);
      expect(planes).toContain(COORDINATE_PLANES.YZ);
      expect(Array.isArray(planes)).toBe(true);
      expect(planes.length).toBe(3);
    });
  });
}); 