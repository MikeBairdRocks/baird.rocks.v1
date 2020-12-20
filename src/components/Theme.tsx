import React, {useState, useLayoutEffect, useEffect, useCallback} from "react";
import { useMediaQuery } from "react-responsive";

type ThemeContextProps = {
  isDark: boolean,
  toggle: () => void
};

export const ThemeContext = React.createContext<ThemeContextProps>({
    isDark: false,
    toggle: () => { /*empty*/ }
  }
);

const ThemeProvider: React.FunctionComponent = (props) => {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      setDark(prefersDark);
    }
  );
  const [isDark, setDark] = useState(systemPrefersDark);

  useEffect(() => {
    applyTheme();
  }, [isDark]);

  const applyTheme = () => {
    const theme = isDark ? "dark" : "light";

    const root = document.getElementsByTagName("html")[0];
    root.className = theme;
  };

  const toggle = () => {
    setDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{isDark, toggle}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;