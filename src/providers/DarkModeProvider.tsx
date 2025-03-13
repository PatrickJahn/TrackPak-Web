import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

const DarkModeProvider: FC<PropsWithChildren> = ({ children, ...props }) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider {...props} value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export function useDarkMode(): DarkModeContextType {
  const darkMode = useContext(DarkModeContext);
  if (!darkMode)
    throw new Error("usedDarkMode must be used within an DarkModeContext");
  return darkMode;
}

export default DarkModeProvider;
