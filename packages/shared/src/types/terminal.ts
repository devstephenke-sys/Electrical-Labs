/**
 * Terminal type definitions
 * Expanded with electrical roles instead of generic input/output
 */

export enum TerminalRole {
  // Power supply terminals
  LINE_LIVE = 'line_live',           // Live/phase conductor
  LINE_NEUTRAL = 'line_neutral',     // Neutral conductor
  PROTECTIVE_EARTH = 'protective_earth', // PE conductor
  GROUND_REFERENCE = 'ground_reference', // Ground reference

  // Switching device terminals
  COMMON = 'common',                 // Common terminal (C)
  NORMALLY_OPEN = 'normally_open',   // NO terminal
  NORMALLY_CLOSED = 'normally_closed', // NC terminal

  // Protective device terminals
  LINE_IN = 'line_in',               // Line input
  LINE_OUT = 'line_out',             // Line output
  NEUTRAL_IN = 'neutral_in',         // Neutral input
  NEUTRAL_OUT = 'neutral_out',       // Neutral output

  // Load terminals
  LIVE = 'live',                     // Live connection point
  NEUTRAL = 'neutral',               // Neutral connection point
  LOAD_EARTH = 'load_earth',         // Earth connection point for loads

  // Generic
  POSITIVE = 'positive',             // Positive polarity
  NEGATIVE = 'negative',             // Negative polarity
  UNSPECIFIED = 'unspecified'        // Generic terminal
}

export enum ConductorType {
  LIVE = 'live',                   // Phase conductor (brown, black, red)
  NEUTRAL = 'neutral',             // Neutral conductor (blue)
  PROTECTIVE_EARTH = 'protective_earth', // PE conductor (green/yellow)
  CONTROL = 'control',             // Control circuit conductor
  EARTH = 'earth'                  // General earth (green)
}

export interface Terminal {
  id: string;
  nodeId: string | null;           // Connected to circuit node
  role: TerminalRole;              // Electrical role
  position: { x: number; y: number; z?: number }; // 3D-ready
  compatibility: TerminalRole[];   // Allowed connection roles
  ratedCurrent?: number;           // Amps
  ratedVoltage?: number;           // Volts
  conductorType?: ConductorType;   // Required conductor type
}
