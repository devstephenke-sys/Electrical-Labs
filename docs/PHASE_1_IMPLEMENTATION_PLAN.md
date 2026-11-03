# Phase 1 Implementation Plan

**Date:** November 3, 2026
**Repository:** https://github.com/devstephenke-sys/Electrical-Labs.git
**Phase:** Phase 1 - Virtual Workshop Foundation
**Focus:** One complete one-way lighting practical with reusable simulation foundation

---

## Executive Summary

Phase 1 will deliver a fully functional web application with a reusable simulation engine and one complete practical electrical installation scenario (one-way lighting with single switch). The phase prioritizes technical correctness, genuine interaction, strong instructional design, and a professional workshop experience over breadth of features.

**Key Principle:** Build one excellent, working practical scenario rather than many incomplete ones. The architecture must make adding the next scenario a matter of creating new scenario data, not rebuilding the application.

---

## 1. Phase 1 Objectives

### 1.1 Primary Goals

1. **Working Simulation Engine** - Implement a proper Modified Nodal Analysis (MNA) solver with source constraints for DC and basic AC circuits
2. **Virtual Workshop Interface** - Build a professional 2D workshop with component palette, wiring workspace, schematic view, and tools
3. **One Complete Scenario** - Deliver a fully functional one-way lighting installation practical with job brief, guidance, safety sequence, and assessment
4. **Virtual Instruments** - Implement a working multimeter with voltage, continuity, and resistance measurements
5. **Safety System** - Implement lockout/tagout, prove dead, and verification sequence as non-compensatory assessment criteria
6. **Assessment Engine** - Evaluate wiring accuracy, safety compliance, instrument usage, and functional verification
7. **Local Persistence** - Use IndexedDB for progress saving (no backend required for Phase 1)
8. **Automated Testing** - Unit tests for simulation engine, E2E tests for full scenario flow

### 1.2 Success Criteria

**Technical:**
- ✅ Simulation engine solves supported circuits correctly (verified against mathematical reference values)
- ✅ MNA solver handles ideal voltage sources with source constraints
- ✅ Short-circuit detection works without crashes
- ✅ Open-circuit conditions handled correctly
- ✅ Virtual multimeter readings derived from actual circuit state
- ✅ Frontend runs locally and production build succeeds
- ✅ All automated tests pass

**User Experience:**
- ✅ Learner can complete one-way lighting scenario end-to-end
- ✅ Job brief, instructions, and schematic are clear
- ✅ Components can be placed, moved, and connected
- ✅ Safety sequence enforces correct procedure
- ✅ Assessment provides meaningful feedback
- ✅ Progress is saved locally

**Quality:**
- ✅ Desktop experience works smoothly
- ✅ Tablet experience is usable
- ✅ Mobile limitations handled appropriately
- ✅ Accessibility considered (WCAG 2.2 AA principles)
- ✅ No critical runtime errors
- ✅ No non-functional main controls

---

## 2. Phase 1 Scope Boundaries

### 2.1 In Scope

**✅ Include:**
- Monorepo structure with pnpm workspaces
- React 18 + TypeScript frontend with Vite
- Zustand state management
- Tailwind CSS styling
- SVG-based 2D workshop interface
- Independent TypeScript simulation engine package
- MNA circuit solver with source constraints
- DC resistive circuits
- Basic single-phase AC steady-state resistive circuits
- Ideal voltage sources, resistors, switches, loads
- Component library: switch, lamp, breaker, terminals, conductors
- One-way lighting scenario with complete job brief
- Safety sequence: isolation, lockout, prove dead, verification
- Virtual multimeter (voltage, continuity, resistance)
- Assessment: wiring accuracy, safety, functional verification
- IndexedDB local persistence
- Unit tests for simulation engine
- E2E tests with Playwright
- Standards/jurisdiction architecture foundation (Kenya profile placeholder)

### 2.2 Out of Scope (Explicitly Exclude)

