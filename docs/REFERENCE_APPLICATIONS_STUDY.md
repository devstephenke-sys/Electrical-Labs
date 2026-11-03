# Reference Applications Study

**Date:** November 3, 2026
**Purpose:** Analyze existing electrical simulation platforms to inform Phase 1 implementation
**References:** EDWartens, TPC Training, PhET, Falstad, Tinkercad

---

## Executive Summary

This document summarizes key learnings from five reference applications. Each platform offers different strengths that inform the Electrical Lab Phase 1 implementation:

- **EDWartens**: Practical workshop workflow, safety procedures, virtual instruments
- **TPC Training**: Systematic troubleshooting, performance metrics, adaptive learning
- **PhET**: Intuitive interaction, real-time visualization, beginner accessibility
- **Falstad**: Circuit-solving behavior, current animation, component editing
- **Tinkercad**: Drag-and-drop construction, workspace organization, beginner friendliness

**Key Takeaway:** Combine EDWartens' practical workflow with TPC's assessment metrics, PhET's accessibility, Falstad's circuit accuracy, and Tinkercad's usability.

---

## 1. EDWartens Electrical Lab

### 1.1 Overview

**URL:** https://lab.edwartens.com/electrical-wiring-simulator
**Focus:** Control panel wiring simulator for industrial electrical work
**Content:** 33 progressive levels from basic to advanced
**Platform:** Browser-based, 3D panel view

### 1.2 Strengths to Adopt

**A. Safety-First Workflow**
- Lockout/tagout procedure enforced before any work
- Prove dead sequence with two-pole tester and proving unit
- Verification before and after testing
- Safety sequence: isolate → lockout → prove dead → wire → re-verify → test

**B. Practical Panel Wiring**
- Terminal-to-terminal wiring (not just component-to-component)
- Realistic backplate view with industrial components
- Component placement matches real panel layouts
- Wire routing with actual conductor considerations

**C. Virtual Instruments**
- **Multimeter**: Volts, resistance, continuity, diodes
- **Two-pole tester**: Safe dead verification with LED ladder
- **Proving unit**: Known voltage for tester verification
- **Clamp meter**: Current measurement on single conductor
- **Insulation tester**: 500V/1000V testing on locked-out panels
- **Phase rotation indicator**: Clockwise/anticlockwise detection
- **VDE screwdrivers**: Insulated tools with torque matching

**D. Assessment Methodology**
- Factory Acceptance Test (FAT) at end of each level
- Downloadable FAT report
- Progressive difficulty (33 levels)
- Clear pass/fail criteria

**E. Job-Based Scenarios**
- Work order with client brief
- Schematic with wire numbers
- Terminal plans and cable lists
- Real industrial equipment (contactors, overload relays, PLCs)

### 1.3 Interaction Patterns

**Wiring Interface:**
- 3D backplate view with component models
- Click terminal to start wire
- Click destination terminal to complete wire
- Wire follows realistic routing
- Color-coded conductors per IEC standards

**Safety Interface:**
- Visual isolation switch
- Padlock with personal lockout
- Danger tag with user information
- Two-pole tester with LED indicators
- Proving unit for tester verification

**Measurement Interface:**
- Floating multimeter button
- Click to open instrument
- Select measurement mode (dial)
- Connect probes to terminals
- Real-time reading display

### 1.4 What We Can Learn

1. **Safety is non-negotiable** - Must enforce lockout/tagout before allowing work
2. **Terminal-level wiring** - Connect terminals, not just components
3. **Real instruments** - Multimeter must have correct dial positions and jack selections
4. **Proving sequence** - Test instruments before and after use
5. **Work order context** - Provide realistic job briefs, not just abstract circuits
6. **FAT methodology** - Formal acceptance test with downloadable report

### 1.5 What to Improve

1. **Limited to industrial** - No residential/household scenarios (we will add domestic lighting)
2. **No adaptive learning** - Fixed difficulty progression (we can add adaptive hints)
3. **Minimal gamification** - No badges or progress tracking (we can add basic progress)
4. **Closed content** - No scenario authoring (defer to Phase 3)
5. **3D complexity** - 3D may be overkill for basic scenarios (we start with 2D)

