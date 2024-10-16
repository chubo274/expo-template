import React, { useCallback, useContext, useMemo } from "react";
// import { setLocal } from 'shared/helpers/function';
import { ModeTheme } from "shared/constants/enum";
import { useGet, useSave } from "src/zustand";
import { setLocal } from "src/zustand/asyncStoreFunc";
import { Colors } from "./colors/Colors";
import { IColors } from "./colors/IColors";

export interface ITheme {
  color: IColors;
  changeTheme: (value?: ModeTheme) => void;
}
const ThemeContext = React.createContext<ITheme>({
  color: Colors,
  changeTheme: (value?: ModeTheme) => null,
});

export const useAppTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: any) => {
  const save = useSave();
  const themeColor = useGet("AppTheme");

  const changeTheme = useCallback(
    (value?: ModeTheme) => {
      const nextValue = value ?? ModeTheme.Default;
      if (nextValue != themeColor) {
        save("AppTheme", nextValue);
        setLocal("AppTheme", nextValue);
      }
    },
    [themeColor, save],
  );

  const sourceColor = useMemo(() => {
    switch (themeColor) {
      default:
        return Colors;
    }
  }, [themeColor]);

  const theme = useMemo((): ITheme => {
    return {
      color: sourceColor,
      changeTheme,
    };
  }, [changeTheme, sourceColor]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
