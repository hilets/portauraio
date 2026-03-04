import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'lime' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portaura-theme');
    return (saved === 'minimal' ? 'minimal' : 'lime') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('portaura-theme', theme);
    document.documentElement.classList.remove('theme-lime', 'theme-minimal');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'lime' ? 'minimal' : 'lime');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
