import React, { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { ITheme, useThemeColor,  } from "shared/theme";
import dimensions from "shared/theme/dimensions";

interface IAppText extends TextProps {
  children: string | ReactNode;
}

export const AppText = React.memo((props: IAppText) => {
  const theme = useThemeColor();
  const styles = useStyles(theme);
  const { children } = props;

  return (
    <Text {...props} style={[styles.defaultStyle, props.style]}>
      {children}
    </Text>
  );
});

const useStyles = (theme: ITheme) =>
  StyleSheet.create({
    defaultStyle: {
      fontSize: dimensions.fontSize.p15,
      color: theme.color.text.primary,
    },
  });
