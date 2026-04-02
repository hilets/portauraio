import { createContext, useContext, ReactNode } from 'react';

const PreviewModeContext = createContext(false);

export const usePreviewMode = () => useContext(PreviewModeContext);

export const PreviewModeProvider = ({ children }: { children: ReactNode }) => (
  <PreviewModeContext.Provider value={true}>
    {children}
  </PreviewModeContext.Provider>
);
