/**
 * Electrical Lab Simulation Engine
 * Main entry point for the simulation package
 */

export { MatrixOperations } from './engine/MatrixOperations';
export { CircuitGraph, CircuitNode, CircuitEdge } from './engine/CircuitGraph';
export { NodalSolver, Solution } from './engine/NodalSolver';

// Re-export shared types for convenience
export * from '@electrical-lab/shared';
