import { Scenario, ScenarioCategory } from '@electrical-lab/shared';

/**
 * One-Way Lighting Scenario
 * Install and test a single lighting point controlled by a one-way switch
 */
export const oneWayLightingScenario: Scenario = {
  id: 'one-way-lighting-001',
  version: '1.0.0',
  title: 'One-Way Lighting Installation',
  description: 'Install a single lighting point controlled by a one-way switch',
  category: 'domestic_lighting' as ScenarioCategory,
  difficulty: 'beginner',
  estimatedDuration: 15,
  learningObjectives: [
    'Understand basic circuit topology for lighting',
    'Identify components and their functions',
    'Connect line conductor through protective device',
    'Switch the line conductor (not neutral)',
    'Complete the circuit correctly',
    'Test the installation with a multimeter',
    'Verify lamp operation',
  ],
  prerequisites: [
    'Basic electrical safety knowledge',
    'Understanding of live, neutral, and protective earth conductors',
  ],
  jurisdiction: 'kenya',

  jobBrief: {
    title: 'Install Single Lighting Point',
    clientBrief: 'A client requires a single lighting point controlled by a one-way switch in a room.',
    location: 'Domestic residence - Living Room',
    jobType: 'New Installation',
    urgency: 'routine',
    specifications: [
      '240V single-phase supply',
      '60W lamp holder',
      '10A MCB protection',
      'Standard one-way switch',
      'Class I equipment (earthed)',
    ],
    constraints: [
      'Follow Kenya wiring color code',
      'Use 1.5mm² conductors for lighting',
      'Ensure proper earthing',
      'Complete before energizing',
    ],
    expectedResults: [
      'Lamp illuminates when switch is closed',
      'Lamp is off when switch is open',
      'No voltage on lamp when switch is open',
      'Continuity between live and switch common',
      'Correct terminal connections',
    ],
  },

  materials: [
    {
      id: 'm1',
      name: 'MCB 10A',
      type: 'protective-device',
      quantity: 1,
      specifications: '10A Type B, 6kA breaking capacity',
      componentId: 'breaker',
    },
    {
      id: 'm2',
      name: 'One-Way Switch',
      type: 'switching-device',
      quantity: 1,
      specifications: '10A 250V, 2-way terminal',
      componentId: 'switch_spst',
    },
    {
      id: 'm3',
      name: 'Lamp Holder',
      type: 'load',
      quantity: 1,
      specifications: 'E27 screw type, Class I',
      componentId: 'light_bulb',
    },
    {
      id: 'm4',
      name: 'Lamp',
      type: 'load',
      quantity: 1,
      specifications: '60W E27 bulb',
    },
    {
      id: 'm5',
      name: 'Terminal Block',
      type: 'termination',
      quantity: 1,
      specifications: '3-way, 15A',
      componentId: 'terminal_block',
    },
  ],

  tools: [
    {
      id: 't1',
      name: 'Multimeter',
      type: 'measurement',
      specifications: 'Digital multimeter with voltage, continuity, resistance modes',
    },
    {
      id: 't2',
      name: 'Screwdriver Set',
      type: 'tool',
      specifications: 'VDE insulated, 1000V rated',
    },
    {
      id: 't3',
      name: 'Wire Strippers',
      type: 'tool',
      specifications: 'For 0.5-6mm² conductors',
    },
  ],

  circuitConfig: {
    supply: {
      type: 'single_phase',
      voltage: 240,
      frequency: 50,
      phases: 1,
      earthingSystem: 'TN-S',
    },
    protection: {
      type: 'mcb',
      rating: 10,
      breakingCapacity: 6,
      characteristics: 'B',
    },
    components: [],
    expectedTopology: {
      nodes: [],
      edges: [],
    },
  },

  installationRequirements: {
    conductorColors: {
      live: 'brown',
      neutral: 'blue',
      protective_earth: 'green-yellow',
      control: 'orange',
      earth: 'green',
    },
    minimumCrossSection: {
      live: 1.5,
      neutral: 1.5,
      protective_earth: 1.5,
      control: 1.5,
      earth: 1.5,
    },
    terminalIdentification: true,
    cableSupport: true,
    labeling: false,
  },

  safetyProcedures: [
    {
      id: 'sp1',
      sequence: [
        {
          id: 's1',
          description: 'Identify the circuit to be worked on',
          action: 'identify_circuit',
          verification: {
            expectedState: 'circuit identified',
            measurementPoint: 'distribution board',
            instrument: 'visual inspection',
          },
          order: 1,
        },
        {
          id: 's2',
          description: 'Isolate the supply at the main switch',
          action: 'isolate_supply',
          verification: {
            expectedState: 'supply off',
            measurementPoint: 'main switch',
            instrument: 'visual inspection',
          },
          order: 2,
        },
        {
          id: 's3',
          description: 'Apply lockout device and danger tag',
          action: 'apply_lockout',
          verification: {
            expectedState: 'lockout applied',
            measurementPoint: 'main switch',
            instrument: 'visual inspection',
          },
          order: 3,
        },
        {
          id: 's4',
          description: 'Verify voltage tester against proving unit',
          action: 'verify_tester',
          verification: {
            expectedState: 'tester functional',
            measurementPoint: 'proving unit',
            instrument: 'voltage tester',
          },
          order: 4,
        },
        {
          id: 's5',
          description: 'Test conductors at work location to confirm dead',
          action: 'test_conductors',
          verification: {
            expectedState: '0V',
            measurementPoint: 'terminals',
            instrument: 'voltage tester',
            tolerance: 5,
          },
          order: 5,
        },
        {
          id: 's6',
          description: 'Re-verify tester against proving unit',
          action: 'reverify_tester',
          verification: {
            expectedState: 'tester functional',
            measurementPoint: 'proving unit',
            instrument: 'voltage tester',
          },
          order: 6,
        },
        {
          id: 's7',
          description: 'Proceed with work only after all checks pass',
          action: 'proceed_with_work',
          verification: {
            expectedState: 'safe to work',
            measurementPoint: 'work area',
            instrument: 'none',
          },
          order: 7,
        },
      ],
      requiredTools: ['lockout kit', 'voltage tester', 'proving unit'],
      nonCompensatory: true,
    },
  ],

  instructions: {
    stages: [
      {
        id: 'stage1',
        title: 'Prepare',
        type: 'prepare',
        content: 'Review the job brief, schematic, and materials. Ensure you understand the required connections before beginning.',
        highlights: [],
        hints: ['Pay attention to conductor colors', 'Note which terminal is live, neutral, and earth'],
      },
      {
        id: 'stage2',
        title: 'Demonstrate',
        type: 'demonstrate',
        content: 'The line conductor comes from the MCB, goes to the switch common terminal, then from the switch output to the lamp live terminal. The neutral goes directly from the neutral bar to the lamp neutral terminal. The protective earth connects to the lamp earth terminal.',
        highlights: [],
        hints: [],
      },
      {
        id: 'stage3',
        title: 'Guided Practice',
        type: 'guided',
        content: 'Complete the wiring step by step. The system will highlight the next terminal to connect.',
        highlights: [
          { componentId: 'm1', label: 'MCB Line', color: '#ef4444' },
          { componentId: 'm2', label: 'Switch Common', color: '#22c55e' },
          { componentId: 'm3', label: 'Lamp Live', color: '#3b82f6' },
        ],
        hints: ['Connect MCB line to switch common', 'Connect switch output to lamp live', 'Connect neutral to lamp neutral'],
      },
      {
        id: 'stage4',
        title: 'Independent Practice',
        type: 'independent',
        content: 'Complete the wiring without guidance. Use the schematic and your knowledge.',
        highlights: [],
        hints: ['Check the schematic if unsure', 'Use the multimeter to verify connections'],
      },
      {
        id: 'stage5',
        title: 'Reflection and Assessment',
        type: 'reflect',
        content: 'Review your work, run the test, and complete the assessment.',
        highlights: [],
        hints: [],
      },
    ],
  },

  assessment: {
    criteria: [
      {
        id: 'c1',
        category: 'safety',
        description: 'Complete safety isolation procedure',
        weight: 30,
        nonCompensatory: true,
        checks: [
          {
            type: 'safety_procedure',
            target: 'all_steps',
            expected: 'completed',
          },
        ],
      },
      {
        id: 'c2',
        category: 'wiring',
        description: 'Correct terminal connections',
        weight: 40,
        nonCompensatory: false,
        checks: [
          {
            type: 'connection_correct',
            target: 'mcb_to_switch',
            expected: 'line_conductor',
          },
          {
            type: 'connection_correct',
            target: 'switch_to_lamp',
            expected: 'switched_line',
          },
          {
            type: 'connection_correct',
            target: 'neutral_to_lamp',
            expected: 'neutral_conductor',
          },
        ],
      },
      {
        id: 'c3',
        category: 'testing',
        description: 'Correct multimeter usage',
        weight: 15,
        nonCompensatory: false,
        checks: [
          {
            type: 'instrument_usage',
            target: 'multimeter',
            expected: 'correct_mode',
          },
        ],
      },
      {
        id: 'c4',
        category: 'functionality',
        description: 'Lamp operates correctly',
        weight: 15,
        nonCompensatory: false,
        checks: [
          {
            type: 'circuit_complete',
            target: 'lamp',
            expected: 'functional',
          },
        ],
      },
    ],
    scoring: {
      safetyWeight: 30,
      accuracyWeight: 40,
      efficiencyWeight: 30,
      speedCompensation: false,
    },
    passingScore: 70,
  },

  feedback: {
    immediateFeedback: true,
    showHints: true,
    showErrorExplanation: true,
    showCorrectAnswer: false,
    reflectionQuestions: [
      'Why must the line conductor be switched rather than the neutral?',
      'What would happen if you swapped live and neutral at the lamp?',
      'Why is the protective earth conductor important?',
    ],
  },

  standardsReference: {
    primary: ['KS 662-1:2018', 'KS 662-2:2018'],
    secondary: ['IEC 60364-5-52', 'EPRA Electrical Installation Rules 2006'],
    notes: 'Kenya-specific wiring color code and installation requirements apply',
  },

  metadata: {
    author: 'Electrical Lab Team',
    createdAt: new Date('2026-11-03'),
    updatedAt: new Date('2026-11-03'),
    technicalReview: false,
    smeApproval: false,
    version: '1.0.0',
  },
};
