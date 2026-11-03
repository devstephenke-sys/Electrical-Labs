# Electrical Lab Simulation Platform

A browser-based virtual electrical workshop for safe, realistic electrical training.

## Overview

The Electrical Lab Simulation Platform provides an interactive learning environment where electrical apprentices, technicians, and engineers can practice wiring, testing, and troubleshooting electrical circuits in a safe, realistic virtual environment.

### Key Features

- **Realistic Circuit Simulation**: DC and AC circuit modeling with real-time solving
- **Interactive Wiring**: Drag-and-drop panel wiring with snap-to terminals
- **Safety Procedures**: Lockout/tagout, prove dead, and safety checks
- **Virtual Tools**: Multimeter, voltage tester, and measurement instruments
- **Progressive Learning**: Guided scenarios from basic to advanced
- **Fault Finding**: Hidden fault scenarios for troubleshooting practice
- **3D Visualization**: Realistic panel views (Phase 2+)
- **LMS Integration**: SCORM/xAPI support for institutional use (Phase 2+)

## Status

**Current Phase**: Planning & Research ✅

- ✅ Research completed
- ✅ Technical architecture designed
- ✅ Development roadmap created
- 🔄 Project setup in progress
- ⏳ MVP development (Months 1-9)

## Project Structure

```
electrical-lab/
├── packages/
│   ├── frontend/          # React application
│   ├── backend/           # Node.js API
│   └── shared/            # Shared types and utilities
├── docs/                  # Documentation
│   ├── RESEARCH_REPORT.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── DEVELOPMENT_ROADMAP.md
├── scripts/               # Build and deployment scripts
└── README.md
```

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Zustand (state management)
- Tailwind CSS (styling)
- Three.js (3D graphics - Phase 2)
- HTML5 Canvas + SVG (2D graphics)

### Backend
- Node.js 20 + TypeScript
- Express.js (framework)
- Prisma (ORM)
- PostgreSQL (database)
- JWT (authentication)
- Redis (caching)

### Infrastructure
- AWS (cloud provider)
- Kubernetes (orchestration)
- GitHub Actions (CI/CD)
- CloudFront (CDN)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- pnpm (package manager)

### Installation

```bash
# Clone repository
git clone https://github.com/devstephenke-sys/Electrical-Labs.git
cd Electrical-Labs

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
pnpm prisma migrate dev

# Start development servers
pnpm dev
```

### Development

```bash
# Frontend only
pnpm --filter frontend dev

# Backend only
pnpm --filter backend dev

# Run tests
pnpm test

# Run linter
pnpm lint

# Build for production
pnpm build
```

## Documentation

- [Research Report](docs/RESEARCH_REPORT.md) - Market analysis and platform recommendations
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design and implementation details
- [Development Roadmap](docs/DEVELOPMENT_ROADMAP.md) - 24-month development plan

## Development Phases

### Phase 1: MVP (Months 1-9)
- Core circuit simulation engine
- 6 basic scenarios
- Web-based UI with 2D panel view
- User authentication and progress tracking

### Phase 2: Advanced (Months 10-18)
- 3-phase circuit simulation
- 3D panel visualization
- Fault injection system
- LMS integration (SCORM/xAPI)
- Mobile PWA

### Phase 3: Scale (Months 19-24)
- Scenario authoring tools
- Enterprise features (SSO, white-label)
- VR/WebXR support
- Multi-language support
- Scale optimization

## Contributing

This project is currently in early development. Contributions will be accepted after the MVP phase.

## License

Proprietary - All rights reserved

## Contact

- Repository: https://github.com/devstephenke-sys/Electrical-Labs.git
- Issues: https://github.com/devstephenke-sys/Electrical-Labs/issues

---

**Version**: 0.1.0
**Last Updated**: November 3, 2026
