import { TriangleCalculator } from '../services/TriangleCalculator';
import { Triangle } from '../entities/Triangle';
import { Point } from '../entities/Point';
import { InvalidTriangleException } from '../exceptions/GeometryException';

describe('TriangleCalculator', () => {
  describe('calculateArea', () => {
    it('should calculate area of a right triangle correctly', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const area = TriangleCalculator.calculateArea(triangle);

      // Then
      expect(area).toBeCloseTo(6, 2);
      expect(area).toBeGreaterThan(0);
      expect(typeof area).toBe('number');
    });

    it('should calculate area of an equilateral triangle correctly', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const area = TriangleCalculator.calculateArea(triangle);

      // Then
      expect(area).toBeCloseTo(Math.sqrt(3), 2);
      expect(area).toBeGreaterThan(0);
      expect(area).toBeLessThan(2);
    });

    it('should throw exception for invalid triangle with collinear points', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 1, 0, 0);
      const pointC = new Point('C', 2, 0, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When & Then
      expect(() => TriangleCalculator.calculateArea(triangle)).toThrow(InvalidTriangleException);
      expect(() => TriangleCalculator.calculateArea(triangle)).toThrow('Triangle points must not be collinear');
    });
  });

  describe('calculatePerimeter', () => {
    it('should calculate perimeter of a triangle correctly', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const perimeter = TriangleCalculator.calculatePerimeter(triangle);

      // Then
      expect(perimeter).toBeCloseTo(12, 2);
      expect(perimeter).toBeGreaterThan(0);
      expect(typeof perimeter).toBe('number');
    });

    it('should calculate perimeter of an equilateral triangle correctly', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const perimeter = TriangleCalculator.calculatePerimeter(triangle);

      // Then
      expect(perimeter).toBeCloseTo(6, 2);
      expect(perimeter).toBeGreaterThan(0);
      expect(perimeter).toBeLessThan(7);
    });
  });

  describe('arePointsCollinear', () => {
    it('should return true for collinear points', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 1, 0, 0);
      const pointC = new Point('C', 2, 0, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const areCollinear = TriangleCalculator.arePointsCollinear(triangle);

      // Then
      expect(areCollinear).toBe(true);
      expect(typeof areCollinear).toBe('boolean');
    });

    it('should return false for non-collinear points', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const areCollinear = TriangleCalculator.arePointsCollinear(triangle);

      // Then
      expect(areCollinear).toBe(false);
      expect(typeof areCollinear).toBe('boolean');
    });
  });

  describe('isRightTriangle', () => {
    it('should return true for a right triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isRight = TriangleCalculator.isRightTriangle(triangle);

      // Then
      expect(isRight).toBe(true);
      expect(typeof isRight).toBe('boolean');
    });

    it('should return false for a non-right triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isRight = TriangleCalculator.isRightTriangle(triangle);

      // Then
      expect(isRight).toBe(false);
      expect(typeof isRight).toBe('boolean');
    });
  });

  describe('isIsoscelesTriangle', () => {
    it('should return true for an isosceles triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, 1, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isIsosceles = TriangleCalculator.isIsoscelesTriangle(triangle);

      // Then
      expect(isIsosceles).toBe(true);
      expect(typeof isIsosceles).toBe('boolean');
    });

    it('should return false for a scalene triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isIsosceles = TriangleCalculator.isIsoscelesTriangle(triangle);

      // Then
      expect(isIsosceles).toBe(false);
      expect(typeof isIsosceles).toBe('boolean');
    });
  });

  describe('isEquilateralTriangle', () => {
    it('should return true for an equilateral triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isEquilateral = TriangleCalculator.isEquilateralTriangle(triangle);

      // Then
      expect(isEquilateral).toBe(true);
      expect(typeof isEquilateral).toBe('boolean');
    });

    it('should return false for a non-equilateral triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isEquilateral = TriangleCalculator.isEquilateralTriangle(triangle);

      // Then
      expect(isEquilateral).toBe(false);
      expect(typeof isEquilateral).toBe('boolean');
    });
  });

  describe('getTriangleType', () => {
    it('should return equilateral for equilateral triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const type = TriangleCalculator.getTriangleType(triangle);

      // Then
      expect(type).toBe('equilateral');
      expect(typeof type).toBe('string');
      expect(['equilateral', 'isosceles', 'scalene']).toContain(type);
    });

    it('should return isosceles for isosceles triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, 1, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const type = TriangleCalculator.getTriangleType(triangle);

      // Then
      expect(type).toBe('isosceles');
      expect(typeof type).toBe('string');
    });
  });

  describe('isAcuteTriangle', () => {
    it('should return true for an acute triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isAcute = TriangleCalculator.isAcuteTriangle(triangle);

      // Then
      expect(isAcute).toBe(true);
      expect(typeof isAcute).toBe('boolean');
    });

    it('should return false for a right triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isAcute = TriangleCalculator.isAcuteTriangle(triangle);

      // Then
      expect(isAcute).toBe(false);
      expect(typeof isAcute).toBe('boolean');
    });
  });

  describe('isObtuseTriangle', () => {
    it('should return true for an obtuse triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 4, 0, 0);
      const pointC = new Point('C', 1, 1, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isObtuse = TriangleCalculator.isObtuseTriangle(triangle);

      // Then
      expect(isObtuse).toBe(true);
      expect(typeof isObtuse).toBe('boolean');
    });

    it('should return false for an acute triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const isObtuse = TriangleCalculator.isObtuseTriangle(triangle);

      // Then
      expect(isObtuse).toBe(false);
      expect(typeof isObtuse).toBe('boolean');
    });
  });

  describe('getAngleType', () => {
    it('should return right for right triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 3, 0, 0);
      const pointC = new Point('C', 0, 4, 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const angleType = TriangleCalculator.getAngleType(triangle);

      // Then
      expect(angleType).toBe('right');
      expect(typeof angleType).toBe('string');
      expect(['right', 'acute', 'obtuse']).toContain(angleType);
    });

    it('should return acute for acute triangle', () => {
      // Given
      const pointA = new Point('A', 0, 0, 0);
      const pointB = new Point('B', 2, 0, 0);
      const pointC = new Point('C', 1, Math.sqrt(3), 0);
      const triangle = new Triangle('test', pointA, pointB, pointC);

      // When
      const angleType = TriangleCalculator.getAngleType(triangle);

      // Then
      expect(angleType).toBe('acute');
      expect(typeof angleType).toBe('string');
    });
  });
}); 