**❌ Do NOT implement in Phase 1:**
- Full 3D environments
- VR or WebXR
- Advanced three-phase modelling
- Accurate industrial motor electromagnetic simulation
- PLC programming environment
- Solar photovoltaic simulator
- Full electrical CAD system
- Instructor scenario-authoring suite
- Enterprise administration
- Subscription payments
- Complex user permissions
- SCORM and xAPI integrations
- Multi-institution LMS integration
- Advanced cloud infrastructure (Kubernetes, Redis)
- Backend API and PostgreSQL database
- Authentication system
- Multiple scenarios (focus on one polished scenario)
- Advanced fault injection
- Gamification points economy (basic progress tracking only)
- Full standards database (placeholder architecture only)

**Rationale:** These belong to later phases. Phase 1 must deliver one working scenario with a reusable foundation.

---

## 3. Module Architecture

### 3.1 Package Structure

```
electrical-lab/
├── packages/
│   ├── frontend/              # React application
│   │   ├── src/
│   │   │   ├── app/          # App components
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── workshop/     # Workshop-specific components
│   │   │   ├── scenarios/    # Scenario runners
│   │   │   ├── stores/       # Zustand stores
│   │   │   ├── styles/       # Tailwind config
│   │   │   └── main.tsx      # Entry point
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   ├── simulator/             # NEW: Simulation engine package
│   │   ├── src/
│   │   │   ├── engine/       # Core simulation engine
│   │   │   │   ├── CircuitGraph.ts
│   │   │   │   ├── NodalSolver.ts
│   │   │   │   └── MatrixOperations.ts
│   │   │   ├── components/   # Component models
│   │   │   │   ├── ComponentModel.ts
│   │   │   │   ├── Resistor.ts
│   │   │   │   ├── Source.ts
│   │   │   │   ├── Switch.ts
│   │   │   │   └── Load.ts
│   │   │   ├── topology/     # Installation topology
│   │   │   │   ├── TerminalGraph.ts
│   │   │   │   └── ConductorModel.ts
│   │   │   ├── instruments/  # Virtual instruments
│   │   │   │   ├── Multimeter.ts
│   │   │   │   └── MeasurementLogic.ts
│   │   │   ├── validation/   # Circuit validation
│   │   │   │   ├── SafetyChecker.ts
│   │   │   │   ├── ContinuityChecker.ts
│   │   │   │   └── ShortCircuitDetector.ts
│   │   │   ├── safety/       # Safety state machine
│   │   │   │   ├── IsolationSequence.ts
│   │   │   │   └── LockoutSystem.ts
│   │   │   ├── assessment/   # Assessment engine
│   │   │   │   ├── EvaluationEngine.ts
│   │   │   │   └── ScoringRules.ts
│   │   │   ├── standards/    # Standards/jurisdiction
│   │   │   │   ├── StandardsProfile.ts
│   │   │   │   └── KenyaProfile.ts
│   │   │   └── index.ts
│   │   ├── tests/            # Simulation engine tests
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared/               # Shared types and utilities
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── circuit.ts      # EXPANDED
│   │   │   │   ├── component.ts    # NEW
│   │   │   │   ├── terminal.ts     # NEW
│   │   │   │   ├── installation.ts # NEW
│   │   │   │   ├── scenario.ts     # NEW
│   │   │   │   ├── safety.ts       # NEW
│   │   │   │   ├── assessment.ts   # NEW
│   │   │   │   └── standards.ts    # NEW
│   │   │   ├── constants/
│   │   │   │   ├── electrical.ts    # NEW
│   │   │   │   └── kenya.ts        # NEW
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── scenarios/             # NEW: Scenario data package
│       ├── src/
│       │   ├── one-way-lighting/
│       │   │   ├── scenario.json
│       │   │   ├── schematic.svg
│       │   │   ├── materials.json
│       │   │   └── instructions.md
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── docs/
│   ├── PHASE_1_REPOSITORY_AUDIT.md
│   ├── PHASE_1_IMPLEMENTATION_PLAN.md
│   ├── ARCHITECTURE_DECISIONS.md
│   ├── SIMULATION_ENGINE.md
│   ├── SCENARIO_AUTHORING_GUIDE.md
│   └── SAFETY_AND_STANDARDS.md
├── package.json              # Root monorepo config
├── pnpm-workspace.yaml
├── .gitignore
└── .env.example
```

### 3.2 Module Boundaries

**Simulator Package (NEW):**
- Independent TypeScript package
- No React dependencies
- Testable independently with Vitest
- Exports: engine, components, instruments, validation, safety, assessment
- Must work in Node.js (for testing) and browser (for frontend)

