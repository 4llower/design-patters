# Geometry Calculator

A TypeScript application implementing geometric calculations for triangles and spheres using design patterns and best practices.

## Features

### Triangle Operations
- Calculate area and perimeter
- Check if points form a valid triangle (not collinear)
- Determine triangle types: equilateral, isosceles, scalene
- Determine angle types: right, acute, obtuse
- Validate triangle properties

### Sphere Operations
- Calculate surface area and volume
- Check if object is a valid sphere
- Determine if sphere touches coordinate planes
- Calculate volume ratios when intersected by coordinate planes
- Validate sphere properties

### File Reading
- Read triangle and sphere data from text files
- Handle invalid data gracefully (skip invalid lines)
- Support both manual object creation and file-based creation
- Comprehensive error handling and logging

### Design Patterns
- **Factory Method Pattern**: Used for creating Point, Triangle, and Sphere objects
- **Entity Classes**: Separate business logic from data structures
- **Validator Pattern**: Comprehensive input validation
- **Service Layer**: Business logic separated from entities

## Project Structure

```
lab1/
├── src/
│   ├── entities/           # Entity classes (Point, Triangle, Sphere, Shape)
│   ├── services/           # Business logic (TriangleCalculator, SphereCalculator, FileReaderService)
│   ├── validators/         # Input validation classes
│   ├── factories/          # Factory Method pattern implementation
│   ├── exceptions/         # Custom exception classes
│   ├── constants/          # Constants and regular expressions
│   ├── utils/              # Utilities (Logger)
│   └── __tests__/          # Unit tests
├── data/                   # Sample data files
└── dist/                   # Compiled JavaScript
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will:
1. Demonstrate triangle calculations with manually created objects
2. Demonstrate sphere calculations with manually created objects
3. Read triangles and spheres from data files and perform calculations
4. Log all operations and results to console

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Data File Format

### Triangle Data Format
Each triangle is defined by 3 lines, each containing 2 or 3 coordinates:
```
x1 y1 [z1]
x2 y2 [z2]
x3 y3 [z3]
```

Example:
```
0.0 0.0
3.0 0.0
0.0 4.0
```

### Sphere Data Format
Each sphere is defined by one line with 3 or 4 coordinates:
```
x y z [radius]
```

Example:
```
0.0 0.0 0.0 5.0
```

## Validation Rules

### Point Validation
- Coordinates must be finite numbers
- 2D points: x, y coordinates required
- 3D points: x, y, z coordinates (z defaults to 0)

### Triangle Validation
- All three points must be distinct
- Points must not be collinear
- Each point must be valid

### Sphere Validation
- Radius must be positive and finite
- Center point must be valid

## Error Handling

The application uses custom exception classes:
- `GeometryException`: Base exception class
- `InvalidPointException`: Point-related errors
- `InvalidTriangleException`: Triangle-related errors
- `InvalidSphereException`: Sphere-related errors
- `ValidationException`: Validation errors

## Logging

The application uses console logging with different levels:
- **INFO**: General information and successful operations
- **WARN**: Warning messages for skipped invalid data
- **ERROR**: Error messages for critical failures
- **DEBUG**: Debug information (when needed)