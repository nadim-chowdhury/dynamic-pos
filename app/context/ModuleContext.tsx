'use client';

import React, { createContext, useContext, useState } from 'react';

export type ModuleType = 'pos' | 'hrm' | 'account';

interface ModuleContextType {
  currentModule: ModuleType;
  setCurrentModule: (module: ModuleType) => void;
}

const ModuleContext = createContext<ModuleContextType>({
  currentModule: 'pos',
  setCurrentModule: () => {},
});

export const useModule = () => useContext(ModuleContext);

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [currentModule, setCurrentModule] = useState<ModuleType>('pos');

  return (
    <ModuleContext.Provider value={{ currentModule, setCurrentModule }}>
      {children}
    </ModuleContext.Provider>
  );
}
