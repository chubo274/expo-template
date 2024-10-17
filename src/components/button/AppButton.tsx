import { AppText } from "components/text/AppText"
import React, { ReactNode } from "react"
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ITheme, useThemeColor } from "shared/theme"
import dimensions from "shared/theme/dimensions"
interface IAppButton {
    text?: string
    textStyle?: StyleProp<TextStyle>
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    style?: StyleProp<ViewStyle>
    disabled?: boolean
    onPress?: () => void
}

export const AppButton = React.memo((props: IAppButton) => {
  const { text, style, textStyle, disabled, leftIcon, rightIcon, onPress } = props
  const theme = useThemeColor();
  const styles = useStyles(theme);

  return <TouchableOpacity activeOpacity={0.6}
    style={[styles.defaultTouch, style, disabled && { backgroundColor: theme.color.buttonApp.disable }]}
    onPress={onPress}
    disabled={disabled}
  >
    {leftIcon}
    <View style={{ margin: 4 }}>
      <AppText style={[styles.defaultText, textStyle, disabled && { color: theme.color.text.disable }]}>{text}</AppText>
    </View>
    {rightIcon}
  </TouchableOpacity>
})

const useStyles = (theme: ITheme) => StyleSheet.create({
  defaultTouch: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: dimensions.space.p12,
    alignItems: "center",
    justifyContent: "center"
  },
  defaultText: {
    fontSize: dimensions.fontSize.p12,
    color: theme.color.text.primary,
    textTransform: "capitalize"
  },
})
