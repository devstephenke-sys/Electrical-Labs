/**
 * Tests for Matrix Operations
 */

import { describe, it, expect } from 'vitest';
import { MatrixOperations } from '../src/engine/MatrixOperations';

describe('MatrixOperations', () => {
  describe('solve', () => {
    it('should solve a simple 2x2 system', () => {
      const A = [
        [2, 1],
        [1, 3],
      ];
      const b = [5, 10];

      const x = MatrixOperations.solve(A, b);

      expect(x[0]).toBeCloseTo(1, 5);
      expect(x[1]).toBeCloseTo(3, 5);
    });

    it('should solve a 3x3 system', () => {
      const A = [
        [2, 1, -1],
        [-3, -1, 2],
        [-2, 1, 2],
      ];
      const b = [1, 2, 3];

      const x = MatrixOperations.solve(A, b);

      // Verify Ax = b
      expect(A[0][0] * x[0] + A[0][1] * x[1] + A[0][2] * x[2]).toBeCloseTo(b[0], 5);
      expect(A[1][0] * x[0] + A[1][1] * x[1] + A[1][2] * x[2]).toBeCloseTo(b[1], 5);
      expect(A[2][0] * x[0] + A[2][1] * x[1] + A[2][2] * x[2]).toBeCloseTo(b[2], 5);
    });

    it('should throw error for singular matrix', () => {
      const A = [
        [1, 1],
        [1, 1],
      ];
      const b = [1, 2];

      expect(() => MatrixOperations.solve(A, b)).toThrow('Singular matrix');
    });
  });

  describe('multiply', () => {
    it('should multiply two matrices', () => {
      const A = [
        [1, 2],
        [3, 4],
      ];
      const B = [
        [5, 6],
        [7, 8],
      ];

      const result = MatrixOperations.multiply(A, B);

      expect(result[0][0]).toBe(19); // 1*5 + 2*7
      expect(result[0][1]).toBe(22); // 1*6 + 2*8
      expect(result[1][0]).toBe(43); // 3*5 + 4*7
      expect(result[1][1]).toBe(50); // 3*6 + 4*8
    });
  });

  describe('transpose', () => {
    it('should transpose a matrix', () => {
      const A = [
        [1, 2, 3],
        [4, 5, 6],
      ];

      const result = MatrixOperations.transpose(A);

      expect(result[0][0]).toBe(1);
      expect(result[0][1]).toBe(4);
      expect(result[1][0]).toBe(2);
      expect(result[1][1]).toBe(5);
      expect(result[2][0]).toBe(3);
      expect(result[2][1]).toBe(6);
    });
  });
});
