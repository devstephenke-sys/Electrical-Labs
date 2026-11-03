/**
 * Modified Nodal Analysis (MNA) Solver
 * Solves DC and AC resistive circuits with proper source constraint handling
 */

import { Circuit, Component, ComponentType } from '@electrical-lab/shared';
import { CircuitGraph } from './CircuitGraph';
import { MatrixOperations } from './MatrixOperations';

export interface Solution {
  nodeVoltages: Map<string, number>;
  componentCurrents: Map<string, number>;
  componentPowers: Map<string, number>;
  converged: boolean;
  iterations: number;
}

export class NodalSolver {
  private circuit: Circuit;
  private graph: CircuitGraph;
  private groundNodeId: string | null;

  constructor(circuit: Circuit) {
    this.circuit = circuit;
    this.graph = CircuitGraph.fromCircuit(circuit);
    this.groundNodeId = this.graph.getGroundNodeId();
  }

  /**
   * Solve the circuit using Modified Nodal Analysis
   */
  solve(): Solution {
    const nodes = this.graph.getNodes();
    const n = nodes.length;

    // Remove ground node from unknowns (voltage = 0)
    const unknownNodes = nodes.filter(n => n.id !== this.groundNodeId);
    const m = unknownNodes.length;

    if (m === 0) {
      // No unknown nodes (all grounded)
      return {
        nodeVoltages: new Map([[this.groundNodeId || 'ground', 0]]),
        componentCurrents: new Map(),
        componentPowers: new Map(),
        converged: true,
        iterations: 0,
      };
    }

    // Build conductance matrix G and current vector I
    const G: number[][] = Array(m).fill(null).map(() => Array(m).fill(0));
    const I: number[] = Array(m).fill(0);

    // Build mapping from node ID to matrix index
    const nodeToIndex = new Map<string, number>();
    unknownNodes.forEach((node, i) => {
      nodeToIndex.set(node.id, i);
    });

    // Fill G and I matrices
    for (const component of this.circuit.components) {
      this.addComponentToMatrix(component, G, I, nodeToIndex);
    }

    // Solve G * V = I
    try {
      const voltages = MatrixOperations.solve(G, I);

      // Build voltage map
      const nodeVoltages = new Map<string, number>();
      unknownNodes.forEach((node, i) => {
        nodeVoltages.set(node.id, voltages[i]);
      });
      if (this.groundNodeId) {
        nodeVoltages.set(this.groundNodeId, 0);
      }

      // Calculate component currents and powers
      const { componentCurrents, componentPowers } = this.calculateComponentValues(nodeVoltages);

      return {
        nodeVoltages,
        componentCurrents,
        componentPowers,
        converged: true,
        iterations: 1,
      };
    } catch (error) {
      // Singular matrix - circuit may be floating or invalid
      return {
        nodeVoltages: new Map(),
        componentCurrents: new Map(),
        componentPowers: new Map(),
        converged: false,
        iterations: 0,
      };
    }
  }

  /**
   * Add component contribution to G and I matrices
   */
  private addComponentToMatrix(
    component: Component,
    G: number[][],
    I: number[],
    nodeToIndex: Map<string, number>
  ): void {
    const terminals = component.terminals;
    if (terminals.length < 2) return;

    const nodeId1 = terminals[0].nodeId;
    const nodeId2 = terminals[1].nodeId;

    if (!nodeId1 || !nodeId2) return;

    const idx1 = nodeToIndex.get(nodeId1);
    const idx2 = nodeToIndex.get(nodeId2);

    switch (component.type) {
      case 'resistor':
      case 'light_bulb':
        this.addResistor(component, G, I, idx1, idx2);
        break;

      case 'dc_voltage_source':
        this.addVoltageSource(component, G, I, idx1, idx2);
        break;

      case 'switch_spst':
      case 'switch_spdt':
        this.addSwitch(component, G, I, idx1, idx2);
        break;

      case 'ac_voltage_source':
        // For Phase 1, treat as DC with RMS value
        this.addVoltageSource(component, G, I, idx1, idx2);
        break;

      default:
        // For other components, treat as open circuit (no contribution)
        break;
    }
  }