### 1.6 Application to Phase 1

**Adopt:**
- Safety sequence (isolate, lockout, prove dead, verify)
- Terminal-level wiring
- Virtual multimeter with dial and probes
- Job brief with schematic
- FAT-style assessment

**Adapt:**
- Use 2D instead of 3D for Phase 1
- Focus on domestic lighting (one-way switch) instead of industrial panels
- Simplify instrument set (multimeter only for Phase 1)
- Add basic progress tracking

**Defer:**
- Clamp meter, insulation tester, phase rotation indicator (Phase 2+)
- Industrial components (PLC, VFD, contactors) (Phase 2+)
- 3D panel view (Phase 2+)

---

## 2. TPC Training Simulations

### 2.1 Overview

**URL:** https://www.tpctraining.com/cloud-based-simulations
**Focus:** Industrial maintenance troubleshooting training
**Content:** 170+ hours, 450 virtual troubleshooting scenarios
**Platform:** Immersive 3D environments

### 2.2 Strengths to Adopt

**A. Systematic Troubleshooting Methodology**
- Root cause analysis approach
- Logical diagnostic process
- Step-by-step fault isolation
- Evidence-based decision making

**B. Performance Metrics Framework**

**Accuracy Scores:**
- Unnecessary parts replaced
- Fuse replacements
- Correct component identification

**Safety Scores:**
- Personal injury errors
- Live circuit errors
- Safe work practice errors

**Efficiency Scores:**
- Steps to find root cause
- Time taken per error
- Seat time per error

**C. Adaptive Learning**
- Faults get harder as skills improve
- Progressively advance through challenges
- Keeps learners engaged
- Strengthens skills in real time

**D. Comprehensive Coverage**
- Industrial controls
- PLC systems
- Variable frequency drives (VFDs)
- Industrial sensors
- HVAC systems

### 2.3 Assessment Approach

**Multi-Dimensional Scoring:**
- Accuracy: Did they find the right fault?
- Safety: Did they follow safe procedures?
- Efficiency: How many steps/time did it take?

**Non-Compensatory Elements:**
- Safety errors are tracked separately
- Safety failures noted in reports
- Managers see safety scores immediately

**Analytics Dashboard:**
- Learner performance over time
- Manager view of team progress
- Identify skill gaps
- Track improvement

### 2.4 What We Can Learn

1. **Metrics matter** - Track accuracy, safety, and efficiency separately
2. **Safety is distinct** - Safety scoring should be separate from accuracy
3. **Adaptive difficulty** - Scenarios should get harder as skills improve
4. **Manager visibility** - Instructors need to see learner progress
5. **Evidence-based** - Troubleshooting should be systematic, not guessing

### 2.5 What to Improve

1. **Enterprise pricing** - Not accessible to individuals (we will offer freemium)
2. **Closed system** - No custom authoring (defer to Phase 3)
3. **Troubleshooting focus** - Less emphasis on initial wiring (we focus on both)
4. **Complex platform** - Enterprise licensing required (we start simpler)

### 2.6 Application to Phase 1

**Adopt:**
- Multi-dimensional scoring (accuracy, safety, efficiency)
- Non-compensatory safety scoring
- Adaptive difficulty (basic scenario with option for guided hints)
- Evidence-based approach (measurements, not guessing)

**Adapt:**
- Focus on wiring accuracy + safety (not just troubleshooting)
- Simplify metrics for Phase 1 (3 dimensions instead of many)
- Local-first progress (no manager dashboard for Phase 1)

**Defer:**
- Manager analytics dashboard (Phase 2+)
- Advanced troubleshooting scenarios (Phase 2+)
- Enterprise features (Phase 3+)

---

## 3. PhET Circuit Construction Kit (DC)

### 3.1 Overview

**URL:** https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc-virtual-lab
**Focus:** Educational circuit theory visualization
**Content:** DC circuits with resistors, batteries, switches
**Platform:** HTML5, browser-based