**Frontend Package:**
- React 18 + TypeScript
- Depends on: shared types, simulator engine
- Does NOT depend on backend
- Uses Zustand for state management
- Uses IndexedDB for persistence
- Exports: built web application

**Shared Package:**
- TypeScript types only
- No dependencies on React or simulator
- Provides common types for all packages
- Includes electrical constants
- Standards/jurisdiction profiles

**Scenarios Package:**
- Data-only package
- JSON scenario configurations
- SVG schematic diagrams
- Markdown instructions
- Materials lists
- Assessment criteria

**Backend Package:**
- NOT used in Phase 1
- Package.json exists but not installed or built
- Will be implemented in Phase 2+

---

## 4. Data Structures

### 4.1 Expanded Circuit Types (shared/src/types/circuit.ts)

```typescript
// Component categories (NEW)
export enum ComponentCategory {
  SOURCE = 'source',           // Voltage/current sources
  SWITCHING = 'switching',     // Switches, contactors, relays
  PROTECTIVE = 'protective',   // Breakers, fuses, RCDs
  LOAD = 'load',               // Lamps, motors, resistive loads
  CONTROL = 'control',        // Sensors, indicators
  TERMINATION = 'termination'  // Terminal blocks, connectors
}

// Terminal roles (NEW - replaces generic input/output)
export enum TerminalRole {
  // Power supply terminals
  LINE_LIVE = 'line_live',           // Live/phase conductor
  LINE_NEUTRAL = 'line_neutral',     // Neutral conductor
  PROTECTIVE_EARTH = 'protective_earth', // PE conductor
  EARTH = 'earth',                   // Ground reference

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
  EARTH = 'earth',                   // Earth connection point

  // Generic
  POSITIVE = 'positive',             // Positive polarity
  NEGATIVE = 'negative',             // Negative polarity
  UNSPECIFIED = 'unspecified'        // Generic terminal
}

// Terminal with expanded properties
export interface Terminal {
  id: string;
  nodeId: string | null;           // Connected to circuit node
  role: TerminalRole;              // NEW: electrical role
  position: { x: number; y: number; z?: number }; // NEW: 3D-ready
  compatibility: TerminalRole[];   // NEW: allowed connection roles
  ratedCurrent?: number;           // NEW: Amps
  ratedVoltage?: number;           // NEW: Volts
  conductorType?: ConductorType;   // NEW: required conductor type
}

// Conductor types (NEW)
export enum ConductorType {
  LIVE = 'live',                   // Phase conductor (brown, black, red)
  NEUTRAL = 'neutral',             // Neutral conductor (blue)
  PROTECTIVE_EARTH = 'protective_earth', // PE conductor (green/yellow)
  CONTROL = 'control',             // Control circuit conductor
  EARTH = 'earth'                  // General earth (green)
}

// Component with enhanced properties
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

// Component ratings (NEW)
export interface ComponentRatings {
  voltage: number;                 // Volts
  current: number;                 // Amps
  power?: number;                 // Watts
  breakingCapacity?: number;      // Amps (for protective devices)
  shortCircuitRating?: number;    // kA
  insulationClass?: string;       // Class I, II, III
  ipRating?: string;              // IP20, IP44, etc.
}

// Component visual representation (NEW)
export interface ComponentVisual {
  svgPath?: string;               // SVG path for 2D
  width: number;
  height: number;
  terminalPositions: Record<string, { x: number; y: number }>;
  color?: string;
  icon?: string;
}

// Standards compliance (NEW)
export interface StandardsCompliance {
  jurisdiction: string;           // 'kenya', 'iec', 'nec'
  standardIds: string[];          // ['KS 662-1:2018', 'IEC 60364-5-52']
  approved: boolean;
  notes?: string;
}
```

### 4.2 Installation Types (NEW - shared/src/types/installation.ts)

```typescript
/**
 * Installation model - separate from circuit simulation
 * Represents physical wiring, terminals, and topology
 */

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
```

### 4.3 Scenario Types (NEW - shared/src/types/scenario.ts)

