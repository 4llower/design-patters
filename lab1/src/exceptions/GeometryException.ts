export class GeometryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeometryException';
  }
}

export class InvalidPointException extends GeometryException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPointException';
  }
}

export class InvalidTriangleException extends GeometryException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTriangleException';
  }
}

export class InvalidSphereException extends GeometryException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidSphereException';
  }
}

export class ValidationException extends GeometryException {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
} 