### 3.2 Strengths to Adopt

**A. Intuitive Drag-and-Drop Interface**
- Click component to select
- Drag to workspace to place
- Right-click to rotate
- Simple, accessible interactions

**B. Real-Time Visualization**
- Moving dots show current flow
- Speed indicates current magnitude
- Direction shows electron flow
- Visual feedback is immediate

**C. Dual View Modes**
- Realistic view: Component representations
- Schematic view: Symbolic representation
- Toggle between views to learn connections

**D. Simple Component Library**
- Batteries
- Resistors
- Light bulbs
- Switches
- Capacitors
- Inductors

**E. Measurement Tools**
- Voltmeter
- Ammeter
- Drag probes to measure
- Real-time readings

**F. Safety Warnings**
- Short circuit detection
- Fire graphic for short circuit
- Clear visual feedback

### 3.3 Interaction Patterns

**Wire Connection:**
- Click terminal to start wire
- Drag to destination terminal
- Wire snaps to terminals
- Color-coded wires (optional)

**Component Editing:**
- Right-click component
- Edit properties (resistance, voltage)
- Change values with sliders
- Immediate circuit update

**Measurement:**
- Drag voltmeter probes
- Connect across component
- Reading appears immediately
- Remove probes to disconnect

### 3.4 What We Can Learn

1. **Simplicity first** - Intuitive interface reduces learning curve
2. **Visual feedback** - Moving dots make current visible
3. **Dual views** - Realistic + schematic helps understanding
4. **Immediate results** - Changes update in real time
5. **Safety feedback** - Short circuits clearly indicated

### 3.5 What to Improve

1. **DC only** - No AC circuits (we will add basic AC)
2. **No industrial components** - Limited to basic electronics (we add switches, breakers)
3. **No wiring workflow** - No terminal-based wiring (we add terminal connections)
4. **No safety procedures** - No lockout/tagout (we add safety sequence)
5. **Physics-focused** - More theoretical than vocational (we focus on installation)

### 3.6 Application to Phase 1

**Adopt:**
- Intuitive drag-and-drop component placement
- Real-time circuit visualization
- Current flow animation (moving dots)
- Immediate feedback on changes
- Short circuit detection with visual warning

**Adapt:**
- Add terminal-based wiring (not just component-to-component)
- Add safety procedures (lockout/tagout)
- Use realistic components (switches, breakers, lamps)
- Add job context (work order, schematic)

**Defer:**
- Dual view toggle (Phase 2+)
- Advanced components (capacitors, inductors) (Phase 2+)

---

## 4. Falstad Circuit Simulator

### 4.1 Overview

**URL:** https://www.falstad.com/circuit/
**Focus:** Electronic circuit simulation and visualization
**Content:** Extensive component library, sample circuits
**Platform:** JavaScript, browser-based

### 4.2 Strengths to Adopt

**A. Circuit-Solving Behavior**
- Node-based simulation
- Real-time solving
- Handles DC, AC, digital circuits
- Accurate electrical calculations

**B. Voltage Color Coding**
- Green = positive voltage
- Gray = ground
- Red = negative voltage
- Visual voltage distribution

**C. Current Animation**
- Moving yellow dots
- Speed indicates current magnitude
- Direction shows current flow
- Visual feedback on circuit state

**D. Component Parameter Editing**
- Right-click to edit
- Change resistance, voltage, etc.
- Immediate circuit update
- Extensive component properties

**E. Oscilloscope Visualization**
- Three scope graphs at bottom
- Real-time voltage traces
- Time-domain visualization
- Multiple channels

**F. Extensive Sample Circuits**
- Large library of examples
- Shareable circuit links
- Educational demonstrations
- Complex circuit examples

### 4.3 Interaction Patterns

**Component Editing:**
- Right-click component
- Select "Edit" from menu
- Change parameters in dialog
- Circuit updates immediately

**Switch Operation:**
- Click switch to toggle
- Open/closed state changes
- Circuit behavior updates
- Visual state indication

**Measurement:**
- Hover over component
- See description in corner
- See current state
- No explicit instrument required