```typescript
/**
 * Scenario data structure
 * Defines practical exercises, job briefs, assessment criteria
 */

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

export type ScenarioCategory =
  | 'domestic_lighting'
  | 'domestic_power'
  | 'distribution_board'
  | 'industrial_control'
  | 'motor_control'
  | 'renewable_energy'
  | 'testing_fault_finding';

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
```

### 4.4 Safety Types (NEW - shared/src/types/safety.ts)

```typescript
/**
 * Safety system types
 * Lockout/tagout, isolation, verification sequences
 */

export interface SafetyState {
  isolated: boolean;
  lockoutApplied: boolean;
  dangerTagApplied: boolean;
  testerVerified: boolean;
  conductorsTested: boolean;
  testerReverified: boolean;
  currentStep: number;
  stepsCompleted: SafetyStepCompletion[];
  violations: SafetyViolation[];
}

export interface SafetyStepCompletion {
  stepId: string;
  completed: boolean;
  timestamp: Date;
  correct: boolean;
  notes?: string;
}

export interface SafetyViolation {
  stepId: string;
  violationType: 'skipped' | 'incorrect' | 'out_of_order' | 'incomplete';
  description: string;
  severity: 'critical' | 'major' | 'minor';
  timestamp: Date;
}

export interface LockoutDevice {
  id: string;
  type: 'padlock' | 'hasp' | 'multi_lock';
  applied: boolean;
  position: { x: number; y: number };
  userId?: string;
}

export interface DangerTag {
  id: string;
  message: string;
  applied: boolean;
  position: { x: number; y: number };
  userId?: string;
  timestamp?: Date;
}
```

### 4.5 Assessment Types (NEW - shared/src/types/assessment.ts)

```typescript
/**
 * Assessment engine types
 * Evaluation, scoring, feedback
 */

export interface AssessmentResult {
  scenarioId: string;
  attemptId: string;
  userId?: string;
  timestamp: Date;
  duration: number;               // seconds
  overallScore: number;          // 0-100
  passed: boolean;
  criteriaResults: CriterionResult[];
  safetyScore: number;
  accuracyScore: number;
  efficiencyScore: number;
  violations: AssessmentViolation[];
  feedback: string[];
  reflection: ReflectionResponse[];
}

export interface CriterionResult {
  criterionId: string;
  category: string;
  passed: boolean;
  score: number;
  details: string;
  nonCompensatory: boolean;
}

export interface AssessmentViolation {
  type: 'safety' | 'wiring' | 'procedure';
  severity: 'critical' | 'major' | 'minor';
  description: string;
  timestamp: Date;
  step?: number;
}

export interface ReflectionResponse {
  question: string;
  answer: string;
}

export interface CompetencyLevel {
  level: 'novice' | 'apprentice' | 'technician' | 'expert';
  scenariosCompleted: number;
  averageScore: number;
  safetyCompliance: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: Date;
}
```

### 4.6 Standards Types (NEW - shared/src/types/standards.ts)

```typescript
/**
 * Standards and jurisdiction types
 * Kenya KEBS, IEC, NEC profiles
 */

export interface StandardsProfile {
  jurisdiction: string;
  jurisdictionName: string;
  standards: Standard[];
  conductorColors: ConductorColorScheme;
  wiringConventions: WiringConvention[];
  installationRequirements: InstallationRequirement[];
  testingLimits: TestingLimit[];
  referenceDocuments: ReferenceDocument[];
}

export interface Standard {
  id: string;
  title: string;
  version: string;
  year: number;
  status: 'adopted' | 'draft' | 'withdrawn';
  url?: string;
  applicableSections: string[];
}

export interface ConductorColorScheme {
  live: string[];                // Brown, black, red
  neutral: string;               // Blue
  protectiveEarth: string;        // Green/yellow
  earth: string;                 // Green
  control: string[];             // Orange, yellow, etc.
}

export interface WiringConvention {
  id: string;
  description: string;
  applicable: boolean;
  notes?: string;
}

export interface InstallationRequirement {
  id: string;
  standardId: string;
  requirement: string;
  mandatory: boolean;
  notes?: string;
}

export interface TestingLimit {
  testType: string;
  minimumValue: number;
  maximumValue: number;
  unit: string;
  standardId: string;
}

export interface ReferenceDocument {
  id: string;
  title: string;
  type: 'standard' | 'regulation' | 'code';
  jurisdiction: string;
  url?: string;
}
```

