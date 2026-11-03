/**
 * Circuit simulation types
 */

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
  | 'breaker';

export interface Component {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  parameters: ComponentParameters;
  terminals: Terminal[];
  state: ComponentState;
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

export interface Terminal {
  id: string;
  nodeId: string | null;
  position: { x: number; y: number };
  type: 'input' | 'output' | 'neutral' | 'ground';
}

export interface Wire {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  color?: string;
  gauge?: number;
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
