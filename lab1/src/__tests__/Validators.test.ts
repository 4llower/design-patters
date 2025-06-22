import { PointValidator } from '../validators/PointValidator';
import { TriangleValidator } from '../validators/TriangleValidator';
import { SphereValidator } from '../validators/SphereValidator';
import { Point } from '../entities/Point';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { ValidationException, InvalidPointException } from '../exceptions/GeometryException';

describe('PointValidator', () => {
  describe('validatePointData', () => {
    it('should return true for valid 2D point data', () => {
      // Given
      const data = '1.0 2.0';

      // When
      const isValid = PointValidator.validatePointData(data);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return true for valid 3D point data', () => {
      // Given
      const data = '1.0 2.0 3.0';

      // When
      const isValid = PointValidator.validatePointData(data);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for invalid data with letters', () => {
      // Given
      const data = '2a.0 3.0 4.1';

      // When
      const isValid = PointValidator.validatePointData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for insufficient data', () => {
      // Given
      const data = '1.0';

      // When
      const isValid = PointValidator.validatePointData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for too much data', () => {
      // Given
      const data = '1.0 2.0 3.0 4.0';

      // When
      const isValid = PointValidator.validatePointData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('parsePointData', () => {
    it('should parse valid 2D point data correctly', () => {
      // Given
      const data = '1.0 2.0';
      const id = 'test_point';

      // When
      const point = PointValidator.parsePointData(data, id);

      // Then
      expect(point).toBeInstanceOf(Point);
      expect(point.id).toBe(id);
      expect(point.x).toBe(1.0);
      expect(point.y).toBe(2.0);
      expect(point.z).toBe(0);
    });

    it('should parse valid 3D point data correctly', () => {
      // Given
      const data = '1.0 2.0 3.0';
      const id = 'test_point';

      // When
      const point = PointValidator.parsePointData(data, id);

      // Then
      expect(point).toBeInstanceOf(Point);
      expect(point.id).toBe(id);
      expect(point.x).toBe(1.0);
      expect(point.y).toBe(2.0);
      expect(point.z).toBe(3.0);
    });

    it('should throw exception for invalid data', () => {
      // Given
      const data = 'invalid data';
      const id = 'test_point';

      // When & Then
      expect(() => PointValidator.parsePointData(data, id)).toThrow(ValidationException);
      expect(() => PointValidator.parsePointData(data, id)).toThrow('Invalid point data format');
    });
  });

  describe('validateCoordinates', () => {
    it('should not throw for valid coordinates', () => {
      // Given
      const x = 1.0;
      const y = 2.0;
      const z = 3.0;

      // When & Then
      expect(() => PointValidator.validateCoordinates(x, y, z)).not.toThrow();
    });

    it('should throw for non-finite coordinates', () => {
      // Given
      const x = Infinity;
      const y = 2.0;
      const z = 3.0;

      // When & Then
      expect(() => PointValidator.validateCoordinates(x, y, z)).toThrow(InvalidPointException);
      expect(() => PointValidator.validateCoordinates(x, y, z)).toThrow('Coordinates must be finite numbers');
    });
  });
});

describe('TriangleValidator', () => {
  describe('validateTriangleData', () => {
    it('should return true for valid triangle data', () => {
      // Given
      const data = '0.0 0.0\n3.0 0.0\n0.0 4.0';

      // When
      const isValid = TriangleValidator.validateTriangleData(data);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for invalid triangle data', () => {
      // Given
      const data = '0.0 0.0\ninvalid\n0.0 4.0';

      // When
      const isValid = TriangleValidator.validateTriangleData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for insufficient data', () => {
      // Given
      const data = '0.0 0.0\n3.0 0.0';

      // When
      const isValid = TriangleValidator.validateTriangleData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('parseTriangleData', () => {
    it('should parse valid triangle data correctly', () => {
      // Given
      const data = '0.0 0.0\n3.0 0.0\n0.0 4.0';
      const id = 'test_triangle';

      // When
      const triangle = TriangleValidator.parseTriangleData(data, id);

      // Then
      expect(triangle).toBeInstanceOf(Triangle);
      expect(triangle.id).toBe(id);
      expect(triangle.pointA.x).toBe(0.0);
      expect(triangle.pointA.y).toBe(0.0);
      expect(triangle.pointB.x).toBe(3.0);
      expect(triangle.pointB.y).toBe(0.0);
      expect(triangle.pointC.x).toBe(0.0);
      expect(triangle.pointC.y).toBe(4.0);
    });

    it('should throw exception for invalid data', () => {
      // Given
      const data = 'invalid data';
      const id = 'test_triangle';

      // When & Then
      expect(() => TriangleValidator.parseTriangleData(data, id)).toThrow(ValidationException);
      expect(() => TriangleValidator.parseTriangleData(data, id)).toThrow('Invalid triangle data format');
    });
  });

  describe('validateTriangle', () => {
    it('should not throw for valid triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When & Then
      expect(() => TriangleValidator.validateTriangle(triangle)).not.toThrow();
    });

    it('should throw for triangle with collinear points', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 1, 0, 0);
      const pointC = new Point('C', 2, 0, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When & Then
      expect(() => TriangleValidator.validateTriangle(triangle)).toThrow('Triangle points must not be collinear');
    });
  });
});

describe('SphereValidator', () => {
  describe('validateSphereData', () => {
    it('should return true for valid sphere data with 3 coordinates', () => {
      // Given
      const data = '1.0 2.0 3.0';

      // When
      const isValid = SphereValidator.validateSphereData(data);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return true for valid sphere data with 4 coordinates', () => {
      // Given
      const data = '1.0 2.0 3.0 4.0';

      // When
      const isValid = SphereValidator.validateSphereData(data);

      // Then
      expect(isValid).toBe(true);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for invalid data', () => {
      // Given
      const data = '1.0 2a.0 3.0';

      // When
      const isValid = SphereValidator.validateSphereData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });

    it('should return false for insufficient data', () => {
      // Given
      const data = '1.0 2.0';

      // When
      const isValid = SphereValidator.validateSphereData(data);

      // Then
      expect(isValid).toBe(false);
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('parseSphereData', () => {
    it('should parse valid sphere data with 3 coordinates correctly', () => {
      // Given
      const data = '1.0 2.0 3.0';
      const id = 'test_sphere';

      // When
      const sphere = SphereValidator.parseSphereData(data, id);

      // Then
      expect(sphere).toBeInstanceOf(Sphere);
      expect(sphere.id).toBe(id);
      expect(sphere.center.x).toBe(1.0);
      expect(sphere.center.y).toBe(2.0);
      expect(sphere.center.z).toBe(3.0);
      expect(sphere.radius).toBe(1.0); // default radius
    });

    it('should parse valid sphere data with 4 coordinates correctly', () => {
      // Given
      const data = '1.0 2.0 3.0 4.0';
      const id = 'test_sphere';

      // When
      const sphere = SphereValidator.parseSphereData(data, id);

      // Then
      expect(sphere).toBeInstanceOf(Sphere);
      expect(sphere.id).toBe(id);
      expect(sphere.center.x).toBe(1.0);
      expect(sphere.center.y).toBe(2.0);
      expect(sphere.center.z).toBe(3.0);
      expect(sphere.radius).toBe(4.0);
    });

    it('should throw exception for invalid data', () => {
      // Given
      const data = 'invalid data';
      const id = 'test_sphere';

      // When & Then
      expect(() => SphereValidator.parseSphereData(data, id)).toThrow(ValidationException);
      expect(() => SphereValidator.parseSphereData(data, id)).toThrow('Invalid sphere data format');
    });
  });

  describe('validateSphere', () => {
    it('should not throw for valid sphere', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, 5);

      // When & Then
      expect(() => SphereValidator.validateSphere(sphere)).not.toThrow();
    });

    it('should throw for sphere with negative radius', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, -1);

      // When & Then
      expect(() => SphereValidator.validateSphere(sphere)).toThrow('Sphere radius must be positive');
    });

    it('should throw for sphere with non-finite radius', () => {
      // Given
      const center = new Point('center', 0, 0, 0);
      const sphere = new Sphere('test', center, Infinity);

      // When & Then
      expect(() => SphereValidator.validateSphere(sphere)).toThrow('Sphere radius must be a finite number');
    });
  });
}); 