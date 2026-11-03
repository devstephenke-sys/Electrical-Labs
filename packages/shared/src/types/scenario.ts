/**
 * Scenario data structure
 * Defines practical exercises, job briefs, assessment criteria
 */

import { Component } from './circuit';
import { ConductorType } from './terminal';
import { TopologyGraph } from './installation';

export type ScenarioCategory =
  | 'domestic_lighting'
  | 'domestic_power'
  | 'distribution_board'
  | 'industrial_control'
  | 'motor_control'
  | 'renewable_energy'
  | 'testing_fault_finding';

export interface Scenario {
  id: string;
  version: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;      // minutes
  learningObjectives: string[];
  prerequisites: string[];
  jurisdiction: string;           // 'kenya', 'iec', 'nec'

  // Job brief
  jobBrief: JobBrief;

  // Materials and tools
  materials: Material[];
  tools: Tool[];

  // Circuit configuration
  circuitConfig: CircuitConfiguration;

  // Installation requirements
  installationRequirements: InstallationRequirements;

  // Safety procedures
  safetyProcedures: SafetyProcedure[];

  // Instructions
  instructions: ScenarioInstructions;

  // Assessment
  assessment: AssessmentCriteria;

  // Feedback
  feedback: FeedbackConfiguration;

  // Standards reference
  standardsReference: StandardsReference;

  metadata: ScenarioMetadata;
}

export interface JobBrief {
  title: string;
  clientBrief: string;
  location: string;
  jobType: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  specifications: string[];
  constraints: string[];
  expectedResults: string[];
}

export interface Material {
  id: string;
  name: string;
  type: string;
  quantity: number;
  specifications: string;
  image?: string;
  componentId?: string;           // Reference to component library
}

export interface Tool {
  id: string;
  name: string;
  type: string;
  specifications: string;
  image?: string;
}

export interface CircuitConfiguration {
  supply: SupplyCharacteristics;
  protection: ProtectionDevice;
  components: ComponentConfig[];
  expectedTopology: TopologyGraph;
}

export interface SupplyCharacteristics {
  type: 'single_phase' | 'three_phase';
  voltage: number;                // Volts
  frequency: number;              // Hz
  phases: number;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT' | 'IT';
}

export interface ProtectionDevice {
  type: 'mcb' | 'rcd' | 'fuse' | 'mccb';
  rating: number;                 // Amps
  breakingCapacity: number;      // kA
  characteristics: 'B' | 'C' | 'D';
}

export interface ComponentConfig {
  componentId: string;
  position: { x: number; y: number };
  initialConnections: ConnectionConfig[];
}

export interface ConnectionConfig {
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  conductorType: ConductorType;
}

export interface InstallationRequirements {
  conductorColors: Record<ConductorType, string>;
  minimumCrossSection: Record<ConductorType, number>;
  terminalIdentification: boolean;
  cableSupport: boolean;
  labeling: boolean;
}

export interface SafetyProcedure {
  id: string;
  sequence: SafetyStep[];
  requiredTools: string[];
  nonCompensatory: boolean;       // If true, failure cannot be compensated
}

export interface SafetyStep {
  id: string;
  description: string;
  action: SafetyAction;
  verification: SafetyVerification;
  order: number;
}

export type SafetyAction =
  | 'identify_circuit'
  | 'isolate_supply'
  | 'apply_lockout'
  | 'apply_danger_tag'
  | 'verify_tester'
  | 'test_conductors'
  | 'reverify_tester'
  | 'proceed_with_work';

export interface SafetyVerification {
  expectedState: string;
  measurementPoint: string;
  instrument: string;
  tolerance?: number;
}

export interface ScenarioInstructions {
  stages: InstructionStage[];
}

export interface InstructionStage {
  id: string;
  title: string;
  type: 'prepare' | 'demonstrate' | 'guided' | 'independent' | 'reflect';
  content: string;
  highlights?: ComponentHighlight[];
  hints?: string[];
}

export interface ComponentHighlight {
  componentId: string;
  terminalId?: string;
  label: string;
  color: string;
}

export interface AssessmentCriteria {
  criteria: AssessmentCriterion[];
  scoring: ScoringRules;
  passingScore: number;
}

export interface AssessmentCriterion {
  id: string;
  category: 'safety' | 'wiring' | 'testing' | 'functionality';
  description: string;
  weight: number;
  nonCompensatory: boolean;
  checks: AssessmentCheck[];
}

export interface AssessmentCheck {
  type: 'circuit_complete' | 'connection_correct' | 'safety_procedure' | 'instrument_usage';
  target: string;
  expected: any;
  tolerance?: number;
}

export interface ScoringRules {
  safetyWeight: number;           // Percentage weight for safety
  accuracyWeight: number;         // Percentage weight for wiring accuracy
  efficiencyWeight: number;      // Percentage weight for time/steps
  speedCompensation: boolean;     // If false, speed cannot compensate for errors
}

export interface FeedbackConfiguration {
  immediateFeedback: boolean;
  showHints: boolean;
  showErrorExplanation: boolean;
  showCorrectAnswer: boolean;
  reflectionQuestions: string[];
}

export interface StandardsReference {
  primary: string[];
  secondary: string[];
  notes: string;
}

export interface ScenarioMetadata {
  author: string;
  createdAt: Date;
  updatedAt: Date;
  technicalReview: boolean;
  smeApproval: boolean;
  version: string;
}