---

## 5. Implementation Sequence

### 5.1 Development Workflow

**Step 1: Repository Audit** ✅ (Completed)
- Document existing implementation
- Identify gaps and issues
- Create audit document

**Step 2: Implementation Plan** ✅ (This document)
- Define module boundaries
- Specify data structures
- Set acceptance criteria

**Step 3: Branch Setup**
- Create feature branch: phase-1/virtual-workshop-foundation
- Do not reset main branch
- Do not force-push

**Step 4: Study Reference Applications**
- EDWartens Electrical Lab
- TPC Training Simulations
- PhET Circuit Construction Kit
- Falstad Circuit Simulator
- Tinkercad Circuits
- Document learnings

**Step 5: Monorepo and Dev Environment**
- Add simulator package
- Add scenarios package
- Configure pnpm workspace
- Add TypeScript configurations
- Add build scripts
- Verify dev server runs

**Step 6: Shared Domain Model**
- Expand circuit types with terminal roles
- Add component categories
- Add installation types
- Add scenario types
- Add safety types
- Add assessment types
- Add standards types
- Add electrical constants
- Add Kenya profile (placeholder)
- Write unit tests for types

**Step 7: Simulation Engine**
- Implement matrix operations (Gaussian elimination)
- Implement circuit graph parser
- Implement MNA solver with source constraints
- Implement component models (resistor, source, switch, load)
- Implement validation (short circuit, open circuit)
- Implement instrument measurement logic
- Write deterministic tests with mathematical reference values
- Verify solver correctness

**Step 8: Virtual Workshop Interface**
- Set up React + Vite + TypeScript
- Create App layout with navigation
- Create component palette
- Create wiring workspace (SVG-based)
- Implement drag-and-drop component placement
- Implement wire routing with snapping
- Add zoom/pan functionality
- Create schematic view
- Create job instructions panel
- Create tools panel
- Connect to simulator engine

**Step 9: One-Way Lighting Scenario**
- Create scenario data (JSON)
- Create schematic SVG
- Create materials list
- Write job instructions
- Define assessment criteria
- Implement scenario runner
- Implement guided mode with highlights
- Implement feedback system

**Step 10: Safety System**
- Implement safety state machine
- Create lockout device interaction
- Create danger tag interaction
- Implement voltage tester
- Implement proving unit
- Implement isolation sequence validation
- Make safety non-compensatory

**Step 11: Virtual Instruments**
- Implement multimeter UI
- Implement voltage measurement
- Implement continuity measurement
- Implement resistance measurement
- Connect to simulation engine
- Add measurement validation

**Step 12: Assessment Engine**
- Implement evaluation logic
- Implement scoring rules
- Implement safety scoring (non-compensatory)
- Implement accuracy scoring
- Implement efficiency scoring
- Generate feedback messages
- Display results

**Step 13: Local Persistence**
- Implement IndexedDB storage
- Save progress locally
- Load saved progress
- Sync on scenario completion

**Step 14: Testing**
- Write unit tests for simulation engine
- Write integration tests for workshop
- Write E2E tests with Playwright
- Test full scenario flow
- Fix defects

**Step 15: Documentation Update**
- Update README.md with actual status
- Update technical architecture
- Add architecture decision records
- Document simulation engine
- Create scenario authoring guide
- Document safety and standards

**Step 16: Deployment and Verification**
- Build production frontend
- Test locally
- Take screenshots
- Document completed features
- Document outstanding limitations
- Prepare for review

### 5.2 Timeline Estimate

| Step | Estimated Time | Dependencies |
|------|---------------|--------------|
| 1. Repository Audit | ✅ Done | None |
| 2. Implementation Plan | ✅ In Progress | Step 1 |
| 3. Branch Setup | 0.5h | Step 2 |
| 4. Study References | 4h | Step 3 |
| 5. Monorepo Setup | 2h | Step 3 |
| 6. Shared Domain Model | 8h | Step 5 |
| 7. Simulation Engine | 24h | Step 6 |
| 8. Workshop Interface | 16h | Step 5, 7 |
| 9. Lighting Scenario | 8h | Step 8 |
| 10. Safety System | 8h | Step 8, 9 |
| 11. Virtual Instruments | 6h | Step 7, 8 |
| 12. Assessment Engine | 6h | Step 9, 10, 11 |
| 13. Local Persistence | 4h | Step 8 |
| 14. Testing | 12h | All above |
| 15. Documentation | 4h | All above |
| 16. Deployment & Verification | 4h | All above |
| **Total** | **~106 hours (~13 days)** | |

