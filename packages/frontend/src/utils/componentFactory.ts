import { Component, ComponentCategory, TerminalRole } from '@electrical-lab/shared';

export function createComponent(
  type: string,
  x: number,
  y: number
): Component {
  const id = `${type}_${Date.now()}`;
  
  switch (type) {
    case 'voltage_source':
      return {
        id,
        type: 'dc_voltage_source',
        category: ComponentCategory.SOURCE,
        name: 'Voltage Source',
        position: { x, y },
        parameters: { voltage: 240 },
        terminals: [
          {
            id: `${id}_t1`,
            nodeId: null,
            role: TerminalRole.POSITIVE,
            position: { x: x - 20, y },
            compatibility: [TerminalRole.LIVE, TerminalRole.POSITIVE],
          },
          {
            id: `${id}_t2`,
            nodeId: null,
            role: TerminalRole.GROUND_REFERENCE,
            position: { x: x + 20, y },
            compatibility: [TerminalRole.NEGATIVE, TerminalRole.GROUND_REFERENCE],
          },
        ],
        state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: false },
      };

    case 'resistor':
      return {
        id,
        type: 'resistor',
        category: ComponentCategory.LOAD,
        name: 'Resistor',
        position: { x, y },
        parameters: { resistance: 100 },
        terminals: [
          {
            id: `${id}_t1`,
            nodeId: null,
            role: TerminalRole.UNSPECIFIED,
            position: { x: x - 25, y },
            compatibility: [TerminalRole.UNSPECIFIED],
          },
          {
            id: `${id}_t2`,
            nodeId: null,
            role: TerminalRole.UNSPECIFIED,
            position: { x: x + 25, y },
            compatibility: [TerminalRole.UNSPECIFIED],
          },
        ],
        state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: false },
      };

    case 'switch':
      return {
        id,
        type: 'switch_spst',
        category: ComponentCategory.SWITCHING,
        name: 'Switch',
        position: { x, y },
        parameters: {},
        terminals: [
          {
            id: `${id}_t1`,
            nodeId: null,
            role: TerminalRole.COMMON,
            position: { x: x - 20, y },
            compatibility: [TerminalRole.COMMON, TerminalRole.LIVE],
          },
          {
            id: `${id}_t2`,
            nodeId: null,
            role: TerminalRole.NORMALLY_OPEN,
            position: { x: x + 20, y },
            compatibility: [TerminalRole.NORMALLY_OPEN, TerminalRole.LIVE],
          },
        ],
        state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: true },
      };

    case 'light_bulb':
      return {
        id,
        type: 'light_bulb',
        category: ComponentCategory.LOAD,
        name: 'Light Bulb',
        position: { x, y },
        parameters: { resistance: 400 }, // 60W at 240V = 960Ω, use 400 for brightness
        terminals: [
          {
            id: `${id}_t1`,
            nodeId: null,
            role: TerminalRole.LIVE,
            position: { x: x - 20, y },
            compatibility: [TerminalRole.LIVE],
          },
          {
            id: `${id}_t2`,
            nodeId: null,
            role: TerminalRole.NEUTRAL,
            position: { x: x + 20, y },
            compatibility: [TerminalRole.NEUTRAL],
          },
        ],
        state: { voltage: 0, current: 0, power: 0, isOn: false, isOpen: false },
      };

    default:
      throw new Error(`Unknown component type: ${type}`);
  }
}
