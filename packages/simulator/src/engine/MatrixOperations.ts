/**
 * Matrix operations for Modified Nodal Analysis
 * Gaussian elimination for solving linear equations
 */

export class MatrixOperations {
  /**
   * Solve linear system Ax = b using Gaussian elimination
   * @param A - Coefficient matrix (n x n)
   * @param b - Right-hand side vector (n)
   * @returns Solution vector x (n)
   */
  static solve(A: number[][], b: number[]): number[] {
    const n = A.length;

    // Create augmented matrix [A|b]
    const augmented = A.map((row, i) => [...row, b[i]]);

    // Forward elimination with partial pivoting
    for (let col = 0; col < n; col++) {
      // Find pivot row (maximum absolute value in current column)
      let pivotRow = col;
      let maxAbs = Math.abs(augmented[col][col]);

      for (let row = col + 1; row < n; row++) {
        const absVal = Math.abs(augmented[row][col]);
        if (absVal > maxAbs) {
          maxAbs = absVal;
          pivotRow = row;
        }
      }

      // Swap rows if necessary
      if (pivotRow !== col) {
        [augmented[col], augmented[pivotRow]] = [augmented[pivotRow], augmented[col]];
      }

      // Check for singular matrix
      if (Math.abs(augmented[col][col]) < 1e-10) {
        throw new Error('Singular matrix - circuit may be floating or invalid');
      }

      // Eliminate column entries below pivot
      const pivot = augmented[col][col];
      for (let row = col + 1; row < n; row++) {
        const factor = augmented[row][col] / pivot;
        for (let k = col; k <= n; k++) {
          augmented[row][k] -= factor * augmented[col][k];
        }
      }
    }

    // Back substitution
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = augmented[i][n]; // Right-hand side
      for (let j = i + 1; j < n; j++) {
        sum -= augmented[i][j] * x[j];
      }
      x[i] = sum / augmented[i][i];
    }

    return x;
  }

  /**
   * Multiply two matrices
   * @param A - First matrix (m x n)
   * @param B - Second matrix (n x p)
   * @returns Product matrix (m x p)
   */
  static multiply(A: number[][], B: number[][]): number[][] {
    const m = A.length;
    const n = A[0].length;
    const p = B[0].length;

    const result: number[][] = Array(m).fill(null).map(() => Array(p).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < p; j++) {
        for (let k = 0; k < n; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }

    return result;
  }

  /**
   * Transpose a matrix
   * @param A - Input matrix (m x n)
   * @returns Transposed matrix (n x m)
   */
  static transpose(A: number[][]): number[][] {
    const m = A.length;
    const n = A[0].length;

    const result: number[][] = Array(n).fill(null).map(() => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        result[j][i] = A[i][j];
      }
    }

    return result;
  }

  /**
   * Invert a matrix (for testing/validation)
   * @param A - Input matrix (n x n)
   * @returns Inverted matrix (n x n)
   */
  static invert(A: number[][]): number[][] {
    const n = A.length;

    // Create augmented matrix [A|I]
    const augmented = A.map((row, i) => [...row, ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))]);

    // Forward elimination
    for (let col = 0; col < n; col++) {
      // Find pivot
      let pivotRow = col;
      let maxAbs = Math.abs(augmented[col][col]);

      for (let row = col + 1; row < n; row++) {
        const absVal = Math.abs(augmented[row][col]);
        if (absVal > maxAbs) {
          maxAbs = absVal;
          pivotRow = row;
        }
      }

      // Swap rows
      if (pivotRow !== col) {
        [augmented[col], augmented[pivotRow]] = [augmented[pivotRow], augmented[col]];
      }

      // Check for singular
      if (Math.abs(augmented[col][col]) < 1e-10) {
        throw new Error('Cannot invert singular matrix');
      }

      // Eliminate
      const pivot = augmented[col][col];
      for (let row = col + 1; row < n; row++) {
        const factor = augmented[row][col] / pivot;
        for (let k = col; k < 2 * n; k++) {
          augmented[row][k] -= factor * augmented[col][k];
        }
      }
    }

    // Back substitution
    for (let i = n - 1; i >= 0; i--) {
      const pivot = augmented[i][i];
      for (let k = 2 * n - 1; k >= i; k--) {
        augmented[i][k] /= pivot;
      }
      for (let row = i - 1; row >= 0; row--) {
        const factor = augmented[row][i];
        for (let k = i; k < 2 * n; k++) {
          augmented[row][k] -= factor * augmented[i][k];
        }
      }
    }

    // Extract inverse
    const inverse: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        inverse[i][j] = augmented[i][n + j];
      }
    }

    return inverse;
  }
}