### 4.4 What We Can Learn

1. **Color coding works** - Voltage color distribution is intuitive
2. **Real-time solving** - Circuit updates immediately on changes
3. **Parameter editing** - Easy to modify component values
4. **Scope visualization** - Oscilloscope adds value for AC
5. **Extensive library** - Sample circuits help learning

### 4.5 What to Improve

1. **No wiring workflow** - Components connect automatically (we need manual wiring)
2. **No safety procedures** - No lockout/tagout (we add safety)
3. **Physics-focused** - More electronics than installation (we focus on wiring)
4. **No guided learning** - No structured scenarios (we add scenario structure)
5. **Schematic-only** - No realistic panel view (we add workshop view)

### 4.6 Application to Phase 1

**Adopt:**
- Voltage color coding (green/gray/red)
- Current animation (moving dots)
- Real-time circuit solving
- Component parameter editing

**Adapt:**
- Add manual terminal-to-terminal wiring
- Add safety procedures
- Use realistic component representations
- Add structured scenario guidance

**Defer:**
- Oscilloscope visualization (Phase 2+)
- Extensive component library (Phase 2+)
- Digital circuits (Phase 2+)

---

## 5. Tinkercad Circuits

### 5.1 Overview

**URL:** https://www.tinkercad.com/circuits
**Focus:** Beginner-friendly circuit construction
**Content:** Drag-and-drop components, interactive circuits
**Platform:** Web-based, free

### 5.2 Strengths to Adopt

**A. Drag-and-Drop Component Palette**
- Component library on left
- Drag to workspace
- Components snap to grid
- Easy component selection

**B. Interactive Circuit Construction**
- Click terminal to start wire
- Click destination to complete
- Wire routing is automatic
- Color-coded wires

**C. Workspace Organization**
- Clean, uncluttered interface
- Component palette on side
- Properties panel
- Code editor (for Arduino)

**D. Beginner-Friendly**
- Simple interface
- Clear icons
- Helpful tooltips
- Tutorial content

**E. Simulation Controls**
- Start/stop simulation
- Real-time behavior
- Component states visible
- Immediate feedback

### 5.3 Interaction Patterns

**Component Placement:**
- Drag from palette
- Drop in workspace
- Component snaps to grid
- Can move after placement

**Wire Connection:**
- Click terminal
- Drag to destination
- Wire routes automatically
- Right angles only

**Simulation:**
- Click "Start Simulation"
- Circuit becomes live
- Components show state
- Stop to edit

### 5.4 What We Can Learn

1. **Clean interface** - Simple, uncluttered workspace reduces cognitive load
2. **Component palette** - Side panel for easy component access
3. **Snap-to-grid** - Helps with alignment and organization
4. **Auto-routing** - Simplifies wire drawing (can be option)
5. **Beginner focus** - Tooltips and tutorials help new users

### 5.5 What to Improve

1. **Limited realism** - Components are simplified (we need realistic industrial parts)
2. **No safety** - No lockout/tagout (we add safety)
3. **No instruments** - No multimeter (we add virtual instruments)
4. **Grid limitation** - Only right-angle wires (we allow flexible routing)
5. **No assessment** - No testing or scoring (we add assessment)

### 5.6 Application to Phase 1

**Adopt:**
- Component palette on side panel
- Drag-and-drop component placement
- Clean, uncluttered workspace
- Snap-to-grid for alignment
- Start/stop simulation controls

**Adapt:**
- Add realistic industrial components
- Add safety procedures
- Add virtual instruments
- Allow flexible wire routing
- Add assessment and feedback

**Defer:**
- Code editor (Arduino) (not needed for electrical installation)
- Community sharing (Phase 3+)

---

## 6. Synthesis: What to Combine for Phase 1

### 6.1 Core Workflow (from EDWartens)

**Safety Sequence:**
1. Identify circuit
2. Isolate supply
3. Apply lockout device
4. Apply danger tag
5. Verify tester with proving unit
6. Test conductors
7. Re-verify tester
8. Proceed with work

