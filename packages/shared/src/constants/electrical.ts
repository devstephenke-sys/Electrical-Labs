/**
 * Electrical constants and conversion factors
 * SI units with explicit unit metadata
 */

export const ElectricalConstants = {
  // Base SI units
  VOLTAGE: {
    BASE_UNIT: 'V',
    CONVERSIONS: {
      mV: 0.001,
      V: 1,
      kV: 1000,
      MV: 1000000,
    },
  },
  CURRENT: {
    BASE_UNIT: 'A',
    CONVERSIONS: {
      mA: 0.001,
      A: 1,
      kA: 1000,
    },
  },
  RESISTANCE: {
    BASE_UNIT: 'Ω',
    CONVERSIONS: {
      mΩ: 0.001,
      Ω: 1,
      kΩ: 1000,
      MΩ: 1000000,
    },
  },
  POWER: {
    BASE_UNIT: 'W',
    CONVERSIONS: {
      mW: 0.001,
      W: 1,
      kW: 1000,
      MW: 1000000,
    },
  },
  CAPACITANCE: {
    BASE_UNIT: 'F',
    CONVERSIONS: {
      pF: 1e-12,
      nF: 1e-9,
      μF: 1e-6,
      mF: 0.001,
      F: 1,
    },
  },
  INDUCTANCE: {
    BASE_UNIT: 'H',
    CONVERSIONS: {
      μH: 1e-6,
      mH: 0.001,
      H: 1,
    },
  },
  FREQUENCY: {
    BASE_UNIT: 'Hz',
    CONVERSIONS: {
      Hz: 1,
      kHz: 1000,
      MHz: 1000000,
    },
  },
  // Conductor cross-section (mm²)
  CONDUCTOR_AREA: {
    BASE_UNIT: 'mm²',
    CONVERSIONS: {
      mm2: 1,
      AWG: 'conversion_table', // AWG requires lookup table
    },
  },
  // Length
  LENGTH: {
    BASE_UNIT: 'm',
    CONVERSIONS: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
    },
  },
} as const;

// Standard supply voltages
export const StandardVoltages = {
  DOMESTIC_SINGLE_PHASE: {
    Kenya: 240, // V
    IEC: 230, // V
    NEC: 120, // V (North America)
  },
  DOMESTIC_THREE_PHASE: {
    Kenya: 415, // V line-to-line
    IEC: 400, // V line-to-line
    NEC: 208, // V line-to-line (North America)
  },
  INDUSTRIAL_THREE_PHASE: {
    Kenya: 415, // V
    IEC: 400, // V
    NEC: 480, // V (North America)
  },
} as const;

// Standard frequencies
export const StandardFrequencies = {
  Kenya: 50, // Hz
  IEC: 50, // Hz
  NEC: 60, // Hz (North America)
} as const;

// Conductor color codes per jurisdiction
export const ConductorColors = {
  Kenya: {
    live: ['brown', 'black', 'red'], // Phase L1, L2, L3
    neutral: 'blue',
    protectiveEarth: 'green-yellow',
    earth: 'green',
  },
  IEC: {
    live: ['brown', 'black', 'red'], // Phase L1, L2, L3
    neutral: 'blue',
    protectiveEarth: 'green-yellow',
    earth: 'green',
  },
  NEC: {
    live: ['black', 'red', 'blue'], // Phase L1, L2, L3 (120/208V)
    neutral: 'white',
    protectiveEarth: 'green',
    earth: 'green',
  },
} as const;

// Standard conductor cross-sections (mm²)
export const ConductorCrossSections = {
  Kenya: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50], // mm²
  IEC: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50], // mm²
  NEC: [14, 12, 10, 8, 6, 4, 2, 1, 1/0, 2/0], // AWG
} as const;

// Circuit breaker ratings
export const BreakerRatings = {
  DOMESTIC: [6, 10, 16, 20, 32, 40, 50, 63], // Amps
  INDUSTRIAL: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160], // Amps
} as const;

// Physical constants
export const PhysicsConstants = {
  SPEED_OF_LIGHT: 299792458, // m/s
  PERMITTIVITY_FREE_SPACE: 8.854187817e-12, // F/m
  PERMEABILITY_FREE_SPACE: 1.25663706212e-6, // H/m
} as const;

// Safety thresholds
export const SafetyThresholds = {
  TOUCH_VOLTAGE_LIMIT: {
    AC: 50, // V (IEC 60364)
    DC: 120, // V (IEC 60364)
  },
  EXTRA_LOW_VOLTAGE: {
    AC: 50, // V
    DC: 120, // V
  },
  LOW_VOLTAGE: {
    AC: 1000, // V
    DC: 1500, // V
  },
} as const;