**Note:** This is an estimate. Actual time may vary based on complexity and issues encountered.

---

## 6. Acceptance Criteria

### 6.1 Technical Acceptance Criteria

**Simulation Engine:**
- [ ] MNA solver correctly solves DC resistive circuits
- [ ] MNA solver handles ideal voltage sources with source constraints
- [ ] Open circuits detected and handled without crashes
- [ ] Short circuits detected and reported safely
- [ ] Singular matrices handled gracefully
- [ ] AC RMS calculations work for single-phase resistive circuits
- [ ] All unit tests pass (>80% coverage)
- [ ] Solver produces results matching mathematical reference values

**Domain Model:**
- [ ] Terminal roles defined (common, NO, NC, L, N, PE, etc.)
- [ ] Component categories defined (switching, protective, load, source)
- [ ] Connection constraints implemented
- [ ] Installation model separate from circuit model
- [ ] Standards/jurisdiction profile structure exists
- [ ] Kenya profile placeholder created

**Frontend:**
- [ ] React application runs locally with `pnpm --filter frontend dev`
- [ ] Production build succeeds with `pnpm --filter frontend build`
- [ ] Component palette displays available components
- [ ] Components can be dragged and dropped to workspace
- [ ] Components can be moved and positioned
- [ ] Wires can be connected between terminals
- [ ] Wires can be disconnected
- [ ] Workspace supports zoom and pan
- [ ] Schematic view displays circuit diagram
- [ ] Job instructions panel shows scenario information
- [ ] No critical runtime errors in console

**Scenario:**
- [ ] One-way lighting scenario loads successfully
- [ ] Job brief displays client requirements
- [ ] Materials list shows required components
- [ ] Wiring schematic is visible
- [ ] Guidance mode highlights terminals
- [ ] Hints are available
- [ ] Learner can complete the scenario

**Safety:**
- [ ] Isolation sequence is enforced
- [ ] Lockout device can be applied
- [ ] Danger tag can be applied
- [ ] Voltage tester verification works
- [ ] Conductor testing works
- [ ] Skipping safety steps is detected
- [ ] Safety failures are non-compensatory

**Instruments:**
- [ ] Multimeter UI resembles real multimeter
- [ ] Voltage measurement works
- [ ] Continuity measurement works
- [ ] Resistance measurement works (where circuit permits)
- [ ] Readings derived from actual circuit state
- [ ] Invalid measurement setups warned

**Assessment:**
- [ ] Wiring accuracy evaluated
- [ ] Safety compliance evaluated
- [ ] Instrument usage evaluated
- [ ] Functional verification evaluated
- [ ] Overall score calculated
- [ ] Pass/fail determined correctly
- [ ] Feedback messages provided
- [ ] Reflection questions shown

**Persistence:**
- [ ] Progress saved to IndexedDB
- [ ] Progress loaded from IndexedDB
- [ ] Local storage works without backend

**Testing:**
- [ ] Unit tests for simulation engine pass
- [ ] Integration tests for workshop pass
- [ ] E2E tests for full scenario pass
- [ ] Accessibility audit completed (WCAG 2.2 AA considerations)

### 6.2 User Experience Acceptance Criteria

**Completable Flow:**
- [ ] Learner can open the website
- [ ] Learner can find the electrical workshop
- [ ] Learner can open the lighting practical
- [ ] Learner can read the job instructions
- [ ] Learner can complete the guided safety sequence
- [ ] Learner can construct the circuit
- [ ] Learner can operate the virtual instrument
- [ ] Learner can energize the simulation
- [ ] Learner can verify the lamp behavior
- [ ] Learner can submit the practical
- [ ] Learner can review the assessment

**Usability:**
- [ ] Desktop experience works smoothly
- [ ] Tablet experience is usable
- [ ] Mobile limitations handled (e.g., simplified view)
- [ ] Controls are clearly labeled
- [ ] Feedback is clear and helpful
- [ ] No controls appear functional but do nothing

