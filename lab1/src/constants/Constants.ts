export const COORDINATE_REGEX = /^-?\d+(\.\d+)?$/;
export const POINT_DATA_REGEX = /^(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)$/;
export const SPHERE_DATA_REGEX = /^(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)$/;

export const DEFAULT_RADIUS = 1.0;
export const EPSILON = 1e-10;

export const TRIANGLE_TYPES = {
  EQUILATERAL: 'equilateral',
  ISOSCELES: 'isosceles',
  SCALENE: 'scalene',
  RIGHT: 'right',
  ACUTE: 'acute',
  OBTUSE: 'obtuse',
} as const;

export const COORDINATE_PLANES = {
  XY: 'xy',
  XZ: 'xz',
  YZ: 'yz',
} as const; 