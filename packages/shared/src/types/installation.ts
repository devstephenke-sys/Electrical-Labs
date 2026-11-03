/**
 * Installation model types
 * Separate from circuit simulation - represents physical wiring, terminals, and topology
 */

import { Component } from './circuit';
import { ConductorType } from './terminal';

export interface Installation {
  id: string;
  components: InstalledComponent[];
  conductors: Conductor[];
  topology: TopologyGraph;
  jurisdiction: string;          // 'kenya', 'iec', 'nec'
  createdAt: Date;
  updatedAt: Date;
}

export interface InstalledComponent {
  componentId: string;
  component: Component;
  position: { x: number; y: number };
  mountingType?: 'din_rail' | 'panel' | 'surface' | 'flush';
  enclosureId?: string;
}

export interface Conductor {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  type: ConductorType;
  color: string;                  // Conductor color per jurisdiction
  crossSection: number;           // mm²
  length: number;                 // meters
  insulation: string;             // PVC, XLPE, etc.
  rating: ConductorRating;
  path?: Point[];                 // Wire routing path
}

export interface ConductorRating {
  currentCapacity: number;        // Amps
  voltageRating: number;          // Volts
  temperatureRating: number;      // °C
}

export interface Point {
  x: number;
  y: number;
}

export interface TopologyGraph {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

export interface TopologyNode {
  id: string;
  componentId: string;
  terminalId: string;
  type: 'junction' | 'terminal' | 'splice';
}

export interface TopologyEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  conductorId: string;
}

// Installation validation results
export interface InstallationValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  compliance: ComplianceCheck[];
}

export interface ValidationError {
  code: string;
  severity: 'critical' | 'major' | 'minor';
  message: string;
  componentId?: string;
  terminalId?: string;
  conductorId?: string;
  standardRef?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  componentId?: string;
  recommendation?: string;
}

export interface ComplianceCheck {
  standardId: string;
  requirement: string;
  passed: boolean;
  notes?: string;
}
