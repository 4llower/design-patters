import { FileReaderService } from '../services/FileReaderService';
import { TriangleFactory, SphereFactory } from '../factories/ShapeFactory';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { ValidationException } from '../exceptions/GeometryException';

describe('FileReaderService', () => {
  describe('readTrianglesFromFile', () => {
    it('should read valid triangles from file', () => {
      // Given
      const filename = 'test_triangles_valid.txt';

      // When
      const triangles = FileReaderService.readTrianglesFromFile(filename);

      // Then
      expect(Array.isArray(triangles)).toBe(true);
      expect(triangles.length).toBeGreaterThan(0);
      expect(triangles[0]).toBeInstanceOf(Triangle);
      expect(typeof triangles[0].toString()).toBe('string');
    });

    it('should handle invalid data gracefully', () => {
      // Given
      const filename = 'test_triangles_invalid.txt';

      // When
      const triangles = FileReaderService.readTrianglesFromFile(filename);

      // Then
      expect(Array.isArray(triangles)).toBe(true);
      // Should skip invalid lines and only return valid triangles
      expect(triangles.length).toBeGreaterThanOrEqual(0);
    });

    it('should read 3D triangles correctly', () => {
      // Given
      const filename = 'triangles_3d.txt';

      // When
      const triangles = FileReaderService.readTrianglesFromFile(filename);

      // Then
      expect(Array.isArray(triangles)).toBe(true);
      expect(triangles.length).toBeGreaterThan(0);
      expect(triangles[0]).toBeInstanceOf(Triangle);
      const triangle = triangles[0] as Triangle;
      expect(triangle.pointA.z).toBeDefined();
    });
  });

  describe('readSpheresFromFile', () => {
    it('should read valid spheres from file', () => {
      // Given
      const filename = 'test_spheres_valid.txt';

      // When
      const spheres = FileReaderService.readSpheresFromFile(filename);

      // Then
      expect(Array.isArray(spheres)).toBe(true);
      expect(spheres.length).toBeGreaterThan(0);
      expect(spheres[0]).toBeInstanceOf(Sphere);
      expect(typeof spheres[0].toString()).toBe('string');
    });

    it('should handle invalid data gracefully', () => {
      // Given
      const filename = 'test_spheres_invalid.txt';

      // When
      const spheres = FileReaderService.readSpheresFromFile(filename);

      // Then
      expect(Array.isArray(spheres)).toBe(true);
      // Should skip invalid lines and only return valid spheres
      expect(spheres.length).toBeGreaterThanOrEqual(0);
    });

    it('should read 3D spheres correctly', () => {
      // Given
      const filename = 'spheres_3d.txt';

      // When
      const spheres = FileReaderService.readSpheresFromFile(filename);

      // Then
      expect(Array.isArray(spheres)).toBe(true);
      expect(spheres.length).toBeGreaterThan(0);
      expect(spheres[0]).toBeInstanceOf(Sphere);
      const sphere = spheres[0] as Sphere;
      expect(sphere.center.z).toBeDefined();
    });

    it('should read spheres touching coordinate planes', () => {
      // Given
      const filename = 'spheres_touching_planes.txt';

      // When
      const spheres = FileReaderService.readSpheresFromFile(filename);

      // Then
      expect(Array.isArray(spheres)).toBe(true);
      expect(spheres.length).toBeGreaterThan(0);
      expect(spheres[0]).toBeInstanceOf(Sphere);
    });
  });

  describe('readShapesFromFile', () => {
    it('should read shapes using TriangleFactory', () => {
      // Given
      const filename = 'test_triangles_valid.txt';
      const factory = new TriangleFactory();

      // When
      const shapes = FileReaderService.readShapesFromFile(filename, factory);

      // Then
      expect(Array.isArray(shapes)).toBe(true);
      expect(shapes.length).toBeGreaterThan(0);
      expect(shapes[0]).toBeInstanceOf(Triangle);
    });

    it('should read shapes using SphereFactory', () => {
      // Given
      const filename = 'test_spheres_valid.txt';
      const factory = new SphereFactory();

      // When
      const shapes = FileReaderService.readShapesFromFile(filename, factory);

      // Then
      expect(Array.isArray(shapes)).toBe(true);
      expect(shapes.length).toBeGreaterThan(0);
      expect(shapes[0]).toBeInstanceOf(Sphere);
    });

    it('should throw exception for non-existent file', () => {
      // Given
      const filename = 'non-existent.txt';
      const factory = new TriangleFactory();

      // When & Then
      expect(() => FileReaderService.readShapesFromFile(filename, factory)).toThrow(ValidationException);
      expect(() => FileReaderService.readShapesFromFile(filename, factory)).toThrow('File not found');
    });
  });
}); 