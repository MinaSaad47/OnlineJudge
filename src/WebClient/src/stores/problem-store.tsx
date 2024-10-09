import React, { createContext, ReactNode, useContext } from "react";
import { createStore, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  sourceCode: string;
  language: string;
  problemId: string;
  compileError: string | null;
  error: string | null;
}

interface Actions {
  setSourceCode: (sourceCode: State["sourceCode"]) => void;
  setLanguage: (language: State["language"]) => void;
  setCompileError: (compileError: State["compileError"]) => void;
  setError: (error: State["error"]) => void;
}

type ProblemStoreProps = {
  problemId: string;
};

const createProblemStore = ({ problemId }: ProblemStoreProps) =>
  createStore<State & Actions>()(
    devtools(
      persist(
        (set) => ({
          language: "cpp",
          problemId,
          sourceCode: "",
          compileError: null,
          error: null,
          setLanguage: (language) => set({ language }, false, "setLanguage"),
          setSourceCode: (sourceCode) =>
            set({ sourceCode }, false, "setSourceCode"),
          setCompileError: (compileError) =>
            set({ compileError }, false, "setCompileError"),
          setError: (error) => set({ error }, false, "setError"),
        }),
        {
          name: "problemStore",
          partialize: (state) => ({ language: state.language }),
        }
      )
    )
  );

type ProblemStore = ReturnType<typeof createProblemStore>;

const ProblemStoreContext = createContext<ProblemStore | null>(null);

export const ProblemStoreProvider: React.FC<{
  children: ReactNode;
  problemId: string;
}> = ({ children, problemId }) => {
  const ref = React.useRef<ProblemStore>();
  if (!ref.current) {
    ref.current = createProblemStore({ problemId });
  }
  return (
    <ProblemStoreContext.Provider value={ref.current}>
      {children}
    </ProblemStoreContext.Provider>
  );
};

function useProblemStore<T>(selector: (state: Actions & State) => T) {
  const store = useContext(ProblemStoreContext);
  if (!store) {
    throw new Error(
      "useProblemStore must be used within a ProblemStoreProvider"
    );
  }
  return useStore(store, selector);
}

export default useProblemStore;
