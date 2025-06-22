import { TriangleFactory, SphereFactory, PointFactory } from '../factories/ShapeFactory';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { Point } from '../entities/Point';
import { ValidationException } from '../exceptions/GeometryException';

describe('TriangleFactory', () => {
  describe('createShape', () => {
    it('should create a valid triangle from data', () => {
      // Given
      const factory = new TriangleFactory();
      const data = '0.0 0.0\n3.0 0.0\n0.0 4.0';
      const id = 'test_triangle';

      // When
      const triangle = factory.createShape(data, id);

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

    it('should throw exception for invalid triangle data', () => {
      // Given
      const factory = new TriangleFactory();
      const data = 'invalid data';
      const id = 'test_triangle';

      // When & Then
      expect(() => factory.createShape(data, id)).toThrow(ValidationException);
      expect(() => factory.createShape(data, id)).toThrow('Failed to create triangle');
    });

    it('should throw exception for collinear points', () => {
      // Given
      const factory = new TriangleFactory();
      const data = '0.0 0.0\n1.0 0.0\n2.0 0.0';
      const id = 'test_triangle';

      // When & Then
      expect(() => factory.createShape(data, id)).toThrow(ValidationException);
      expect(() => factory.createShape(data, id)).toThrow('Failed to create triangle');
    });
  });
});

describe('SphereFactory', () => {
  describe('createShape', () => {
    it('should create a valid sphere from data with 3 coordinates', () => {
      // Given
      const factory = new SphereFactory();
      const data = '1.0 2.0 3.0';
      const id = 'test_sphere';

      // When
      const sphere = factory.createShape(data, id);

      // Then
      expect(sphere).toBeInstanceOf(Sphere);
      expect(sphere.id).toBe(id);
      expect(sphere.center.x).toBe(1.0);
      expect(sphere.center.y).toBe(2.0);
      expect(sphere.center.z).toBe(3.0);
      expect(sphere.radius).toBe(1.0); // default radius
    });

    it('should create a valid sphere from data with 4 coordinates', () => {
      // Given
      const factory = new SphereFactory();
      const data = '1.0 2.0 3.0 4.0';
      const id = 'test_sphere';

      // When
      const sphere = factory.createShape(data, id);

      // Then
      expect(sphere).toBeInstanceOf(Sphere);
      expect(sphere.id).toBe(id);
      expect(sphere.center.x).toBe(1.0);
      expect(sphere.center.y).toBe(2.0);
      expect(sphere.center.z).toBe(3.0);
      expect(sphere.radius).toBe(4.0);
    });

    it('should throw exception for invalid sphere data', () => {
      // Given
      const factory = new SphereFactory();
      const data = 'invalid data';
      const id = 'test_sphere';

      // When & Then
      expect(() => factory.createShape(data, id)).toThrow(ValidationException);
      expect(() => factory.createShape(data, id)).toThrow('Failed to create sphere');
    });

    it('should throw exception for negative radius', () => {
      // Given
      const factory = new SphereFactory();
      const data = '1.0 2.0 3.0 -1.0';
      const id = 'test_sphere';

      // When & Then
      expect(() => factory.createShape(data, id)).toThrow(ValidationException);
      expect(() => factory.createShape(data, id)).toThrow('Failed to create sphere');
    });
  });
});

describe('PointFactory', () => {
  describe('createShape', () => {
    it('should create a valid point from 2D data', () => {
      // Given
      const factory = new PointFactory();
      const data = '1.0 2.0';
      const id = 'test_point';

      // When
      const point = factory.createShape(data, id);

      // Then
      expect(point).toBeInstanceOf(Point);
      expect(point.id).toBe(id);
      expect(point.x).toBe(1.0);
      expect(point.y).toBe(2.0);
      expect(point.z).toBe(0); // default z value
    });

    it('should create a valid point from 3D data', () => {
      // Given
      const factory = new PointFactory();
      const data = '1.0 2.0 3.0';
      const id = 'test_point';

      // When
      const point = factory.createShape(data, id);

      // Then
      expect(point).toBeInstanceOf(Point);
      expect(point.id).toBe(id);
      expect(point.x).toBe(1.0);
      expect(point.y).toBe(2.0);
      expect(point.z).toBe(3.0);
    });

    it('should throw exception for invalid point data', () => {
      // Given
      const factory = new PointFactory();
      const data = 'invalid data';
      const id = 'test_point';

      // When & Then
      expect(() => factory.createShape(data, id)).toThrow(ValidationException);
      expect(() => factory.createShape(data, id)).toThrow('Failed to create point');
    });
  });
}); 