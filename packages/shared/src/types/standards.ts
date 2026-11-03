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
