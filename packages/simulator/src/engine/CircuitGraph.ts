/**
 * Circuit graph builder
 * Parses circuit topology and builds node list for MNA
 */

import { Circuit, Component, Wire, Terminal, TerminalRole } from '@electrical-lab/shared';

export interface CircuitNode {
  id: string;
  components: string[]; // Component IDs connected to this node
  voltage?: number; // Calculated voltage
}

export interface CircuitEdge {
  fromNodeId: string;
  toNodeId: string;
  componentId: string;
  terminalId: string;
}

export class CircuitGraph {
  private nodes: Map<string, CircuitNode> = new Map();
  private edges: CircuitEdge[] = [];
  private groundNodeId: string | null = null;
  private nextNodeId = 0;

  /**
   * Build circuit graph from components and wires
   */
  static fromCircuit(circuit: Circuit): CircuitGraph {
    const graph = new CircuitGraph();
    graph.build(circuit);
    return graph;
  }

  /**
   * Build graph topology
   */
  private build(circuit: Circuit): void {
    // Union-Find structure for node merging
    const parent = new Map<string, string>();

    const find = (id: string): string => {
      if (parent.get(id) === id) return id;
      const root = find(parent.get(id)!);
      parent.set(id, root);
      return root;
    };

    const union = (id1: string, id2: string): void => {
      const root1 = find(id1);
      const root2 = find(id2);
      if (root1 !== root2) {
        parent.set(root1, root2);
      }
    };

    // Initialize each terminal as its own node
    for (const component of circuit.components) {
      for (const terminal of component.terminals) {
        const terminalId = `${component.id}:${terminal.id}`;
        parent.set(terminalId, terminalId);

        // Track ground node
        if (terminal.role === TerminalRole.GROUND_REFERENCE || terminal.role === TerminalRole.PROTECTIVE_EARTH) {
          this.groundNodeId = terminalId;
        }
      }
    }

    // Process wires to merge nodes
    for (const wire of circuit.wires) {
      const fromId = `${wire.fromComponentId}:${wire.fromTerminalId}`;
      const toId = `${wire.toComponentId}:${wire.toTerminalId}`;

      if (parent.has(fromId) && parent.has(toId)) {
        union(fromId, toId);
      }
    }

    // Group terminals by their root node
    const rootToNodeId = new Map<string, string>();
    const terminalToNodeId = new Map<string, string>();

    for (const component of circuit.components) {
      for (const terminal of component.terminals) {
        const terminalId = `${component.id}:${terminal.id}`;
        const root = find(terminalId);

        let nodeId = rootToNodeId.get(root);
        if (!nodeId) {
          nodeId = `node_${this.nextNodeId++}`;
          rootToNodeId.set(root, nodeId);
          this.nodes.set(nodeId, { id: nodeId, components: [] });
        }

        terminalToNodeId.set(terminalId, nodeId);
        this.nodes.get(nodeId)!.components.push(component.id);
      }
    }

    // Update component terminals with node IDs
    for (const component of circuit.components) {
      for (const terminal of component.terminals) {
        const terminalId = `${component.id}:${terminal.id}`;
        terminal.nodeId = terminalToNodeId.get(terminalId) || null;
      }
    }

    // Update ground node ID to the merged node ID
    if (this.groundNodeId) {
      const root = find(this.groundNodeId);
      this.groundNodeId = rootToNodeId.get(root) || null;
    }
  }

  /**
   * Get all nodes
   */
  getNodes(): CircuitNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get ground node ID
   */
  getGroundNodeId(): string | null {
    return this.groundNodeId;
  }

  /**
   * Get number of nodes
   */
  getNodeCount(): number {
    return this.nodes.size;
  }
}