### 6.3 Quality Acceptance Criteria

**Code Quality:**
- [ ] TypeScript strict mode enabled
- [ ] ESLint passes with no warnings
- [ ] Prettier formatting applied
- [ ] Code follows existing conventions
- [ ] No console.log statements in production code
- [ ] No TODO comments for critical features

**Documentation:**
- [ ] README.md updated with actual status
- [ ] Technical architecture reflects implementation
- [ ] Architecture decision records created
- [ ] Simulation engine documented
- [ ] Scenario authoring guide created
- [ ] Safety and standards documented

**Deliverables:**
- [ ] Repository audit document
- [ ] Implementation plan document
- [ ] Working web application
- [ ] Reusable electrical simulation engine
- [ ] Initial component library
- [ ] Complete one-way lighting practical
- [ ] Interactive electrical instruments
- [ ] Safety and assessment logic
- [ ] Automated test results
- [ ] Local development instructions
- [ ] Screenshots of working application
- [ ] List of completed features
- [ ] List of outstanding limitations

---

## 7. Architecture Decisions

### 7.1 Key Decisions (to be documented in ADR format)

**ADR-001: Use 2D for Phase 1, defer 3D to Phase 2**
- Status: Proposed
- Context: Research shows 2D is sufficient for initial scenarios
- Decision: Implement SVG-based 2D workshop for Phase 1
- Consequences: Faster development, better focus on electrical accuracy, 3D deferred

**ADR-002: Use local-first persistence with IndexedDB**
- Status: Proposed
- Context: Phase 1 focuses on single-user scenario completion
- Decision: Use IndexedDB for progress persistence, no backend for Phase 1
- Consequences: Simplified architecture, works offline, backend deferred to Phase 2

**ADR-003: Separate simulation, installation, and assessment engines**
- Status: Proposed
- Context: Audit identified lack of separation
- Decision: Create distinct modules for circuit simulation, installation verification, and assessment
- Consequences: Better separation of concerns, easier testing, more realistic modeling

**ADR-004: Implement proper MNA with source constraints**
- Status: Proposed
- Context: Audit found architecture example insufficient
- Decision: Implement full Modified Nodal Analysis with source constraint handling
- Consequences: More complex solver, but mathematically correct, supports ideal voltage sources

**ADR-005: Safety scoring is non-compensatory**
- Status: Proposed
- Context: Instruction emphasizes safety-first learning
- Decision: Safety failures cannot be compensated by speed or accuracy
- Consequences: Clear safety emphasis, no shortcuts rewarded

**ADR-006: Standards/jurisdiction architecture from start**
- Status: Proposed
- Context: Need Kenya-specific requirements
- Decision: Create standards profile system with Kenya, IEC, NEC profiles
- Consequences: Future-proof for multiple jurisdictions, Kenya focus for initial scenario

**ADR-007: One polished scenario for Phase 1**
- Status: Proposed
- Context: Roadmap proposed 6 scenarios, instruction recommends one
- Decision: Focus on one complete one-way lighting scenario
- Consequences: Higher quality scenario, better foundation for adding more later

### 7.2 Open Questions

1. **Numerical Library:** Should we use a JavaScript linear algebra library (e.g., math.js) or implement basic matrix operations ourselves?
   - Recommendation: Implement basic Gaussian elimination ourselves for Phase 1 (lighter weight, no dependency)

2. **SVG Library:** Should we use an SVG manipulation library or vanilla SVG?
   - Recommendation: Vanilla SVG with React refs for Phase 1 (simpler, less overhead)

3. **IndexedDB Wrapper:** Should we use idb, localforage, or raw IndexedDB?
   - Recommendation: Use idb library (well-maintained, promise-based, type-safe)

4. **Standards Content:** How detailed should Kenya standards be for Phase 1?
   - Recommendation: Create structure and placeholder, fill with actual KS 662 requirements in Phase 2 (need SME review)

---

## 8. Testing Strategy

### 8.1 Simulation Engine Tests

**Unit Tests:**
- Series circuit (two resistors in series)
- Parallel circuit (two resistors in parallel)
- Voltage divider
- Simple switch (open and closed states)
- Voltage source with load
- Open circuit detection
- Short circuit detection
- AC RMS calculation
- Singular matrix handling