**Wiring Workflow:**
1. Read job brief and schematic
2. Identify components
3. Place components in workspace
4. Connect terminals with conductors
5. Verify connections with multimeter
6. Restore power
7. Test functionality
8. Complete FAT assessment

### 6.2 Assessment Framework (from TPC Training)

**Three-Dimensional Scoring:**
- **Accuracy**: Wiring correctness, component selection
- **Safety**: Compliance with procedures, no unsafe actions
- **Efficiency**: Time taken, steps used (non-compensatory with safety)

**Non-Compensatory Safety:**
- Safety failures cannot be offset by speed or accuracy
- Safety is a pass/fail criterion
- Safety violations must be addressed

### 6.3 Interface Design (from PhET + Tinkercad)

**Layout:**
- Left panel: Component palette
- Center: Wiring workspace
- Right panel: Job instructions, schematic, feedback
- Bottom: Instruments, circuit status, controls

**Interactions:**
- Drag-and-drop component placement
- Click-to-connect terminal wiring
- Real-time circuit visualization
- Current flow animation
- Voltage color coding

### 6.4 Simulation Engine (from Falstad)

**Features:**
- Real-time circuit solving
- Voltage color coding
- Current animation
- Component parameter editing
- Short circuit detection

**Accuracy:**
- Mathematically correct MNA solver
- Deterministic results
- Reference value verification

### 6.5 Beginner Accessibility (from PhET + Tinkercad)

**Features:**
- Intuitive drag-and-drop
- Clear visual feedback
- Helpful tooltips
- Guided mode with highlights
- Hints when stuck

---

## 7. Phase 1 Design Decisions Based on References

### 7.1 Safety System

**Decision:** Implement full EDWartens-style safety sequence

**Rationale:**
- Safety is non-negotiable in electrical work
- EDWartens demonstrates effective enforcement
- TPC shows safety must be tracked separately

**Implementation:**
- Lockout device (padlock + hasp)
- Danger tag
- Voltage tester
- Proving unit
- State machine enforcing sequence
- Non-compensatory scoring

### 7.2 Wiring Interface

**Decision:** Terminal-to-terminal wiring with click-to-connect

**Rationale:**
- EDWartens shows terminal-level wiring is realistic
- Tinkercad shows drag-and-drop is intuitive
- PhET shows click-to-connect works well

**Implementation:**
- Component palette on left
- Drag components to workspace
- Click terminal to start wire
- Click destination terminal to complete
- Color-coded conductors per jurisdiction
- Snap-to-terminal for accuracy

### 7.3 Virtual Instruments

**Decision:** Multimeter with dial and probes (Phase 1 only)

**Rationale:**
- EDWartens shows realistic instruments are valuable
- Multimeter is most fundamental tool
- Other instruments (clamp meter, insulation tester) can be added later

**Implementation:**
- Dial for mode selection (V, Ω, continuity)
- Red and black probes
- Input terminals
- Measurement display
- Warnings for incorrect setup
- Readings from actual circuit state

### 7.4 Visualization

**Decision:** 2D SVG-based with current animation and voltage color coding

**Rationale:**
- PhET and Falstad show visualization aids understanding
- 2D is sufficient for Phase 1 (3D deferred)
- Current animation (moving dots) shows flow
- Voltage color coding shows potential distribution

**Implementation:**
- SVG components and wires
- Animated current flow (dots)
- Voltage color (green=positive, gray=ground, red=negative)
- Switch state indication
- Lamp on/off indication

### 7.5 Assessment

**Decision:** Three-dimensional scoring with non-compensatory safety

**Rationale:**
- TPC shows multi-dimensional scoring works
- Safety must be non-compensatory (instruction requirement)
- FAT-style assessment (EDWartens) provides clear pass/fail

**Implementation:**
- Accuracy score: wiring correctness
- Safety score: procedure compliance (non-compensatory)
- Efficiency score: time/steps (cannot compensate safety)
- Overall pass/fail based on criteria
- Detailed feedback with corrections

### 7.6 Scenario Structure

