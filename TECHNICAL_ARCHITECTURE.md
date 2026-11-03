# Electrical Lab Simulation Platform - Technical Architecture

**Version:** 1.0
**Date:** November 3, 2026
**Status:** Design Document

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Circuit Simulation Engine](#5-circuit-simulation-engine)
6. [Backend Architecture](#6-backend-architecture)
7. [Database Design](#7-database-design)
8. [API Design](#8-api-design)
9. [Security Architecture](#9-security-architecture)
10. [Component Library Design](#10-component-library-design)
11. [LMS Integration](#11-lms-integration)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Performance & Scalability](#13-performance--scalability)
14. [Monitoring & Observability](#14-monitoring--observability)

---

## 1. System Overview

### 1.1 Architecture Principles

- **Browser-First**: Everything runs in the browser with no client installation
- **Offline-Capable**: PWA with service workers for offline practice
- **Real-Time Simulation**: Circuit solving happens locally in JavaScript/WebAssembly
- **Cloud-Native Backend**: Scalable, stateless API with cloud storage
- **Standards-Based**: Compliant with WCAG 2.1, SCORM, xAPI, LTI
- **Security-First**: All data encrypted, secure authentication, no secrets in client

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Web Browser  │  │  Mobile PWA  │  │   Desktop    │          │
│  │  (React SPA) │  │  (React PWA) │  │  (Electron)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │ HTTPS
                              │
┌─────────────────────────────────────────────────────────────────┐
│                       CDN / Edge Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Static Assets│  │   Asset Caching  │  │   DDoS Protection │    │
│  │  (CloudFront)│  │   (CloudFlare)  │  │    (AWS Shield)    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    Application Layer (Kubernetes)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   API Server │  │   Auth Svc   │  │   LRS/SCORM  │          │
│  │  (Node.js)   │  │  (OAuth2)    │  │   Service    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ PostgreSQL   │  │  Redis Cache │  │  Object Store│          │
│  │  (Primary)   │  │  (Session)   │  │  (S3, GCS)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Framework | React 18+ | Component-based, large ecosystem, good performance |
| Language | TypeScript | Type safety, better IDE support, catches errors early |
| Build Tool | Vite | Fast development server, optimized production builds |
| State Management | Zustand | Lightweight, simple API, better than Redux for this use case |
| Routing | React Router | De facto standard, good code splitting |
| UI Library | Tailwind CSS | Utility-first, small bundle size, highly customizable |
| 3D Graphics | Three.js | Mature WebGL library, good documentation, large community |
| 2D Graphics | HTML5 Canvas + SVG | Native browser support, performant for schematics |
| Testing | Vitest + React Testing Library | Fast, integrated with Vite, component-focused |
| PWA | Workbox | Service worker library, offline support, caching strategies |

### 2.2 Circuit Simulation Engine

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Language | TypeScript | Type safety for circuit components |
| Solver | Custom Nodal Analysis | Optimized for educational use, full control |
| Numerical | Simple Linear Algebra | Efficient for typical circuits (< 100 nodes) |
| Physics | Ohm's Law + Kirchhoff's Laws | Sufficient for DC/AC wiring tasks |
| Advanced Option | WebAssembly (NGSpice) | If complex AC/transient analysis needed later |

### 2.3 Backend Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Runtime | Node.js 20+ | Fast I/O, good JSON handling, same language as frontend |
| Framework | Express.js | Minimal, flexible, large middleware ecosystem |
| Language | TypeScript | Type safety across full stack |
| ORM | Prisma | Type-safe database access, good migrations |
| Database | PostgreSQL 15+ | Relational data, ACID compliance, JSON support |
| Cache | Redis 7+ | Fast session storage, rate limiting |
| Authentication | JWT + OAuth2 | Stateless, industry standard |
| File Storage | AWS S3 (or GCS) | Scalable, cheap, CDN integration |
| Message Queue | Bull (Redis-based) | Background jobs, email, analytics |

### 2.4 DevOps & Infrastructure

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Container | Docker | Consistent environments |
| Orchestration | Kubernetes | Auto-scaling, self-healing |
| CI/CD | GitHub Actions | Integrated with repo, free for public |
| Cloud Provider | AWS (or GCP) | Comprehensive services, global reach |
| CDN | CloudFront / CloudFlare | Fast static asset delivery |
| Monitoring | Prometheus + Grafana | Industry standard metrics |
| Logging | ELK Stack (Elasticsearch, Logstash, Kibana) | Centralized logging |
| Error Tracking | Sentry | Real-time error monitoring |

---

## 3. System Architecture

### 3.1 Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Application                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │               React Application                     │    │
│  │                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │   UI     │  │  State   │  │  Router  │         │    │
│  │  │ Components│ │  Store   │  │          │         │    │
│  │  └──────────┘  └──────────┘  └──────────┘         │    │
│  │                                                      │    │
│  │  ┌────────────────────────────────────────────┐    │    │
│  │  │            Simulation Layer                 │    │    │
│  │  │                                            │    │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │    │    │
│  │  │  │ Circuit  │  │  3D      │  │  Tools   │ │    │    │
│  │  │  │  Engine  │  │  Engine  │  │  (Meter) │ │    │    │
│  │  │  └──────────┘  └──────────┘  └──────────┘ │    │    │
│  │  └────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌────────────────────────────────────────────┐    │    │
│  │  │            Service Layer                  │    │    │
│  │  │                                            │    │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │    │    │
│  │  │  │   API    │  │  Auth    │  │ Storage  │ │    │    │
│  │  │  │  Client  │  │ Service  │  │ Service  │ │    │    │
│  │  │  └──────────┘  └──────────┘  └──────────┘ │    │    │
│  │  └────────────────────────────────────────────┘    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Service Worker (PWA)                     │    │
│  │  - Cache static assets                            │    │
│  │  - Cache scenarios offline                        │    │
│  │  - Sync progress when online                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/WebSocket
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Gateway                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   API Routes  │  │   Auth MW     │  │   Rate Limit  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Scenario Svc  │  │ Progress Svc  │  │  User Svc    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Analytics   │  │  LMS Integ   │  │  Auth Svc    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        Data Access                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Prisma ORM │  │   Redis      │  │   S3 Client  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Data Storage Layer                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PostgreSQL   │  │   Redis      │  │  AWS S3/GCS  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

**Scenario Loading Flow:**
```
1. User selects scenario
2. Client checks IndexedDB (offline cache)
3. If cached, load from IndexedDB
4. If not cached, fetch from API
5. API validates user access (auth, subscription)
6. API retrieves scenario from PostgreSQL
7. API returns scenario JSON
6. Client caches in IndexedDB
7. Client initializes circuit engine
8. Client renders schematic and panel views
```

**Progress Saving Flow:**
```
1. User completes wiring step
2. Client updates local state
3. Client saves to IndexedDB (immediate)
4. Debounced sync to API (30 seconds or on completion)
5. API validates and saves to PostgreSQL
6. API sends xAPI statement to LRS (if configured)
7. API returns confirmation
8. Client updates sync status
```

**Circuit Simulation Flow:**
```
1. User adds/modifies component or wire
2. Client updates circuit graph
3. Circuit engine rebuilds node list
4. Engine solves nodal equations (modified nodal analysis)
5. Engine calculates voltages/currents
6. Engine updates component states
7. UI updates visualizations (current flow, measurements)
8. Validation engine checks for errors (shorts, opens)
9. Feedback system provides real-time validation
```

---

## 4. Frontend Architecture

### 4.1 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Buttons, inputs, modals
│   ├── circuit/         # Circuit-specific components
│   │   ├── SchematicView.tsx
│   │   ├── PanelView.tsx
│   │   ├── Component3D.tsx
│   │   └── WireRenderer.tsx
│   ├── tools/           # Measurement tools
│   │   ├── Multimeter.tsx
│   │   ├── VoltageTester.tsx
│   │   └── LockoutTool.tsx
│   └── feedback/        # Feedback and hints
│       ├── ValidationPanel.tsx
│       ├── HintSystem.tsx
│       └── ScoreCard.tsx
├── pages/               # Page-level components
│   ├── Dashboard.tsx
│   ├── ScenarioList.tsx
│   ├── ScenarioRunner.tsx
│   ├── Results.tsx
│   └── InstructorDashboard.tsx
├── simulation/          # Circuit simulation engine
│   ├── engine/          # Core simulation engine
│   │   ├── CircuitGraph.ts
│   │   ├── NodalSolver.ts
│   │   ├── ComponentModel.ts
│   │   └── WireModel.ts
│   ├── components/      # Component definitions
│   │   ├── Resistor.ts
│   │   ├── Capacitor.ts
│   │   ├── Inductor.ts
│   │   ├── Source.ts
│   │   ├── Switch.ts
│   │   ├── Motor.ts
│   │   ├── Contactor.ts
│   │   └── Relay.ts
│   ├── validation/      # Circuit validation
│   │   ├── SafetyChecker.ts
│   │   ├── ContinuityChecker.ts
│   │   └── ShortCircuitDetector.ts
│   └── visualization/   # Visualization helpers
│       ├── CurrentAnimator.ts
│       ├── VoltageColorer.ts
│       └── ScopeRenderer.ts
├── 3d/                  # Three.js 3D rendering
│   ├── Scene.ts
│   ├── Camera.ts
│   ├── Lighting.ts
│   ├── PanelModel.ts
│   ├── ComponentMesh.ts
│   └── WireMesh.ts
├── services/            # API and data services
│   ├── api.ts           # API client
│   ├── auth.ts          # Authentication
│   ├── scenario.ts      # Scenario data
│   ├── progress.ts      # Progress tracking
│   └── storage.ts       # Local storage
├── store/               # State management (Zustand)
│   ├── useStore.ts      # Root store
│   ├── circuitStore.ts  # Circuit state
│   ├── scenarioStore.ts # Scenario state
│   ├── progressStore.ts # Progress state
│   └── userStore.ts     # User state
├── hooks/               # Custom React hooks
│   ├── useCircuit.ts
│   ├── useSimulation.ts
│   ├── useValidation.ts
│   └── useOffline.ts
├── utils/               # Utility functions
│   ├── math.ts
│   ├── formatting.ts
│   └── accessibility.ts
├── types/               # TypeScript types
│   ├── circuit.ts
│   ├── scenario.ts
│   ├── component.ts
│   └── api.ts
└── main.tsx             # Application entry
```

### 4.2 State Management

Using Zustand for simple, lightweight state management:

```typescript
// store/circuitStore.ts
import { create } from 'zustand';
import { Circuit, Component, Wire } from '../types/circuit';

interface CircuitState {
  circuit: Circuit;
  selectedComponent: Component | null;
  selectedWire: Wire | null;
  isSimulating: boolean;
  simulationResults: SimulationResults;

  // Actions
  addComponent: (component: Component) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, props: Partial<Component>) => void;
  addWire: (wire: Wire) => void;
  removeWire: (id: string) => void;
  selectComponent: (component: Component | null) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  updateSimulationResults: (results: SimulationResults) => void;
}

export const useCircuitStore = create<CircuitState>((set) => ({
  circuit: { components: [], wires: [] },
  selectedComponent: null,
  selectedWire: null,
  isSimulating: false,
  simulationResults: { voltages: {}, currents: {} },

  addComponent: (component) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        components: [...state.circuit.components, component],
      },
    })),

  // ... other actions
}));
```

### 4.3 Component Architecture

**SchematicView Component:**
- Renders SVG-based schematic diagram
- Interactive nodes and connections
- Supports zoom/pan
- Shows voltage/current labels
- Highlights active paths

**PanelView Component:**
- 2D/2.5D panel representation
- Drag-and-drop components
- Terminal points for wiring
- Wire routing with snapping
- Visual feedback (color coding)

**Multimeter Component:**
- Virtual probe leads
- Measurement mode selector (V, A, Ω, continuity)
- Real-time readings
- Safety warnings

---

## 5. Circuit Simulation Engine

### 5.1 Engine Architecture

The circuit simulation engine uses Modified Nodal Analysis (MNA) to solve DC and AC circuits in real-time.

```
┌─────────────────────────────────────────────────────────┐
│                Circuit Simulation Engine                 │
│                                                          │
│  ┌──────────────┐                                       │
│  │  Component   │  ← Component definitions and models   │
│  │   Library    │     (resistors, sources, motors)     │
│  └──────────────┘                                       │
│           │                                             │
│           ▼                                             │
│  ┌──────────────┐                                       │
│  │  Circuit     │  ← Parse circuit, build graph       │
│  │   Parser     │     Identify nodes and connections  │
│  └──────────────┘                                       │
│           │                                             │
│           ▼                                             │
│  ┌──────────────┐                                       │
│  │  Graph       │  ← Build adjacency matrix            │
│  │  Builder     │     Create node list                 │
│  └──────────────┘                                       │
│           │                                             │
│           ▼                                             │
│  ┌──────────────┐                                       │
│  │  MNA Solver  │  ← Modified Nodal Analysis           │
│  │              │     Solve linear equations           │
│  └──────────────┘                                       │
│           │                                             │
│           ▼                                             │
│  ┌──────────────┐                                       │
│  │  Result      │  ← Calculate voltages/currents       │
│  │  Calculator  │     Update component states          │
│  └──────────────┘                                       │
│           │                                             │
│           ▼                                             │
│  ┌──────────────┐                                       │
│  │  Validation  │  ← Check for shorts, opens          │
│  │  Engine      │     Validate safety constraints     │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Component Models

Each electrical component is modeled with:

```typescript
interface ComponentModel {
  id: string;
  type: ComponentType;
  terminals: Terminal[];
  parameters: ComponentParameters;
  state: ComponentState;

  // Simulation methods
  getConductance(): number;
  getCurrents(): number[];
  updateState(time: number): void;
  isNonlinear(): boolean;
}

interface Terminal {
  id: string;
  nodeId: string | null;  // Connected to circuit node
  position: { x: number; y: number };
}

interface ComponentParameters {
  resistance?: number;    // Ohms
  capacitance?: number;   // Farads
  inductance?: number;    // Henrys
  voltage?: number;       // Volts
  frequency?: number;     // Hz (for AC)
  maxCurrent?: number;    // Amps
}

interface ComponentState {
  voltage: number;        // Volts across component
  current: number;        // Amps through component
  power: number;         // Watts
  isOn: boolean;          // For switches, relays
  isOpen: boolean;        // For switches, breakers
}
```

### 5.3 Nodal Analysis Solver

```typescript
class NodalSolver {
  private nodes: Map<string, Node>;
  private components: Component[];
  private groundNode: string;

  solve(): SimulationResults {
    // 1. Build conductance matrix (G)
    const G = this.buildConductanceMatrix();

    // 2. Build current vector (I)
    const I = this.buildCurrentVector();

    // 3. Solve G * V = I using Gaussian elimination
    const V = this.solveLinearSystem(G, I);

    // 4. Calculate branch currents from node voltages
    const currents = this.calculateCurrents(V);

    // 5. Return results
    return {
      voltages: V,
      currents: currents,
      power: this.calculatePower(V, currents),
    };
  }

  private buildConductanceMatrix(): number[][] {
    // Construct N x N conductance matrix
    // G[i][j] = sum of conductances connected to nodes i and j
    // ...
  }

  private buildCurrentVector(): number[] {
    // Construct N x 1 current vector
    // I[i] = sum of current sources connected to node i
    // ...
  }

  private solveLinearSystem(G: number[][], I: number[]): number[] {
    // Gaussian elimination with partial pivoting
    // ...
  }
}
```

### 5.4 Real-Time Simulation Loop

```typescript
class SimulationEngine {
  private isRunning: boolean = false;
  private lastTime: number = 0;
  private circuit: Circuit;
  private solver: NodalSolver;

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  private loop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // seconds
    this.lastTime = currentTime;

    // 1. Update component states (for time-dependent components)
    this.updateComponentStates(deltaTime);

    // 2. Solve circuit
    const results = this.solver.solve();

    // 3. Update UI with results
    this.publishResults(results);

    // 4. Check for safety issues
    this.validateSafety(results);

    // Continue loop
    requestAnimationFrame(() => this.loop());
  }

  private updateComponentStates(dt: number) {
    // Update capacitors, inductors, motors
    // ...
  }
}
```

### 5.5 Component Library

**Basic Components (MVP):**
- Resistor
- Capacitor
- Inductor
- DC Voltage Source
- AC Voltage Source
- Switch (SPST, SPDT)
- Light Bulb
- LED
- Ground
- Wire

**Industrial Components (Phase 2):**
- Contactor
- Relay
- Timer
- Motor (3-phase)
- Overload Relay
- Breaker/MCB
- RCD/GFCI
- Transformer
- PLC Input
- PLC Output
- Sensor (4-20mA, digital)

---

## 6. Backend Architecture

### 6.1 API Structure

```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh
│   └── POST /forgot-password
├── users/
│   ├── GET /me
│   ├── PUT /me
│   ├── GET /me/progress
│   └── GET /me/achievements
├── scenarios/
│   ├── GET /
│   ├── GET /:id
│   ├── GET /:id/schema
│   └── GET /:id/components
├── progress/
│   ├── POST /start/:scenarioId
│   ├── POST /save/:scenarioId
│   ├── POST /complete/:scenarioId
│   └── GET /:scenarioId
├── analytics/
│   ├── GET /me
│   ├── GET /me/performance
│   └── GET /class/:classId (instructor)
├── lms/
│   ├── POST /xapi/statement
│   ├── GET /scorm/package/:scenarioId
│   └── POST /lti/launch
└── admin/
    ├── GET /users
    ├── GET /scenarios
    ├── POST /scenarios
    ├── PUT /scenarios/:id
    └── DELETE /scenarios/:id
```

### 6.2 Service Layer

```typescript
// services/ScenarioService.ts
export class ScenarioService {
  async getScenario(id: string, userId: string): Promise<Scenario> {
    // 1. Check user's subscription level
    const user = await this.userRepository.findById(userId);
    const scenario = await this.scenarioRepository.findById(id);

    // 2. Check access based on subscription
    if (scenario.tier === 'pro' && user.subscription !== 'pro') {
      throw new ForbiddenError('Pro subscription required');
    }

    // 3. Increment view count for analytics
    await this.analyticsRepository.trackView(id, userId);

    return scenario;
  }

  async saveProgress(
    userId: string,
    scenarioId: string,
    progress: ProgressData
  ): Promise<void> {
    // 1. Validate progress data
    this.validateProgress(progress);

    // 2. Save to database
    await this.progressRepository.upsert(userId, scenarioId, progress);

    // 3. Send xAPI statement if LRS configured
    if (user.lrsEndpoint) {
      await this.xapiService.sendStatement({
        actor: user,
        verb: 'progressed',
        object: scenarioId,
        result: progress,
      });
    }
  }
}
```

### 6.3 Authentication

**JWT-based authentication:**
- Access tokens: 15 minutes
- Refresh tokens: 7 days
- Stored in httpOnly cookies (security)
- RS256 signing (asymmetric keys)

**OAuth2 integration:**
- Google OAuth
- Microsoft OAuth
- SAML for enterprise SSO

---

## 7. Database Design

### 7.1 Schema Overview

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Scenarios
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tier VARCHAR(50) DEFAULT 'free',
  difficulty VARCHAR(50),
  category VARCHAR(50),
  schema JSONB NOT NULL,
  components JSONB NOT NULL,
  objectives JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Progress
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  scenario_id UUID REFERENCES scenarios(id),
  status VARCHAR(50),
  score INTEGER,
  time_spent INTEGER,
  attempts INTEGER,
  completed_at TIMESTAMP,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, scenario_id)
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  badge_type VARCHAR(50),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(50),
  event_data JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Institutions (for school accounts)
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  plan VARCHAR(50),
  seats INTEGER,
  lms_config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Institution Users
CREATE TABLE institution_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50),
  joined_at TIMESTAMP DEFAULT NOW()
);
```

### 7.2 Prisma Schema

```prisma
// prisma/schema.prisma

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String?
  name          String
  subscriptionTier SubscriptionTier @default(FREE)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  progress      Progress[]
  achievements  Achievement[]
  institutionUsers InstitutionUser[]
  analyticsEvents AnalyticsEvent[]

  @@map("users")
}

