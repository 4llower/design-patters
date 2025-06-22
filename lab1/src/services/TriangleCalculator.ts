import { Triangle } from '../entities/Triangle';
import { Point } from '../entities/Point';
import { EPSILON, TRIANGLE_TYPES } from '../constants/Constants';
import { TriangleValidator } from '../validators/TriangleValidator';

export class TriangleCalculator {
  public static calculateArea(triangle: Triangle): number {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    // Using Heron's formula
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    const semiPerimeter = (sideA + sideB + sideC) / 2;
    const area = Math.sqrt(semiPerimeter * (semiPerimeter - sideA) * (semiPerimeter - sideB) * (semiPerimeter - sideC));
    
    return area;
  }

  public static calculatePerimeter(triangle: Triangle): number {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    return sideA + sideB + sideC;
  }

  public static arePointsCollinear(triangle: Triangle): boolean {
    const { pointA, pointB, pointC } = triangle;
    
    // Calculate area using cross product
    const area = Math.abs(
      (pointB.x - pointA.x) * (pointC.y - pointA.y) - 
      (pointC.x - pointA.x) * (pointB.y - pointA.y)
    ) / 2;
    
    return area < EPSILON;
  }

  public static isRightTriangle(triangle: Triangle): boolean {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    const sides = [sideA, sideB, sideC].sort((a, b) => a - b);
    
    // Check if a² + b² = c² (Pythagorean theorem)
    return Math.abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < EPSILON;
  }

  public static isIsoscelesTriangle(triangle: Triangle): boolean {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    return Math.abs(sideA - sideB) < EPSILON || 
           Math.abs(sideB - sideC) < EPSILON || 
           Math.abs(sideA - sideC) < EPSILON;
  }

  public static isEquilateralTriangle(triangle: Triangle): boolean {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    return Math.abs(sideA - sideB) < EPSILON && Math.abs(sideB - sideC) < EPSILON;
  }

  public static getTriangleType(triangle: Triangle): string {
    TriangleValidator.validateTriangle(triangle);
    
    if (this.isEquilateralTriangle(triangle)) {
      return TRIANGLE_TYPES.EQUILATERAL;
    }
    
    if (this.isIsoscelesTriangle(triangle)) {
      return TRIANGLE_TYPES.ISOSCELES;
    }
    
    return TRIANGLE_TYPES.SCALENE;
  }

  public static isAcuteTriangle(triangle: Triangle): boolean {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    const sides = [sideA, sideB, sideC].sort((a, b) => a - b);
    
    // For acute triangle: a² + b² > c²
    return sides[0] * sides[0] + sides[1] * sides[1] > sides[2] * sides[2];
  }

  public static isObtuseTriangle(triangle: Triangle): boolean {
    TriangleValidator.validateTriangle(triangle);
    
    const { pointA, pointB, pointC } = triangle;
    
    const sideA = this.calculateDistance(pointB, pointC);
    const sideB = this.calculateDistance(pointA, pointC);
    const sideC = this.calculateDistance(pointA, pointB);
    
    const sides = [sideA, sideB, sideC].sort((a, b) => a - b);
    
    // For obtuse triangle: a² + b² < c²
    return sides[0] * sides[0] + sides[1] * sides[1] < sides[2] * sides[2];
  }

  public static getAngleType(triangle: Triangle): string {
    TriangleValidator.validateTriangle(triangle);
    
    if (this.isRightTriangle(triangle)) {
      return TRIANGLE_TYPES.RIGHT;
    }
    
    if (this.isAcuteTriangle(triangle)) {
      return TRIANGLE_TYPES.ACUTE;
    }
    
    return TRIANGLE_TYPES.OBTUSE;
  }

  private static calculateDistance(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const dz = point2.z - point1.z;
    
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
} 