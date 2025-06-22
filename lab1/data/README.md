# Data Files Documentation

This directory contains various text files for testing and demonstrating the geometry calculator application.

## Main Application Files

### `triangles.txt`
- **Purpose**: Main file for triangle data used by the application
- **Content**: Mix of valid and invalid triangle data
- **Format**: 3 lines per triangle (x y [z] coordinates)
- **Features**: 
  - Valid triangles (right, equilateral, scalene)
  - Invalid data (collinear points, malformed coordinates)
  - Error handling demonstration

### `spheres.txt`
- **Purpose**: Main file for sphere data used by the application
- **Content**: Mix of valid and invalid sphere data
- **Format**: 1 line per sphere (x y z [radius])
- **Features**:
  - Valid spheres with various radii
  - Invalid data (negative radius, malformed coordinates)
  - Error handling demonstration

## Test Files

### `test_triangles_valid.txt`
- **Purpose**: Unit testing with only valid triangles
- **Content**: 4 valid triangles
- **Use**: Testing successful triangle creation and calculations

### `test_spheres_valid.txt`
- **Purpose**: Unit testing with only valid spheres
- **Content**: 7 valid spheres
- **Use**: Testing successful sphere creation and calculations

### `test_triangles_invalid.txt`
- **Purpose**: Unit testing error handling for triangles
- **Content**: Various invalid triangle data
- **Features**:
  - Malformed coordinates
  - Collinear points
  - Insufficient data
  - Too much data

### `test_spheres_invalid.txt`
- **Purpose**: Unit testing error handling for spheres
- **Content**: Various invalid sphere data
- **Features**:
  - Malformed coordinates
  - Negative radius
  - Zero radius
  - Insufficient coordinates
  - Too many coordinates

## Specialized Test Files

### `triangles_3d.txt`
- **Purpose**: Testing 3D triangle functionality
- **Content**: 4 triangles with explicit z-coordinates
- **Use**: Testing 3D distance calculations and area computations

### `spheres_3d.txt`
- **Purpose**: Testing 3D sphere functionality
- **Content**: 9 spheres with various 3D positions
- **Use**: Testing 3D sphere calculations and volume computations

### `spheres_touching_planes.txt`
- **Purpose**: Testing sphere-plane intersection functionality
- **Content**: 9 spheres that touch coordinate planes
- **Features**:
  - Spheres touching XY plane (z = radius)
  - Spheres touching XZ plane (y = radius)
  - Spheres touching YZ plane (x = radius)
- **Use**: Testing `touchesCoordinatePlane()` and `getIntersectionPlanes()` methods

## Data Format Specifications

### Triangle Format
```
x1 y1 [z1]
x2 y2 [z2]
x3 y3 [z3]
```
- Each triangle requires exactly 3 lines
- Each line contains 2 or 3 coordinates
- z-coordinate defaults to 0 if not provided
- Coordinates must be valid numbers

### Sphere Format
```
x y z [radius]
```
- Each sphere requires exactly 1 line
- Line contains 3 or 4 coordinates
- radius defaults to 1.0 if not provided
- All coordinates must be valid numbers
- radius must be positive

## Validation Examples

### Valid Triangle Data
```
0.0 0.0
3.0 0.0
0.0 4.0
```
- Right triangle with area = 6, perimeter = 12

### Valid Sphere Data
```
0.0 0.0 0.0 5.0
```
- Sphere centered at origin with radius 5
- Surface area ≈ 314.16, volume ≈ 523.60

### Invalid Data Examples
```
2a.0 3.0 4.1    # Invalid: contains letter 'a'
1.0 2.0         # Invalid: insufficient data for triangle
1.0 2.0 3.0 -1.0 # Invalid: negative radius
```

## Usage in Tests

The test files are used by:
- `FileReaderService.test.ts` - Testing file reading functionality
- `Validators.test.ts` - Testing data validation
- `Factories.test.ts` - Testing object creation
- Main application - Demonstrating file reading capabilities

## Error Handling

The application handles invalid data by:
1. Skipping invalid lines
2. Logging warnings for skipped lines
3. Continuing processing with valid data
4. Not crashing on malformed input

This ensures robust operation even with corrupted or incomplete data files. 