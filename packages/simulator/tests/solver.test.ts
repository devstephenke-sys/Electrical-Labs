/**
 * Tests for Nodal Solver
 */

import { describe, it, expect } from 'vitest';
import { NodalSolver } from '../src/engine/NodalSolver';
import { Circuit, Component, ComponentCategory, TerminalRole } from '@electrical-lab/shared';

describe('NodalSolver', () => {
  function createResistor(id: string, resistance: number): Component {
    return {
      id,
      type: 'resistor',
      category: ComponentCategory.LOAD,
      name: `Resistor ${id}`,
      position: { x: 0, y: 0 },
      parameters: { resistance },
      terminals: [
        { id: 't1', nodeId: null, role: TerminalRole.UNSPECIFIED, position: { x: 0, y: 0 }, compatibility: [] },
        { id: 't2', nodeId: null, role: TerminalRole.UNSPECIFIED, position: { x: 0, y: 0 }, compatibility: [] },
      ],
      state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: false },
    };
  }

  function createVoltageSource(id: string, voltage: number): Component {
    return {
      id,
      type: 'dc_voltage_source',
      category: ComponentCategory.SOURCE,
      name: `Source ${id}`,
      position: { x: 0, y: 0 },
      parameters: { voltage },
      terminals: [
        { id: 't1', nodeId: null, role: TerminalRole.POSITIVE, position: { x: 0, y: 0 }, compatibility: [] },
        { id: 't2', nodeId: null, role: TerminalRole.GROUND_REFERENCE, position: { x: 0, y: 0 }, compatibility: [] },
      ],
      state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: false },
    };
  }

  function createSwitch(id: string, isOpen: boolean): Component {
    return {
      id,
      type: 'switch_spst',
      category: ComponentCategory.SWITCHING,
      name: `Switch ${id}`,
      position: { x: 0, y: 0 },
      parameters: {},
      terminals: [
        { id: 't1', nodeId: null, role: TerminalRole.COMMON, position: { x: 0, y: 0 }, compatibility: [] },
        { id: 't2', nodeId: null, role: TerminalRole.NORMALLY_OPEN, position: { x: 0, y: 0 }, compatibility: [] },
      ],
      state: { voltage: 0, current: 0, power: 0, isOn: !isOpen, isOpen },
    };
  }

  describe('simple series circuit', () => {
    it('should solve a simple series circuit with voltage source and resistor', () => {
      const circuit: Circuit = {
        components: [
          createVoltageSource('V1', 12),
          createResistor('R1', 100),
        ],
        wires: [
          {
            id: 'w1',
            fromComponentId: 'V1',
            fromTerminalId: 't1',
            toComponentId: 'R1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w2',
            fromComponentId: 'R1',
            fromTerminalId: 't2',
            toComponentId: 'V1',
            toTerminalId: 't2',
            type: 'neutral',
          },
        ],
      };

      const solver = new NodalSolver(circuit);
      const solution = solver.solve();

      expect(solution.converged).toBe(true);

      // Current should be V/R = 12/100 = 0.12 A
      const current = solution.componentCurrents.get('R1');
      expect(current).toBeCloseTo(0.12, 2);

      // Power should be V*I = 12*0.12 = 1.44 W
      const power = solution.componentPowers.get('R1');
      expect(power).toBeCloseTo(1.44, 2);
    });
  });

  describe('parallel circuit', () => {
    it('should solve a parallel circuit with two resistors', () => {
      const circuit: Circuit = {
        components: [
          createVoltageSource('V1', 12),
          createResistor('R1', 100),
          createResistor('R2', 200),
        ],
        wires: [
          {
            id: 'w1',
            fromComponentId: 'V1',
            fromTerminalId: 't1',
            toComponentId: 'R1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w2',
            fromComponentId: 'V1',
            fromTerminalId: 't1',
            toComponentId: 'R2',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w3',
            fromComponentId: 'R1',
            fromTerminalId: 't2',
            toComponentId: 'V1',
            toTerminalId: 't2',
            type: 'neutral',
          },
          {
            id: 'w4',
            fromComponentId: 'R2',
            fromTerminalId: 't2',
            toComponentId: 'V1',
            toTerminalId: 't2',
            type: 'neutral',
          },
        ],
      };

      const solver = new NodalSolver(circuit);
      const solution = solver.solve();

      expect(solution.converged).toBe(true);

      // R1 current = 12/100 = 0.12 A
      const current1 = solution.componentCurrents.get('R1');
      expect(current1).toBeCloseTo(0.12, 2);

      // R2 current = 12/200 = 0.06 A
      const current2 = solution.componentCurrents.get('R2');
      expect(current2).toBeCloseTo(0.06, 2);
    });
  });

  describe('switch states', () => {
    it('should handle open switch (no current)', () => {
      const circuit: Circuit = {
        components: [
          createVoltageSource('V1', 12),
          createResistor('R1', 100),
          createSwitch('S1', true), // Open
        ],
        wires: [
          {
            id: 'w1',
            fromComponentId: 'V1',
            fromTerminalId: 't1',
            toComponentId: 'S1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w2',
            fromComponentId: 'S1',
            fromTerminalId: 't2',
            toComponentId: 'R1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w3',
            fromComponentId: 'R1',
            fromTerminalId: 't2',
            toComponentId: 'V1',
            toTerminalId: 't2',
            type: 'neutral',
          },
        ],
      };

      const solver = new NodalSolver(circuit);
      const solution = solver.solve();

      expect(solution.converged).toBe(true);

      // No current through resistor with open switch
      const current = solution.componentCurrents.get('R1');
      expect(Math.abs(current || 0)).toBeLessThan(0.01);
    });

    it('should handle closed switch (current flows)', () => {
      const circuit: Circuit = {
        components: [
          createVoltageSource('V1', 12),
          createResistor('R1', 100),
          createSwitch('S1', false), // Closed
        ],
        wires: [
          {
            id: 'w1',
            fromComponentId: 'V1',
            fromTerminalId: 't1',
            toComponentId: 'S1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w2',
            fromComponentId: 'S1',
            fromTerminalId: 't2',
            toComponentId: 'R1',
            toTerminalId: 't1',
            type: 'live',
          },
          {
            id: 'w3',
            fromComponentId: 'R1',
            fromTerminalId: 't2',
            toComponentId: 'V1',
            toTerminalId: 't2',
            type: 'neutral',
          },
        ],
      };

      const solver = new NodalSolver(circuit);
      const solution = solver.solve();

      expect(solution.converged).toBe(true);

      // Current should flow (approximately 0.12 A considering switch resistance)
      const current = solution.componentCurrents.get('R1');
      expect(current).toBeGreaterThan(0.1);
    });
  });
});
