import * as fs from 'fs';
import * as path from 'path';
import { ShapeFactory, TriangleFactory, SphereFactory } from '../factories/ShapeFactory';
import { Shape } from '../entities/Shape';
import { ValidationException } from '../exceptions/GeometryException';
import Logger from '../utils/Logger';

export class FileReaderService {
  private static readonly DATA_DIR = path.resolve(process.cwd(), 'data');

  public static readShapesFromFile(filename: string, factory: ShapeFactory): Shape[] {
    const filePath = path.join(this.DATA_DIR, filename);
    const shapes: Shape[] = [];
    
    try {
      if (!fs.existsSync(filePath)) {
        Logger.error(`File not found: ${filePath}`);
        throw new ValidationException(`File not found: ${filename}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter((line: string) => line.trim() !== '');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '') {
          continue;
        }

        try {
          const shapeId = `shape_${i + 1}`;
          let shapeData = line;
          
          // For triangles, we need to read 3 lines
          if (factory instanceof TriangleFactory && i + 2 < lines.length) {
            shapeData = `${line}\n${lines[i + 1].trim()}\n${lines[i + 2].trim()}`;
            i += 2; // Skip the next 2 lines
          }
          
          const shape = factory.createShape(shapeData, shapeId);
          shapes.push(shape);
          Logger.info(`Successfully created shape: ${shape.toString()}`);
          
        } catch (error) {
          Logger.warn(`Skipping invalid line ${i + 1}: ${line}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          continue;
        }
      }
      
      Logger.info(`Successfully read ${shapes.length} shapes from ${filename}`);
      return shapes;
      
    } catch (error) {
      Logger.error(`Error reading file ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new ValidationException(`Error reading file ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public static readTrianglesFromFile(filename: string): Shape[] {
    const factory = new TriangleFactory();
    return this.readShapesFromFile(filename, factory);
  }

  public static readSpheresFromFile(filename: string): Shape[] {
    const factory = new SphereFactory();
    return this.readShapesFromFile(filename, factory);
  }
} 