**Test Approach:**
- Use mathematical reference values (Ohm's law, Kirchhoff's laws)
- Test with known values: V=12V, R1=100Ω, R2=200Ω, etc.
- Verify results within tolerance (e.g., ±0.1%)
- Test edge cases (0 resistance, infinite resistance)

### 8.2 Workshop Integration Tests

**Test Scenarios:**
- Component placement
- Component movement
- Wire connection
- Wire disconnection
- Component deletion
- Wire deletion
- Zoom and pan
- Schematic update
- State persistence

### 8.3 E2E Tests (Playwright)

**Full Scenario Flow:**
1. Open application
2. Navigate to workshop
3. Select one-way lighting scenario
4. Read job instructions
5. Complete safety sequence
6. Place components
7. Connect wires
8. Use multimeter
9. Energize circuit
10. Verify lamp operation
11. Submit practical
12. Review assessment

### 8.4 Accessibility Tests

**WCAG 2.2 AA Considerations:**
- Keyboard navigation for all controls
- ARIA labels for interactive elements
- Color contrast ratios
- Screen reader compatibility
- Focus indicators
- Alt text for images

---

## 9. Risk Management

### 9.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| MNA solver complexity | Medium | High | Start with simple DC circuits, add AC later, use reference implementations |
| Performance issues | Low | Medium | Optimize matrix operations, limit circuit size for Phase 1 |
| Browser compatibility | Low | Medium | Test on Chrome, Firefox, Safari, Edge; polyfills if needed |
| SVG complexity | Medium | Low | Keep 2D simple, use established patterns |

### 9.2 Schedule Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scope creep | High | High | Strict scope boundaries, defer advanced features |
| Estimation errors | Medium | Medium | Build incrementally, adjust based on progress |
| Learning curve | Low | Medium | Study reference apps early, document decisions |

### 9.3 Quality Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Electrical accuracy issues | Medium | High | SME review, deterministic tests, reference values |
| UX issues | Medium | Medium | User testing with target audience, iterate |
| Accessibility gaps | Low | Medium | Accessibility audit, WCAG compliance |

---

## 10. Success Metrics

### 10.1 Technical Metrics

- Simulation engine test coverage: >80%
- All automated tests pass
- Build time: <30 seconds
- Page load time: <3 seconds
- No critical runtime errors
- Console error-free

### 10.2 User Experience Metrics

- Scenario completion rate: >90% (for testers)
- Average completion time: <15 minutes (for one-way lighting)
- User satisfaction: >4/5 (from feedback)
- Task success rate: 100% (all controls functional)

### 10.3 Quality Metrics

- ESLint: 0 warnings
- TypeScript: 0 errors
- Accessibility: WCAG 2.2 AA compliant
- Code review: All changes reviewed

---

## 11. Post-Phase 1 Next Steps

### 11.2 Immediate Next Steps (Phase 2 Planning)

1. Add second scenario (two-way switching)
2. Expand component library
3. Add basic fault injection
4. Implement backend API
5. Add user authentication
6. Begin 3D investigation

### 11.2 Long-term Vision

- 3D panel visualization
- Multiple scenarios across domains
- Advanced fault finding
- LMS integration
- Enterprise features
- VR/WebXR support

---

## 12. Conclusion

Phase 1 focuses on delivering one complete, polished practical scenario with a reusable simulation foundation. The implementation plan defines clear module boundaries, data structures, and acceptance criteria. By following this plan, the team will deliver a working electrical lab simulation that can be extended with additional scenarios in future phases.

**Key Principles:**
- Technical correctness over feature breadth
- One excellent scenario over many incomplete ones
- Reusable architecture for future scenarios
- Safety-first, non-compensatory assessment
- Professional workshop experience

**Success Definition:**
A learner can complete the one-way lighting scenario end-to-end, receiving meaningful feedback on their safety procedures, wiring accuracy, and functional verification. The simulation engine is mathematically correct and reusable for future scenarios. The code is well-tested, documented, and ready for extension.

---

**Implementation Plan Completed:** November 3, 2026
**Status:** Ready for Phase 1 implementation
**Next Step:** Create feature branch and begin implementation
