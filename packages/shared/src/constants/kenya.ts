/**
 * Kenya-specific electrical constants and standards
 * Based on KEBS KS 662 series and EPRA requirements
 */

import { StandardsProfile } from '../types/standards';

/**
 * Kenya Standards Profile
 * Placeholder for Phase 1 - to be expanded with actual KEBS standards in Phase 2
 */
export const KenyaStandardsProfile: StandardsProfile = {
  jurisdiction: 'kenya',
  jurisdictionName: 'Kenya',
  standards: [
    {
      id: 'KS-662-1-2018',
      title: 'Electrical installations - Part 1: General requirements',
      version: '2018',
      year: 2018,
      status: 'adopted',
      applicableSections: ['all'],
    },
    {
      id: 'KS-662-2-2018',
      title: 'Electrical installations - Part 2: Particular requirements',
      version: '2018',
      year: 2018,
      status: 'adopted',
      applicableSections: ['all'],
    },
    {
      id: 'EPRA-ELECTRICAL-2006',
      title: 'Electric Power (Electrical Installation Work) Rules, 2006',
      version: '2006',
      year: 2006,
      status: 'adopted',
      applicableSections: ['all'],
    },
  ],
  conductorColors: {
    live: ['brown', 'black', 'red'], // Phase L1, L2, L3
    neutral: 'blue',
    protectiveEarth: 'green-yellow',
    earth: 'green',
    control: ['orange', 'yellow', 'white'],
  },
  wiringConventions: [
    {
      id: 'line-switching',
      description: 'Line conductor must be switched, not neutral',
      applicable: true,
      notes: 'Critical safety requirement',
    },
    {
      id: 'protective-earth',
      description: 'Protective earth must be connected to all Class I equipment',
      applicable: true,
      notes: 'Mandatory for safety',
    },
    {
      id: 'terminal-identification',
      description: 'Terminals must be identified with L, N, PE markings',
      applicable: true,
      notes: 'Required for installation verification',
    },
  ],
  installationRequirements: [
    {
      id: 'minimum-conductor-size',
      standardId: 'KS-662-1-2018',
      requirement: 'Minimum conductor cross-section for lighting circuits: 1.5 mm²',
      mandatory: true,
      notes: 'For power circuits: 2.5 mm² minimum',
    },
    {
      id: 'protection-rating',
      standardId: 'KS-662-1-2018',
      requirement: 'Protective device rating must not exceed conductor current capacity',
      mandatory: true,
      notes: 'Coordination required',
    },
    {
      id: 'earthing',
      standardId: 'KS-662-1-2018',
      requirement: 'All installations must have protective earthing',
      mandatory: true,
      notes: 'TN-S or TN-C-S earthing system',
    },
  ],
  testingLimits: [
    {
      testType: 'continuity',
      minimumValue: 0,
      maximumValue: 0.5,
      unit: 'Ω',
      standardId: 'KS-662-1-2018',
    },
    {
      testType: 'insulation-resistance',
      minimumValue: 1,
      maximumValue: Infinity,
      unit: 'MΩ',
      standardId: 'KS-662-1-2018',
    },
    {
      testType: 'earth-loop-impedance',
      minimumValue: 0,
      maximumValue: 0.8,
      unit: 'Ω',
      standardId: 'KS-662-1-2018',
    },
  ],
  referenceDocuments: [
    {
      id: 'KEBS-WEBSTORE',
      title: 'KEBS Webstore - Electrical Standards',
      type: 'standard',
      jurisdiction: 'kenya',
      url: 'https://webstore.kebs.org',
    },
    {
      id: 'EPRA-REGULATIONS',
      title: 'EPRA Electrical Installation Regulations',
      type: 'regulation',
      jurisdiction: 'kenya',
      url: 'https://www.epra.go.ke',
    },
  ],
};

// Kenya-specific supply characteristics
export const KenyaSupplyCharacteristics = {
  SINGLE_PHASE: {
    voltage: 240, // V
    frequency: 50, // Hz
    phases: 1,
    earthingSystem: 'TN-S' as const,
  },
  THREE_PHASE: {
    voltage: 415, // V line-to-line
    frequency: 50, // Hz
    phases: 3,
    earthingSystem: 'TN-S' as const,
  },
} as const;

// Kenya-specific protection device characteristics
export const KenyaProtectionCharacteristics = {
  MCB_CHARACTERISTICS: ['B', 'C', 'D'], // Trip curves
  STANDARD_RATINGS: [6, 10, 16, 20, 32, 40, 50, 63], // Amps
  BREAKING_CAPACITY: {
    DOMESTIC: 6, // kA
    INDUSTRIAL: 10, // kA
  },
} as const;

// Kenya standard cable sizes
export const KenyaCableSizes = {
  LIGHTING: 1.5, // mm²
  POWER: 2.5, // mm²
  COOKER: 6, // mm²
  SHOWER: 10, // mm²
  MAINS: 16, // mm² or 25 mm²
} as const;

// Note: This is a placeholder for Phase 1.
// In Phase 2, these constants should be reviewed and expanded by a qualified
// electrical engineer familiar with Kenya KEBS standards and EPRA requirements.
// Do not treat draft standards as adopted standards.
