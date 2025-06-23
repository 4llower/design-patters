import { TriangleCalculator } from './services/TriangleCalculator';
import { SphereCalculator } from './services/SphereCalculator';
import { FileReaderService } from './services/FileReaderService';
import { Triangle } from './entities/Triangle';
import { Sphere } from './entities/Sphere';
import { Point } from './entities/Point';
import Logger from './utils/Logger';
import { ShapeRepository, IdComparator, isInFirstQuadrant, areaInRange, volumeInRange, distanceFromOriginInRange } from './repositories/ShapeRepository';
import { Warehouse } from './services/Warehouse';

class GeometryApplication {
  public static async run(): Promise<void> {
    try {
      Logger.info('Starting Geometry Calculator Application');

      await this.demonstrateTriangleCalculations();
      await this.demonstrateSphereCalculations();

      await this.demonstrateFileReading();
      await this.demonstrateRepositoryAndWarehouse();

      Logger.info('Geometry Calculator Application completed successfully');
    } catch (error) {
      Logger.error(`Application error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private static async demonstrateTriangleCalculations(): Promise<void> {
    Logger.info('=== Triangle Calculations Demo ===');

    const pointA = new Point('A', 0, 0, 0);
    const pointB = new Point('B', 3, 0, 0);
    const pointC = new Point('C', 0, 4, 0);

    const triangle = new Triangle('triangle1', pointA, pointB, pointC);

    const area = TriangleCalculator.calculateArea(triangle);
    const perimeter = TriangleCalculator.calculatePerimeter(triangle);
    const isRight = TriangleCalculator.isRightTriangle(triangle);
    const isIsosceles = TriangleCalculator.isIsoscelesTriangle(triangle);
    const isEquilateral = TriangleCalculator.isEquilateralTriangle(triangle);
    const isAcute = TriangleCalculator.isAcuteTriangle(triangle);
    const isObtuse = TriangleCalculator.isObtuseTriangle(triangle);
    const triangleType = TriangleCalculator.getTriangleType(triangle);
    const angleType = TriangleCalculator.getAngleType(triangle);
    const areCollinear = TriangleCalculator.arePointsCollinear(triangle);

    Logger.info(`Triangle: ${triangle.toString()}`);
    Logger.info(`Area: ${area}`);
    Logger.info(`Perimeter: ${perimeter}`);
    Logger.info(`Is Right Triangle: ${isRight}`);
    Logger.info(`Is Isosceles: ${isIsosceles}`);
    Logger.info(`Is Equilateral: ${isEquilateral}`);
    Logger.info(`Is Acute: ${isAcute}`);
    Logger.info(`Is Obtuse: ${isObtuse}`);
    Logger.info(`Triangle Type: ${triangleType}`);
    Logger.info(`Angle Type: ${angleType}`);
    Logger.info(`Points Collinear: ${areCollinear}`);
  }

  private static async demonstrateSphereCalculations(): Promise<void> {
    Logger.info('=== Sphere Calculations Demo ===');

    const center = new Point('center', 2, 3, 1);
    const sphere = new Sphere('sphere1', center, 5);

    const surfaceArea = SphereCalculator.calculateSurfaceArea(sphere);
    const volume = SphereCalculator.calculateVolume(sphere);
    const isSphere = SphereCalculator.isSphere(sphere);
    const touchesXY = SphereCalculator.touchesCoordinatePlane(sphere, 'xy');
    const touchesAny = SphereCalculator.touchesAnyCoordinatePlane(sphere);
    const volumeRatioXY = SphereCalculator.calculateVolumeRatio(sphere, 'xy');
    const intersectionPlanes = SphereCalculator.getIntersectionPlanes(sphere);

    Logger.info(`Sphere: ${sphere.toString()}`);
    Logger.info(`Surface Area: ${surfaceArea}`);
    Logger.info(`Volume: ${volume}`);
    Logger.info(`Is Valid Sphere: ${isSphere}`);
    Logger.info(`Touches XY Plane: ${touchesXY}`);
    Logger.info(`Touches Any Plane: ${touchesAny}`);
    Logger.info(`Volume Ratio XY: ${volumeRatioXY}`);
    Logger.info(`Intersection Planes: ${intersectionPlanes.join(', ')}`);
  }

  private static async demonstrateFileReading(): Promise<void> {
    Logger.info('=== File Reading Demo ===');
    
    try {
      Logger.info('Reading triangles from file...');
      const triangles = FileReaderService.readTrianglesFromFile('triangles.txt');
      
      Logger.info(`Successfully read ${triangles.length} triangles from file`);
      
      for (let i = 0; i < triangles.length; i++) {
        const triangle = triangles[i] as Triangle;
        Logger.info(`Triangle ${i + 1}: ${triangle.toString()}`);
        
        try {
          const area = TriangleCalculator.calculateArea(triangle);
          const perimeter = TriangleCalculator.calculatePerimeter(triangle);
          const triangleType = TriangleCalculator.getTriangleType(triangle);
          const angleType = TriangleCalculator.getAngleType(triangle);
          
          Logger.info(`  Area: ${area.toFixed(2)}`);
          Logger.info(`  Perimeter: ${perimeter.toFixed(2)}`);
          Logger.info(`  Type: ${triangleType}`);
          Logger.info(`  Angle Type: ${angleType}`);
        } catch (error) {
          Logger.warn(`  Error calculating properties: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      Logger.info('Reading spheres from file...');
      const spheres = FileReaderService.readSpheresFromFile('spheres.txt');
      
      Logger.info(`Successfully read ${spheres.length} spheres from file`);
      
      for (let i = 0; i < spheres.length; i++) {
        const sphere = spheres[i] as Sphere;
        Logger.info(`Sphere ${i + 1}: ${sphere.toString()}`);
        
        try {
          const surfaceArea = SphereCalculator.calculateSurfaceArea(sphere);
          const volume = SphereCalculator.calculateVolume(sphere);
          const touchesAny = SphereCalculator.touchesAnyCoordinatePlane(sphere);
          
          Logger.info(`  Surface Area: ${surfaceArea.toFixed(2)}`);
          Logger.info(`  Volume: ${volume.toFixed(2)}`);
          Logger.info(`  Touches Any Plane: ${touchesAny}`);
        } catch (error) {
          Logger.warn(`  Error calculating properties: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
    } catch (error) {
      Logger.warn(`File reading demo failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      Logger.info('Make sure data files exist in the data/ directory');
    }
  }

  private static async demonstrateRepositoryAndWarehouse(): Promise<void> {
    Logger.info('=== Repository & Warehouse Demo ===');

    const repo = new ShapeRepository();
    const warehouse = Warehouse.getInstance();

    Logger.info('Reading triangles from file...');
    const triangles = FileReaderService.readTrianglesFromFile('triangles.txt');
    for (const triangle of triangles) {
      triangle.addObserver(warehouse);
      repo.add(triangle);
      warehouse.recalculate(triangle); // инициализация метрик
    }

    Logger.info('Reading spheres from file...');
    const spheres = FileReaderService.readSpheresFromFile('spheres.txt');
    for (const sphere of spheres) {
      sphere.addObserver(warehouse);
      repo.add(sphere);
      warehouse.recalculate(sphere);
    }

    // Пример поиска: все фигуры в первом квадранте
    const firstQuadrant = repo.findByCoordinates(isInFirstQuadrant);
    Logger.info(`Shapes in first quadrant: ${firstQuadrant.map(s => s.id).join(', ')}`);

    // Пример поиска: треугольники с площадью в диапазоне 5-10
    const trianglesArea = repo.findByCoordinates(areaInRange(5, 10, id => warehouse.getMetrics(id)));
    Logger.info(`Triangles with area 5-10: ${trianglesArea.map(s => s.id).join(', ')}`);

    // Пример поиска: сферы с объемом в диапазоне 50-200
    const spheresVolume = repo.findByCoordinates(volumeInRange(50, 200, id => warehouse.getMetrics(id)));
    Logger.info(`Spheres with volume 50-200: ${spheresVolume.map(s => s.id).join(', ')}`);

    // Пример поиска: объекты на расстоянии 0-10 от начала координат
    const nearOrigin = repo.findByCoordinates(distanceFromOriginInRange(0, 10));
    Logger.info(`Shapes near origin (0-10): ${nearOrigin.map(s => s.id).join(', ')}`);

    // Пример сортировки по id
    const sortedById = repo.sort(new IdComparator());
    Logger.info(`All shapes sorted by id: ${sortedById.map(s => s.id).join(', ')}`);

    // Пример получения метрик из Warehouse
    for (const shape of sortedById) {
      const metrics = warehouse.getMetrics(shape.id);
      Logger.info(`Shape ${shape.id} metrics: ${JSON.stringify(metrics)}`);
    }
  }
}

if (require.main === module) {
  GeometryApplication.run().catch((error) => {
    console.error('Application failed:', error);
    process.exit(1);
  });
}

export default GeometryApplication; 