model Scenario {
  id          String   @id @default(uuid())
  title       String
  description String?
  tier        SubscriptionTier @default(FREE)
  difficulty  Difficulty
  category    String
  schema      Json
  components  Json
  objectives  Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  progress    Progress[]

  @@map("scenarios")
}

model Progress {
  id          String   @id @default(uuid())
  userId      String
  scenarioId  String
  status      Status
  score       Int?
  timeSpent   Int?
  attempts    Int      @default(0)
  completedAt DateTime?
  data        Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  scenario    Scenario @relation(fields: [scenarioId], references: [id])

  @@unique([userId, scenarioId])
  @@map("progress")
}

enum SubscriptionTier {
  FREE
  PRO
  INSTITUTIONAL
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum Status {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  FAILED
}
```

---

## 8. API Design

### 8.1 REST API Endpoints

**Authentication:**
```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

**Scenarios:**
```http
GET /api/v1/scenarios
GET /api/v1/scenarios/:id
GET /api/v1/scenarios/:id/schema
```

**Progress:**
```http
POST /api/v1/progress/start/:scenarioId
POST /api/v1/progress/save/:scenarioId
POST /api/v1/progress/complete/:scenarioId
GET /api/v1/progress/:scenarioId
GET /api/v1/progress/me
```

**Analytics:**
```http
GET /api/v1/analytics/me
GET /api/v1/analytics/me/performance
GET /api/v1/analytics/class/:classId
```

### 8.2 Request/Response Examples

**Get Scenario:**
```http
GET /api/v1/scenarios/abc-123

Response:
{
  "id": "abc-123",
  "title": "DOL Motor Starter",
  "description": "Wire a direct-on-line motor starter...",
  "tier": "free",
  "difficulty": "intermediate",
  "category": "motor-control",
  "schema": {
    "type": "panel",
    "layout": "3d",
    "terminals": [...]
  },
  "components": [
    {
      "type": "contactor",
      "id": "c1",
      "position": {...},
      "terminals": [...]
    }
  ],
  "objectives": [
    "Wire the control circuit",
    "Wire the power circuit",
    "Pass the factory acceptance test"
  ]
}
```

**Save Progress:**
```http
POST /api/v1/progress/save/abc-123
Authorization: Bearer <token>

Request:
{
  "status": "in_progress",
  "wiring": {
    "completed": 5,
    "total": 10
  },
  "timestamp": "2026-11-03T10:30:00Z"
}

Response:
{
  "success": true,
  "progressId": "def-456"
}
```

---

## 9. Security Architecture

### 9.1 Security Layers

**Authentication:**
- JWT access tokens (15 min expiry)
- Refresh tokens (7 day expiry, rotation)
- Password hashing with bcrypt (cost factor 12)
- OAuth2 for third-party login
- SAML for enterprise SSO

**Authorization:**
- Role-based access control (RBAC)
- Subscription tier validation
- Institution seat management
- API key authentication for LMS integration

**Data Protection:**
- TLS 1.3 for all communications
- AES-256 encryption at rest (database)
- PII minimization
- GDPR/COPPA compliance
- Regular security audits

**API Security:**
- Rate limiting (Redis-based)
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection (React's default escaping)
- CSRF protection (httpOnly cookies)

### 9.2 Security Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 10. Component Library Design

### 10.1 Component Data Structure

```typescript
interface ComponentDefinition {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  category: ComponentCategory;
  parameters: ParameterDefinition[];
  terminals: TerminalDefinition[];
  model: ComponentModel;
  visual: ComponentVisual;
  tier: SubscriptionTier;
}

interface ParameterDefinition {
  name: string;
  type: 'number' | 'boolean' | 'select';
  default: any;
  min?: number;
  max?: number;
  unit?: string;
  options?: string[];
}

interface TerminalDefinition {
  id: string;
  label: string;
  type: 'input' | 'output' | 'neutral' | 'ground';
  position: { x: number; y: number };
}

interface ComponentVisual {
  schematic: {
    symbol: string;  // SVG path or reference
    size: { width: number; height: number };
  };
  panel: {
    model: string;  // 3D model reference
    size: { width: number; height: number; depth: number };
    terminalPositions: { [terminalId: string]: { x: number; y: number; z: number } };
  };
}
```

### 10.2 Component Categories

**Basic:**
- Passive: Resistor, Capacitor, Inductor
- Sources: DC Voltage, AC Voltage, Current Source
- Switches: SPST, SPDT, DPST, DPDT
- Loads: Light Bulb, LED, Motor

**Control:**
- Relays: Standard, Latching, Time-delay
- Contactors: Single-pole, Double-pole, Three-pole
- Timers: On-delay, Off-delay
- Breakers: MCB, MCCB, RCD, GFCI

**Industrial:**
- Motors: Single-phase, Three-phase, DC
- Transformers: Step-up, Step-down, Isolation
- PLC: Input modules, Output modules, CPU
- Sensors: Proximity, Photoelectric, Pressure (4-20mA)
- VFDs: Variable Frequency Drives

---

## 11. LMS Integration

### 11.1 SCORM Integration

**SCORM 1.2/2004 Wrapper:**
- Package scenarios as SCORM packages
- Track completion status (cmi.core.lesson_status)
- Track score (cmi.core.score.raw)
- Track time spent (cmi.core.total_time)
- Track interactions (cmi.interactions)

**Implementation:**
- SCORM API adapter in client
- JavaScript API calls to LMS
- State persistence on suspend

### 11.2 xAPI (Experience API)

**xAPI Statements:**
```json
{
  "actor": {
    "account": {
      "homePage": "https://electricallab.com",
      "name": "user123"
    }
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/completed",
    "display": { "en-US": "completed" }
  },
  "object": {
    "id": "https://electricallab.com/scenarios/dol-starter",
    "objectType": "Activity",
    "definition": {
      "name": { "en-US": "DOL Motor Starter" },
      "description": { "en-US": "Wire a direct-on-line motor starter" }
    }
  },
  "result": {
    "success": true,
    "score": { "scaled": 0.95 },
    "duration": "PT15M30S"
  },
  "context": {
    "contextActivities": {
      "parent": [{
        "id": "https://electricallab.com/courses/motor-control"
      }]
    }
  },
  "timestamp": "2026-11-03T10:45:30Z"
}
```

### 11.3 LTI 1.3 Integration

**LTI Launch Flow:**
1. Platform sends launch request with JWT
2. Tool validates JWT signature
3. Tool exchanges authorization code for access token
4. Tool retrieves user and context information
5. Tool launches scenario in iframe
6. Tool sends grade passback on completion

---

## 12. Deployment Architecture

### 12.1 Kubernetes Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: electrical-lab-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: electrical-lab-api
  template:
    metadata:
      labels:
        app: electrical-lab-api
    spec:
      containers:
      - name: api
        image: electrical-lab/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: auth-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 12.2 Infrastructure as Code

**Terraform for AWS:**
```hcl
# main.tf
resource "aws_ecs_cluster" "electrical_lab" {
  name = "electrical-lab"
}

resource "aws_rds_instance" "main" {
  engine         = "postgres"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  db_name  = "electrical_lab"
  username = var.db_username
  password = var.db_password
}

resource "aws_s3_bucket" "assets" {
  bucket = "electrical-lab-assets"
  acl    = "private"
}

resource "aws_cloudfront_distribution" "assets" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "S3-assets"
  }
  # ...
}
```

---

## 13. Performance & Scalability

### 13.1 Performance Targets

- **Page Load Time**: < 3 seconds on 3G
- **Time to Interactive**: < 5 seconds
- **Simulation Update Rate**: > 30 fps
- **API Response Time**: < 200ms (p95)
- **Database Query Time**: < 50ms (p95)
- **Concurrent Users**: 10,000+
- **Uptime**: 99.5%+

### 13.2 Caching Strategy

**Client-Side:**
- Service Worker for static assets
- IndexedDB for scenarios and progress
- LocalStorage for user preferences

**Server-Side:**
- Redis for session data
- Redis for frequently accessed scenarios
- CDN for static assets (images, 3D models)
- HTTP caching headers

**Database:**
- Connection pooling
- Query result caching
- Index optimization
- Read replicas for analytics queries

### 13.3 Scalability Strategy

**Horizontal Scaling:**
- Stateless API servers (Kubernetes HPA)
- Database read replicas
- CDN for static content
- Load balancing across multiple zones

**Vertical Scaling:**
- Database instance sizing based on load
- Cache instance sizing
- Worker node sizing for Kubernetes

---

## 14. Monitoring & Observability

### 14.1 Metrics

**Application Metrics:**
- Request rate and latency
- Error rate (4xx, 5xx)
- Database query performance
- Cache hit rate
- Active user sessions

**Business Metrics:**
- Scenario completion rate
- Average session duration
- Subscription conversions
- Feature usage

### 14.2 Logging

**Structured Logging:**
```typescript
logger.info('scenario_started', {
  userId: user.id,
  scenarioId: scenario.id,
  timestamp: new Date().toISOString(),
  userAgent: req.headers['user-agent']
});
```

**Log Levels:**
- ERROR: Critical failures
- WARN: Warning conditions
- INFO: Normal operations
- DEBUG: Detailed debugging

### 14.3 Error Tracking

**Sentry Integration:**
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

try {
  // Application code
} catch (error) {
  Sentry.captureException(error);
}
```

---

## Conclusion

This technical architecture provides a comprehensive foundation for building the Electrical Lab Simulation Platform. The architecture emphasizes:

- **Browser-first delivery** with offline capability
- **Real-time circuit simulation** running client-side
- **Scalable cloud-native backend** for user data and analytics
- **Standards-based LMS integration** for institutional adoption
- **Security-first approach** with modern best practices
- **Performance optimization** through caching and CDN delivery

The phased development approach allows for rapid MVP delivery while building toward a comprehensive enterprise-grade platform.

---

**Document Version:** 1.0
**Last Updated:** November 3, 2026
**Next Review:** After MVP completion
