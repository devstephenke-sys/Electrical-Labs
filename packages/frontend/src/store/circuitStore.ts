import { create } from 'zustand';
import { Circuit, Component, Wire, Scenario, ComponentConfig } from '@electrical-lab/shared';
import { NodalSolver, Solution } from '@electrical-lab/simulator';
import { createComponent } from '../utils/componentFactory';

interface CircuitStore {
  circuit: Circuit;
  selectedComponent: Component | null;
  selectedWire: Wire | null;
  isSimulating: boolean;
  simulationResults: Solution | null;
  
  // Actions
  addComponent: (component: Component) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, props: Partial<Component>) => void;
  addWire: (wire: Wire) => void;
  removeWire: (id: string) => void;
  selectComponent: (component: Component | null) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  resetCircuit: () => void;
  initializeFromScenario: (scenario: Scenario) => void;
}

const initialCircuit: Circuit = {
  components: [],
  wires: [],
};

export const useCircuitStore = create<CircuitStore>((set) => ({
  circuit: initialCircuit,
  selectedComponent: null,
  selectedWire: null,
  isSimulating: false,
  simulationResults: null,

  addComponent: (component) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        components: [...state.circuit.components, component],
      },
    })),

  removeComponent: (id) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        components: state.circuit.components.filter((c) => c.id !== id),
        wires: state.circuit.wires.filter(
          (w) => w.fromComponentId !== id && w.toComponentId !== id
        ),
      },
    })),

  updateComponent: (id, props) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        components: state.circuit.components.map((c) =>
          c.id === id ? { ...c, ...props } : c
        ),
      },
    })),

  addWire: (wire) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        wires: [...state.circuit.wires, wire],
      },
    })),

  removeWire: (id) =>
    set((state) => ({
      circuit: {
        ...state.circuit,
        wires: state.circuit.wires.filter((w) => w.id !== id),
      },
    })),

  selectComponent: (component) => set({ selectedComponent: component }),

  startSimulation: () =>
    set((state) => {
      if (state.circuit.components.length === 0) {
        return state;
      }
      const solver = new NodalSolver(state.circuit);
      const results = solver.solve();
      return {
        isSimulating: true,
        simulationResults: results,
      };
    }),

  stopSimulation: () => set({ isSimulating: false }),

  resetCircuit: () =>
    set({
      circuit: initialCircuit,
      selectedComponent: null,
      selectedWire: null,
      isSimulating: false,
      simulationResults: null,
    }),

  initializeFromScenario: (scenario) =>
    set({
      circuit: {
        components: scenario.circuitConfig.components.map((compConfig: ComponentConfig) => {
          const component = createComponent(
            compConfig.componentId,
            compConfig.position?.x || 200,
            compConfig.position?.y || 200
          );
          return component;
        }),
        wires: [],
      },
      selectedComponent: null,
      selectedWire: null,
      isSimulating: false,
      simulationResults: null,
    }),
}));
