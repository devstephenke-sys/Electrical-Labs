/**
 * Circuit simulation types
 * Expanded with component categories, terminal roles, and enhanced properties
 */

import { ComponentCategory, ComponentType, ComponentRatings, ComponentVisual, StandardsCompliance } from './component';
import { Terminal, TerminalRole, ConductorType } from './terminal';

export interface Component {
  id: string;
  type: ComponentType;
  category: ComponentCategory;     // NEW
  name: string;                    // NEW: display name
  description?: string;            // NEW: functional description
  position: { x: number; y: number };
  rotation?: number;               // NEW: degrees
  parameters: ComponentParameters;
  terminals: Terminal[];
  state: ComponentState;
  ratings?: ComponentRatings;      // NEW
  visual?: ComponentVisual;       // NEW
  standards?: StandardsCompliance; // NEW
}

export interface ComponentParameters {
  resistance?: number; // Ohms
  capacitance?: number; // Farads
  inductance?: number; // Henrys
  voltage?: number; // Volts
  frequency?: number; // Hz
  maxCurrent?: number; // Amps
  powerRating?: number; // Watts
}

export interface ComponentState {
  voltage: number; // Volts across component
  current: number; // Amps through component
  power: number; // Watts
  isOn: boolean; // For switches, relays
  isOpen: boolean; // For switches, breakers
}

export interface Wire {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  color?: string;
  gauge?: number;
  type?: ConductorType;           // NEW: conductor type
}

export interface Circuit {
  components: Component[];
  wires: Wire[];
}

export interface SimulationResults {
  voltages: Record<string, number>; // nodeId -> voltage
  currents: Record<string, number>; // componentId -> current
  power: Record<string, number>; // componentId -> power
  timestamp: number;
}