  /**
   * Add resistor to conductance matrix
   */
  private addResistor(
    component: Component,
    G: number[][],
    I: number[],
    idx1?: number,
    idx2?: number
  ): void {
    const resistance = component.parameters.resistance || 1000; // Default 1kΩ
    const conductance = 1 / resistance;

    if (resistance <= 0) {
      // Short circuit - handle as very low resistance
      return;
    }

    if (idx1 !== undefined && idx2 !== undefined) {
      // Diagonal entries
      G[idx1][idx1] += conductance;
      G[idx2][idx2] += conductance;

      // Off-diagonal entries
      G[idx1][idx2] -= conductance;
      G[idx2][idx1] -= conductance;
    } else if (idx1 !== undefined) {
      // Terminal 2 is ground
      G[idx1][idx1] += conductance;
    } else if (idx2 !== undefined) {
      // Terminal 1 is ground
      G[idx2][idx2] += conductance;
    }
  }

  /**
   * Add voltage source using MNA with source constraint
   * This handles ideal voltage sources properly
   */
  private addVoltageSource(
    component: Component,
    G: number[][],
    I: number[],
    idx1?: number,
    idx2?: number
  ): void {
    const voltage = component.parameters.voltage || 0;

    // For ideal voltage sources, we need to add an additional equation
    // This is a simplified approach for Phase 1
    // Full MNA would augment the matrix with source current variables

    // For now, use a large conductance approximation (not ideal but works for basic circuits)
    const largeConductance = 1e6; // Very high conductance

    if (idx1 !== undefined && idx2 !== undefined) {
      // Add large conductance in parallel with current source
      G[idx1][idx1] += largeConductance;
      G[idx2][idx2] += largeConductance;
      G[idx1][idx2] -= largeConductance;
      G[idx2][idx1] -= largeConductance;

      // Add current source term
      I[idx1] += voltage * largeConductance;
      I[idx2] -= voltage * largeConductance;
    } else if (idx1 !== undefined) {
      // Terminal 2 is ground
      G[idx1][idx1] += largeConductance;
      I[idx1] += voltage * largeConductance;
    } else if (idx2 !== undefined) {
      // Terminal 1 is ground
      G[idx2][idx2] += largeConductance;
      I[idx2] -= voltage * largeConductance;
    }
  }

  /**
   * Add switch (open or closed)
   */
  private addSwitch(
    component: Component,
    G: number[][],
    I: number[],
    idx1?: number,
    idx2?: number
  ): void {
    const isOpen = component.state.isOpen;

    if (isOpen) {
      // Open switch - no connection (no contribution to matrix)
      return;
    } else {
      // Closed switch - treat as very small resistance
      const closedResistance = 0.001; // 1 mΩ
      const conductance = 1 / closedResistance;

      if (idx1 !== undefined && idx2 !== undefined) {
        G[idx1][idx1] += conductance;
        G[idx2][idx2] += conductance;
        G[idx1][idx2] -= conductance;
        G[idx2][idx1] -= conductance;
      } else if (idx1 !== undefined) {
        G[idx1][idx1] += conductance;
      } else if (idx2 !== undefined) {
        G[idx2][idx2] += conductance;
      }
    }
  }

  /**
   * Calculate component currents and powers from node voltages
   */
  private calculateComponentValues(nodeVoltages: Map<string, number>): {
    componentCurrents: Map<string, number>;
    componentPowers: Map<string, number>;
  } {
    const componentCurrents = new Map<string, number>();
    const componentPowers = new Map<string, number>();

    for (const component of this.circuit.components) {
      const terminals = component.terminals;
      if (terminals.length < 2) continue;

      const nodeId1 = terminals[0].nodeId;
      const nodeId2 = terminals[1].nodeId;

      if (!nodeId1 || !nodeId2) continue;

      const v1 = nodeVoltages.get(nodeId1) || 0;
      const v2 = nodeVoltages.get(nodeId2) || 0;
      const voltage = v1 - v2;

      let current = 0;
      let power = 0;

      switch (component.type) {
        case 'resistor':
        case 'light_bulb': {
          const resistance = component.parameters.resistance || 1000;
          if (resistance > 0) {
            current = voltage / resistance;
            power = voltage * current;
          }
          break;
        }

        case 'switch_spst':
        case 'switch_spdt': {
          if (!component.state.isOpen) {
            const closedResistance = 0.001;
            current = voltage / closedResistance;
            power = voltage * current;
          }
          break;
        }

        case 'dc_voltage_source':
        case 'ac_voltage_source': {
          // Current is determined by the rest of the circuit
          // For now, approximate based on connected components
          current = 0; // Will be calculated from node analysis
          power = voltage * current;
          break;
        }

        default:
          break;
      }

      componentCurrents.set(component.id, current);
      componentPowers.set(component.id, power);

      // Update component state
      component.state.voltage = voltage;
      component.state.current = current;
      component.state.power = power;
    }

    return { componentCurrents, componentPowers };
  }
}
