/**
 * Component type definitions
 * Expanded to support installation work with terminal roles and categories
 */

export enum ComponentCategory {
  SOURCE = 'source',           // Voltage/current sources
  SWITCHING = 'switching',     // Switches, contactors, relays
  PROTECTIVE = 'protective',   // Breakers, fuses, RCDs
  LOAD = 'load',               // Lamps, motors, resistive loads
  CONTROL = 'control',        // Sensors, indicators
  TERMINATION = 'termination'  // Terminal blocks, connectors
}

export type ComponentType =
  | 'resistor'
  | 'capacitor'
  | 'inductor'
  | 'dc_voltage_source'
  | 'ac_voltage_source'
  | 'current_source'
  | 'switch_spst'
  | 'switch_spdt'
  | 'light_bulb'
  | 'led'
  | 'ground'
  | 'contactor'
  | 'relay'
  | 'motor'
  | 'breaker'
  | 'mcb'
  | 'rcd'
  | 'fuse'
  | 'terminal_block'
  | 'lamp_holder';

export interface ComponentRatings {
  voltage: number;                 // Volts
  current: number;                 // Amps
  power?: number;                 // Watts
  breakingCapacity?: number;      // Amps (for protective devices)
  shortCircuitRating?: number;    // kA
  insulationClass?: string;       // Class I, II, III
  ipRating?: string;              // IP20, IP44, etc.
}

export interface ComponentVisual {
  svgPath?: string;               // SVG path for 2D
  width: number;
  height: number;
  terminalPositions: Record<string, { x: number; y: number }>;
  color?: string;
  icon?: string;
}

export interface StandardsCompliance {
  jurisdiction: string;           // 'kenya', 'iec', 'nec'
  standardIds: string[];          // ['KS 662-1:2018', 'IEC 60364-5-52']
  approved: boolean;
  notes?: string;
}