**Decision:** Job brief + schematic + materials + instructions + assessment

**Rationale:**
- EDWartens shows work-order context is valuable
- Structured stages (prepare, demonstrate, guided, independent, reflect)
- Clear learning objectives

**Implementation:**
- Job brief with client requirements
- Schematic diagram
- Materials list
- Step-by-step instructions
- Terminal highlighting in guided mode
- Hints system
- Assessment criteria
- Reflection questions

---

## 8. What Each Reference Does NOT Address

### 8.1 EDWartens Gaps

- No domestic/residential scenarios
- No Kenya-specific standards
- No adaptive learning
- No mobile optimization (tablet/laptop focus)
- No beginner accessibility beyond first level

### 8.2 TPC Training Gaps

- No initial wiring training (focus on troubleshooting)
- No domestic scenarios
- No free individual access
- No scenario authoring
- No mobile focus

### 8.3 PhET Gaps

- No AC circuits
- No industrial components
- No safety procedures
- No wiring workflow
- No assessment

### 8.4 Falstad Gaps

- No wiring workflow
- No safety procedures
- No guided learning
- No realistic components
- No assessment

### 8.5 Tinkercad Gaps

- No realistic industrial components
- No safety procedures
- No virtual instruments
- No assessment
- No standards compliance

---

## 9. Our Improvements Over References

### 9.1 Unique Value Propositions

**1. Kenya-Specific Standards**
- KEBS KS 662 compliance
- EPRA requirements
- Jurisdiction-aware system
- No reference has this

**2. Domestic + Industrial**
- EDWartens is industrial only
- We start with domestic (lighting) and expand to industrial
- Broader vocational applicability

**3. Installation Focus**
- References focus on circuit theory or troubleshooting
- We focus on installation work (terminals, conductors, topology)
- Separate installation model from circuit simulation

**4. Non-Compensatory Safety**
- TPC tracks safety but doesn't explicitly make it non-compensatory
- We make safety failures non-compensatory by design
- Safety cannot be offset by speed or accuracy

**5. Open Architecture**
- EDWartens and TPC are closed systems
- We design for scenario extensibility
- Future instructor authoring tools

**6. Freemium Model**
- TPC is enterprise-only
- We offer free individual access with premium features
- More accessible to TVET students and apprentices

### 9.2 Technical Improvements

**1. Proper MNA Solver**
- Architecture references MNA but example is insufficient
- We implement full MNA with source constraints
- Mathematically correct handling of ideal voltage sources

**2. Separation of Concerns**
- References mix simulation, installation, and assessment
- We separate: electrical engine, installation model, safety engine, assessment engine
- Better modularity and testability

**3. Standards/Jurisdiction Architecture**
- No reference has multi-jurisdiction support
- We design standards profiles from the start
- Kenya, IEC, NEC profiles

**4. Local-First Persistence**
- References assume cloud backend
- We use IndexedDB for Phase 1
- Works offline, no backend required

---

## 10. Conclusion

The reference applications provide excellent models for different aspects of electrical simulation:

- **EDWartens** for practical workshop workflow and safety
- **TPC Training** for assessment metrics and systematic troubleshooting
- **PhET** for intuitive interaction and visualization
- **Falstad** for circuit-solving accuracy
- **Tinkercad** for beginner-friendly interface

Phase 1 will combine these strengths while addressing gaps:

1. Adopt EDWartens' safety sequence and terminal wiring
2. Adopt TPC's multi-dimensional scoring with non-compensatory safety
3. Adopt PhET's visualization and current animation
4. Adopt Falstad's accurate circuit solving
5. Adopt Tinkercad's clean interface and drag-and-drop

**Unique improvements:**
- Kenya-specific standards
- Installation focus (not just circuit theory)
- Proper MNA implementation
- Standards/jurisdiction architecture
- Local-first persistence
- Freemium accessibility

This synthesis ensures Phase 1 delivers a technically accurate, educationally sound, and uniquely valuable electrical workshop simulation.

---

**Reference Study Completed:** November 3, 2026
**Status:** Ready to inform Phase 1 implementation
